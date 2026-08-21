'use client';
import * as React from 'react';
import classnames from 'classnames';
import {CSSTransition} from 'react-transition-group';
import * as styles from './sidenav-bar.css';
import {
    DEFAULT_WIDTH,
    COLLAPSED_WIDTH,
    LOGO_SIZE,
    COLLAPSE_DURATION_MS,
    CONTENT_DURATION_MS,
} from './sidenav-bar.css';
import {ThemeVariant, normalizeVariant, useThemeVariant} from '../theme-variant-context';
import {getPrefixedDataAttributes} from '../utils/dom';
import {applyCssVars} from '../utils/css';
import {isRunningAcceptanceTest} from '../utils/platform';
import {useScreenSize, useTheme} from '../hooks';
import {IconButton} from '../icon-button';
import {Logo} from '../logo';
import IconPanelExpandRegular from '../generated/mistica-icons/icon-panel-expand-regular';
import IconPanelCollapseRegular from '../generated/mistica-icons/icon-panel-collapse-regular';
import {SidenavItem} from './sidenav-item';
import {SidenavSection} from './sidenav-section';
import {
    renderSidenavItemFromData,
    getFirstLevelItems,
    findParentOfItem,
    findFirstLevelItem,
    renderSidenavEntries,
} from './sidenav-entries';
import {SidenavDoublePanel} from './sidenav-panel';
import {SidenavMobileBar} from './sidenav-mobile';
import {useIsReducedMotion} from './sidenav-motion';
import {useSidenavRailKeyboard} from './sidenav-keyboard';
import {
    SidenavBarContext,
    useSidenavBarContext,
    SidenavLevelContext,
    assertChildrenAre,
    hasDescendantWithId,
} from './sidenav-context';
import {shouldShowBoxedBorder} from '../boxed';
import * as tokens from '../text-tokens';

import type {Variant} from '../theme-variant-context';
import type {ExclusifyUnion} from '../utils/utility-types';
import type {DataAttributes} from '../utils/types';
import type {SidenavSectionProps} from './sidenav-section';
import type {
    SidenavEntry,
    SidenavItem as SidenavItemType,
    SidenavLogo,
    SidenavLogoRenderProps,
} from './sidenav-types';

// Branded type: a string that is guaranteed to be an opaque color
type OpaqueColor = string & {readonly __brand: 'OpaqueColor'};

// Type guard: checks if a color is opaque (no 'rgba' with alpha < 1, no 'transparent', etc)
const isOpaqueColor = (value: string): value is OpaqueColor => {
    if (value === 'transparent' || value === 'rgba(0,0,0,0)') {
        return false;
    }
    const rgbaMatch = value.match(/rgba\([^,]+,\s*[^,]+,\s*[^,]+,\s*([^)]+)\)/);
    if (rgbaMatch) {
        const alpha = parseFloat(rgbaMatch[1]);
        if (alpha < 1) return false;
    }
    return true;
};

// Helper: coerce a color to opaque (removes alpha channel if present)
const toOpaqueColor = (color: string): OpaqueColor => {
    const rgbaMatch = color.match(/^rgba\(([^,]+),\s*([^,]+),\s*([^)]+),\s*[^)]+\)$/);
    if (rgbaMatch) {
        return `rgb(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]})` as OpaqueColor;
    }
    return color as OpaqueColor;
};

// Helper: validate and warn in dev, coerce in production
const enforceOpaqueColor = (color: string, region: 'header' | 'footer'): OpaqueColor => {
    if (process.env.NODE_ENV !== 'production' && !isOpaqueColor(color)) {
        console.warn(
            `SidenavBar: ${region} background color must be opaque (no transparency), ` +
                `but received "${color}". Coercing to opaque.`
        );
    }
    return toOpaqueColor(color);
};

type SidenavBarBackgroundColors = {
    /** Header background color (must be opaque to mask scrolling content). */
    header?: OpaqueColor;
    /** Body background color (can be any color including transparent). */
    body?: string;
    /** Footer background color (must be opaque to mask scrolling content). */
    footer?: OpaqueColor;
};

/**
 * Props of the collapse action of the header. A consumer that paints its own action spreads them onto its
 * own control, which then keeps the behavior and the accessible name of the default action.
 */
type SidenavCollapseActionRenderProps = {
    /** Current collapsed state, which gives the direction of the action. */
    collapsed: boolean;
    /** Toggles the collapsed state. */
    onPress: () => void;
    /** Accessible name of the action, which follows the collapsed state. */
    'aria-label': string;
    /** Disclosure state of the sidenav: true while expanded, false while collapsed. */
    'aria-expanded': boolean;
};

type SidenavBarBaseProps = {
    /** First-level entries of the body. Each entry is either a section with items, or a stand-alone
     * item that needs no section.
     * @see SidenavEntry
     * @see SidenavSection
     * @see SidenavItem
     */
    sections?: ReadonlyArray<SidenavEntry>;
    /** Accessible name of the navigation landmark. Defaults to a localized "Main navigation". */
    'aria-label'?: string;
    /** Color variant (default, brand, alternative, negative, media). @default 'default' */
    variant?: Variant;
    /** Width of expanded sidenav in pixels. The second column takes the same width. @default 240 */
    width?: number;
    /** Opens the children of a parent item in a second column, to the right of the sidenav.
     * @default false */
    doublePanel?: boolean;
    /** Logo of the header. Defaults to the isotype of the skin at 32px, in both the expanded and the
     * collapsed state. It takes true for that same default, false to hide the logo, an element of your
     * own, or a function that receives the collapsed state and returns one logo for each state. The
     * collapsed rail clamps the width of the logo to 32px. The mobile top bar is not a rail, so it shows
     * the imagotype at 40px, and it reports a collapsed state of false.
     * @see SidenavLogoRenderProps */
    logo?: SidenavLogo;
    /** Custom content below logo/collapse in header. */
    headerSlot?: React.ReactNode;
    /** Custom background colors for header (opaque), body (any), and footer (opaque) regions. */
    background?: SidenavBarBackgroundColors;
    /** ID of currently selected item (controlled selection). */
    selectedItemId?: string | null;
    /** Called when selection changes. */
    onSelectedItemIdChange?: (id: string | null) => void;
    dataAttributes?: DataAttributes;
};

/**
 * Constraints enforced by the type system:
 *
 * - A boxed sidenav has its own edge, so the vertical right divider does not apply to it:
 *   `divider` is only accepted when `boxed` is false.
 * - The collapsed state is either controlled through `collapsed` (requires `onCollapse`)
 *   or uncontrolled through `defaultCollapsed` (optional `onCollapse`), never both.
 * - When `collapsible: false`, the sidenav cannot be toggled, so `onCollapse` is not allowed, and
 *   `defaultCollapsed` drives the collapsed state of every render instead of seeding it once. That sidenav
 *   shows no collapse action either, so `renderCollapseAction` is not allowed there.
 * - `fixedFooter` is only allowed when `footerSlot` is provided.
 */
type SidenavBarProps = SidenavBarBaseProps &
    ExclusifyUnion<
        | {
              /** Renders as a floating box (with own edge). Divider not applicable. */
              boxed: true;
          }
        | {
              /** Renders as full-width. @default false */
              boxed?: false;
              /** Shows vertical right divider (only when boxed=false). @default true */
              divider?: boolean;
          }
    > &
    ExclusifyUnion<
        | {
              /** Controlled collapsed state. */
              collapsed: boolean;
              /** Handler for collapsed state changes (required for controlled mode). */
              onCollapse: (collapsed: boolean) => void;
              /** Whether user can toggle collapsed state. @default true */
              collapsible?: true;
              /** Paints a custom collapse action in the header, instead of the default icon button. */
              renderCollapseAction?: (props: SidenavCollapseActionRenderProps) => React.ReactNode;
          }
        | {
              /** Initial collapsed state (uncontrolled). @default false */
              defaultCollapsed?: boolean;
              /** Optional handler for collapsed state changes (for logging/effects). */
              onCollapse?: (collapsed: boolean) => void;
              /** Whether user can toggle collapsed state. @default true */
              collapsible?: true;
              /** Paints a custom collapse action in the header, instead of the default icon button. */
              renderCollapseAction?: (props: SidenavCollapseActionRenderProps) => React.ReactNode;
          }
        | {
              /** Controlled collapsed state (non-toggleable). */
              collapsed: boolean;
              /** User cannot toggle collapsed state. */
              collapsible: false;
          }
        | {
              /** Collapsed state. The user cannot toggle it, so the sidenav follows this prop on every
               * render. @default false */
              defaultCollapsed?: boolean;
              /** User cannot toggle collapsed state. */
              collapsible: false;
          }
    > &
    ExclusifyUnion<
        | {
              /** Custom content in footer region (at bottom of sidenav). */
              footerSlot: React.ReactNode;
              /** Keep footer fixed when scrolling. @default false */
              fixedFooter?: boolean;
          }
        | {
              /** No footer slot. */
              footerSlot?: undefined;
          }
    >;

const SidenavBar = ({
    sections,
    'aria-label': ariaLabelProp,
    variant = 'default',
    boxed = false,
    divider = true,
    collapsible = true,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapse,
    renderCollapseAction,
    doublePanel = false,
    width = DEFAULT_WIDTH,
    logo,
    headerSlot,
    footerSlot,
    fixedFooter = false,
    background,
    selectedItemId,
    onSelectedItemIdChange,
    dataAttributes,
}: SidenavBarProps): JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const {componentProperties, platformOverrides, texts, t} = useTheme();
    // The landmark keeps a localized default, and a consumer that passes `aria-label` overrides it.
    const ariaLabel = ariaLabelProp ?? (texts.sidenavLandmark || t(tokens.sidenavLandmark));
    const isReducedMotion = useIsReducedMotion();
    // Acceptance runs and reduced motion both force zero-duration motion, so no half-animated node is
    // left in the DOM after the state that removed it.
    const isMotionOff = isRunningAcceptanceTest(platformOverrides) || isReducedMotion;
    // Read before the `ThemeVariant` of the returned tree, so this is the variant of the page that holds the
    // sidenav, and not the variant of the sidenav itself.
    const pageVariant = normalizeVariant(useThemeVariant());
    const [panelOpenForItemId, setPanelOpenForItemId] = React.useState<string | null>(null);

    const isCollapsedControlled = collapsedProp !== undefined;
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed);
    // A sidenav that the user cannot toggle keeps no state of its own: it drops the seeded state and reads
    // `defaultCollapsed` on every render, so a later change of that prop moves the sidenav.
    const collapsed = isCollapsedControlled
        ? Boolean(collapsedProp)
        : collapsible
          ? uncontrolledCollapsed
          : defaultCollapsed;
    const containerRef = React.useRef<HTMLElement>(null);

    // The second column slides away instead of disappearing, so it still renders while it closes, when the
    // item that opened it is already gone. It therefore keeps the title and the children of that item
    // until a new item replaces them.
    const doublePanelRef = React.useRef<HTMLDivElement>(null);
    const lastDoublePanelContentRef = React.useRef<{
        label: string;
        children: ReadonlyArray<SidenavItemType>;
    } | null>(null);

    // See `collapsedSettled` in `sidenav-context.tsx` for why the sidenav reports the collapsed state
    // twice. A user who turned motion down sees no movement, so the settled state follows at once there.
    const [collapsedSettled, setCollapsedSettled] = React.useState(collapsed);
    React.useEffect(() => {
        if (collapsedSettled === collapsed) {
            return;
        }
        if (isMotionOff) {
            setCollapsedSettled(collapsed);
            return;
        }
        const timeoutId = setTimeout(() => setCollapsedSettled(collapsed), COLLAPSE_DURATION_MS);
        return () => clearTimeout(timeoutId);
    }, [collapsed, collapsedSettled, isMotionOff]);

    // The effects below read the entries without depending on the array itself: a consumer that builds
    // the entries inline would otherwise re-run them on every render.
    const sectionsRef = React.useRef(sections);
    sectionsRef.current = sections;

    // A parent item opens the second column, so the column closes as soon as the mode goes off.
    React.useEffect(() => {
        if (!doublePanel) {
            setPanelOpenForItemId(null);
        }
    }, [doublePanel]);

    // A press on an item of the sidenav closes the second column and moves the selection at the same
    // time. The effect below reacts to the new selection, so the press records its selection here to
    // tell that effect that the user already dismissed the column for it.
    const dismissedSelectionRef = React.useRef<string | null>(null);

    const closePanelForSelection = React.useCallback(
        (selectionId: string | null) => {
            if (doublePanel) {
                dismissedSelectionRef.current = selectionId;
            }
            setPanelOpenForItemId(null);
        },
        [doublePanel]
    );

    // A press outside of the bar counts here instead of closing the column on its own. That press often
    // carries a new selection too, and both signals then reach the effect below in the same render, which
    // decides once. A close made from the listener would instead race the new selection.
    const [outsidePressCount, setOutsidePressCount] = React.useState(0);

    const panelOpenForItemIdRef = React.useRef(panelOpenForItemId);
    panelOpenForItemIdRef.current = panelOpenForItemId;

    // `undefined` marks a selection that the effect below never read. The first run then counts as a new
    // selection, and the column opens on the parent of the item the consumer selected from the start.
    const previousSelectionRef = React.useRef<string | null | undefined>(undefined);

    // The single owner of the second column, for every signal that comes from outside of the sidenav.
    // A new selection wins over a press outside of the bar, because the press that selects a child of the
    // app (a breadcrumb, a card, a button) lands outside of the bar:
    //   - a second-level item opens the column on its parent, so that the new selection stays visible;
    //   - a first-level item without children closes the column, because it has nothing to show there;
    //   - a press inside the sidenav closes the column through `closePanelForSelection`, and that press
    //     wins over the selection it carries.
    // A press outside of the bar with no new selection closes the column, unless the column holds the
    // current selection: the consumer that re-selects the child it already shows produces no render, so
    // the two cases are the same event for the component.
    React.useEffect(() => {
        if (!doublePanel) return;
        const entries = sectionsRef.current;
        if (!entries) return;

        const selectionChanged = previousSelectionRef.current !== selectedItemId;
        previousSelectionRef.current = selectedItemId;

        const dismissedSelection = dismissedSelectionRef.current;
        dismissedSelectionRef.current = null;

        if (selectionChanged) {
            if (!selectedItemId || dismissedSelection === selectedItemId) return;

            const parent = findParentOfItem(entries, selectedItemId);
            if (parent) {
                setPanelOpenForItemId(parent.id);
                return;
            }

            const firstLevelItem = findFirstLevelItem(entries, selectedItemId);
            if (firstLevelItem && !firstLevelItem.children?.length) {
                setPanelOpenForItemId(null);
            }
            return;
        }

        setPanelOpenForItemId((openForItemId) => {
            if (!openForItemId) return openForItemId;
            if (!selectedItemId) return null;
            return findParentOfItem(entries, selectedItemId)?.id === openForItemId ? openForItemId : null;
        });
    }, [doublePanel, selectedItemId, outsidePressCount]);

    // Only a press outside of the whole bar dismisses the second column, together with the Escape key. A
    // press inside the bar that lands on no item (the background of a column, a section title) keeps the
    // column open, and a press on an item closes it through `closePanelForSelection`.
    React.useEffect(() => {
        if (!doublePanel) return;

        const handlePressOutside = (event: MouseEvent) => {
            if (!panelOpenForItemIdRef.current) return;
            const container = containerRef.current;
            if (!container) return;
            // The browser builds this path when it dispatches the press, so the path still holds the node
            // that the user pressed and all of its ancestors, even when React replaced them before this
            // listener ran. Reading `event.target` instead counts a press on a control that swaps its own
            // node as a press outside of the bar: the collapse action swaps its icon, and a parent item
            // swaps its whole row, so both of them closed the column that they should have left alone.
            if (event.composedPath().includes(container)) return;
            setOutsidePressCount((count) => count + 1);
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setPanelOpenForItemId(null);
            }
        };

        document.addEventListener('click', handlePressOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('click', handlePressOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [doublePanel]);

    // Reset all state when sections changes to prevent hook reconciliation errors
    const prevSectionsLengthRef = React.useRef(sections?.length ?? 0);
    React.useEffect(() => {
        if ((sections?.length ?? 0) !== prevSectionsLengthRef.current) {
            prevSectionsLengthRef.current = sections?.length ?? 0;
            setPanelOpenForItemId(null);
        }
    }, [sections?.length]);

    // Extract and enforce opacity constraints on header/footer backgrounds
    const headerBackgroundColor = background?.header
        ? enforceOpaqueColor(background.header, 'header')
        : undefined;
    const footerBackgroundColor = background?.footer
        ? enforceOpaqueColor(background.footer, 'footer')
        : undefined;
    const bodyBackgroundColor = background?.body;

    const [showHeaderDivider, setShowHeaderDivider] = React.useState(false);
    const [showFooterDivider, setShowFooterDivider] = React.useState(false);
    const headerDividerSentinelRef = React.useRef<HTMLDivElement>(null);
    const footerDividerSentinelRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!bodyRef.current) return;

        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                setShowHeaderDivider(!entry.isIntersecting);
            },
            {root: bodyRef.current, threshold: 0}
        );

        const footerObserver = new IntersectionObserver(
            ([entry]) => {
                setShowFooterDivider(!entry.isIntersecting);
            },
            {root: bodyRef.current, threshold: 0}
        );

        if (headerDividerSentinelRef.current) {
            headerObserver.observe(headerDividerSentinelRef.current);
        }
        if (footerDividerSentinelRef.current) {
            footerObserver.observe(footerDividerSentinelRef.current);
        }

        return () => {
            headerObserver.disconnect();
            footerObserver.disconnect();
        };
    }, []);

    // The rail is travelling between its two widths. See `columnsWhileMoving`.
    const isMoving = collapsed !== collapsedSettled;

    const toggleCollapsed = React.useCallback(() => {
        // The collapse action keeps the focus while the rail moves, so the pointer rule of
        // `columnsWhileMoving` does not reach a press made with the keyboard. This does.
        if (isMoving) {
            return;
        }
        const next = !collapsed;
        if (!isCollapsedControlled) {
            setUncontrolledCollapsed(next);
            onCollapse?.(next);
            return;
        }
        onCollapse?.(next);
    }, [collapsed, isMoving, isCollapsedControlled, onCollapse]);

    const contextValue = React.useMemo(
        () => ({
            collapsed,
            collapsedSettled,
            collapsible,
            doublePanel,
            toggleCollapsed,
            panelOpenForItemId,
            setPanelOpenForItemId,
            closePanelForSelection,
            containerRef,
            isInsidePanel: false,
            selectedItemId: selectedItemId ?? null,
            onSelectedItemIdChange,
        }),
        [
            collapsed,
            collapsedSettled,
            collapsible,
            doublePanel,
            toggleCollapsed,
            panelOpenForItemId,
            closePanelForSelection,
            containerRef,
            selectedItemId,
            onSelectedItemIdChange,
        ]
    );

    const handleRailKeyDown = useSidenavRailKeyboard(containerRef);

    const currentWidth = collapsed ? COLLAPSED_WIDTH : width;

    if (process.env.NODE_ENV !== 'production') {
        const itemIds = new Set<string>();
        const duplicateIds = new Set<string>();

        const collectItemIds = (item: SidenavItemType): void => {
            if (itemIds.has(item.id)) {
                duplicateIds.add(item.id);
            } else {
                itemIds.add(item.id);
            }
            if (item.children) {
                item.children.forEach((child) => collectItemIds(child));
            }
        };

        if (sections) {
            getFirstLevelItems(sections).forEach((item) => collectItemIds(item));
        }

        if (duplicateIds.size > 0) {
            console.error(
                `SidenavBar: duplicate item IDs found: ${Array.from(duplicateIds).join(', ')}. ` +
                    `All SidenavItem ids must be unique within a SidenavBar.`
            );
        }
    }

    const normalizedVariant = normalizeVariant(variant);

    // A tablet has no room for the rail either, so both breakpoints take the mobile treatment. The spec
    // gives "N/A" for the width of the sidenav on mobile and on tablet. The mobile bar owns its own state,
    // so the desktop tree below keeps none of it.
    if (isTabletOrSmaller) {
        return (
            <SidenavMobileBar
                entries={sections}
                aria-label={ariaLabel}
                variant={normalizedVariant}
                logo={logo}
                headerSlot={headerSlot}
                footerSlot={footerSlot}
                selectedItemId={selectedItemId ?? null}
                onSelectedItemIdChange={onSelectedItemIdChange}
                dataAttributes={dataAttributes}
            />
        );
    }

    // The default logo is the isotype in both states, so the symbol keeps its place when the sidenav
    // collapses or expands. `logo` takes true for the default logo, so that a consumer can drive the
    // header from a flag of its own without repeating the default element. It also takes a function,
    // which receives the collapsed state, so a logo of its own swaps with the sidenav as well.
    const isLogoCollapsed = collapsed;
    // The default logo is the brand mark of the skin, which carries no navigation, so the header mutes it and
    // its reading order starts at the collapse action. A logo of the consumer keeps whatever the consumer
    // built into it, because that logo can hold meaning of its own.
    const isDefaultLogo = logo === undefined || logo === true;
    const logoElement = (() => {
        if (logo === false) {
            return null;
        }
        if (typeof logo === 'function') {
            return logo({collapsed: isLogoCollapsed});
        }
        if (isDefaultLogo) {
            return <Logo size={LOGO_SIZE} type="isotype" />;
        }
        return logo;
    })();

    // The header shows an icon button by default. A consumer that needs another control receives the props
    // of that button, so its own control keeps the behavior and the accessible name of the default one.
    const collapseActionElement = (() => {
        if (!collapsible) {
            return null;
        }

        const collapseActionProps: SidenavCollapseActionRenderProps = {
            collapsed,
            onPress: toggleCollapsed,
            'aria-label': collapsed
                ? texts.sidenavExpand || t(tokens.sidenavExpand)
                : texts.sidenavCollapse || t(tokens.sidenavCollapse),
            'aria-expanded': !collapsed,
        };

        if (renderCollapseAction) {
            return renderCollapseAction(collapseActionProps);
        }

        return (
            <IconButton
                Icon={collapsed ? IconPanelExpandRegular : IconPanelCollapseRegular}
                type="neutral"
                backgroundType="transparent"
                small
                onPress={collapseActionProps.onPress}
                aria-label={collapseActionProps['aria-label']}
                aria-expanded={collapseActionProps['aria-expanded']}
            />
        );
    })();

    const hasHeader = Boolean(logoElement || collapseActionElement || headerSlot);
    const hasBoxedBorder =
        boxed && shouldShowBoxedBorder(normalizedVariant, pageVariant, componentProperties.showBoxedBorder);

    // The second column belongs to the sidenav, not to the item that opens it, so that it can span the
    // whole height of the sidenav and push the content of the layout.
    const doublePanelItem =
        doublePanel && panelOpenForItemId && sections
            ? findFirstLevelItem(sections, panelOpenForItemId)
            : undefined;
    const doublePanelChildren = doublePanelItem?.children;
    const isDoublePanelOpen = Boolean(doublePanelChildren?.length);

    if (isDoublePanelOpen && doublePanelItem && doublePanelChildren) {
        lastDoublePanelContentRef.current = {label: doublePanelItem.label, children: doublePanelChildren};
    }
    const doublePanelContent = lastDoublePanelContentRef.current;

    return (
        <ThemeVariant variant={normalizedVariant}>
            <SidenavBarContext.Provider value={contextValue}>
                {/* The rail moves the focus between its items with the arrow keys, so the landmark holds the
                    key handler that owns that movement. */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <nav
                    ref={containerRef}
                    aria-label={ariaLabel}
                    onKeyDown={handleRailKeyDown}
                    className={classnames(styles.container, {
                        [styles.withRightDivider[normalizedVariant]]: divider && !boxed,
                        [styles.boxed]: boxed,
                        [styles.boxedBorder]: hasBoxedBorder,
                        [styles.columnsWhileMoving]: isMoving,
                    })}
                    style={applyCssVars({
                        [styles.sidenavWidthVar]: `${currentWidth}px`,
                        // The second column takes the width of the expanded sidenav, which the collapsed
                        // rail does not: a rail of 72px would give a column too narrow for its children.
                        [styles.sidenavPanelWidthVar]: `${width}px`,
                        // Every animated rule of the sidenav reads its duration from these two variables,
                        // which the whole tree inherits from this element.
                        [styles.collapseDurationVar]: `${isMotionOff ? 0 : COLLAPSE_DURATION_MS}ms`,
                        [styles.contentDurationVar]: `${isMotionOff ? 0 : CONTENT_DURATION_MS}ms`,
                    })}
                    {...getPrefixedDataAttributes({testid: 'SidenavBar', ...dataAttributes})}
                >
                    <div
                        className={classnames(styles.mainColumn, {
                            [styles.columnSeparator[normalizedVariant]]: isDoublePanelOpen,
                        })}
                    >
                        {hasHeader && (
                            <div
                                className={classnames(
                                    styles.headerBase,
                                    styles.regionBackground[normalizedVariant]
                                )}
                                style={
                                    headerBackgroundColor
                                        ? {backgroundColor: headerBackgroundColor}
                                        : undefined
                                }
                            >
                                <div
                                    className={classnames(styles.headerControls, {
                                        [styles.headerControlsCollapsed]: collapsed,
                                    })}
                                >
                                    {logoElement && (
                                        <div
                                            className={classnames(styles.logo, {
                                                [styles.logoCollapsed]: collapsed,
                                            })}
                                            // Only the default brand mark leaves the reading order. A logo of
                                            // the consumer keeps its own accessibility.
                                            aria-hidden={isDefaultLogo || undefined}
                                        >
                                            {logoElement}
                                        </div>
                                    )}
                                    {collapseActionElement}
                                </div>
                                {headerSlot && (
                                    <div
                                        className={classnames(styles.headerSlot, {
                                            [styles.headerSlotCollapsed]: collapsed,
                                        })}
                                    >
                                        {headerSlot}
                                    </div>
                                )}
                            </div>
                        )}
                        <div
                            ref={bodyRef}
                            className={classnames(
                                styles.bodyBase,
                                styles.regionBackground[normalizedVariant],
                                {
                                    [styles.bodyWithoutHeader]: !hasHeader,
                                }
                            )}
                            style={bodyBackgroundColor ? {backgroundColor: bodyBackgroundColor} : undefined}
                        >
                            <div ref={headerDividerSentinelRef} />
                            {showHeaderDivider && (
                                <div
                                    className={classnames(
                                        styles.scrollDivider,
                                        styles.headerScrollDivider,
                                        styles.scrollDividerVariant[normalizedVariant]
                                    )}
                                />
                            )}
                            {sections && (
                                <div className={styles.bodyContent}>{renderSidenavEntries(sections)}</div>
                            )}
                            {footerSlot && !fixedFooter && (
                                <>
                                    <div ref={footerDividerSentinelRef} />
                                    {showFooterDivider && (
                                        <div
                                            className={classnames(
                                                styles.scrollDivider,
                                                styles.footerScrollDivider,
                                                styles.scrollDividerVariant[normalizedVariant]
                                            )}
                                        />
                                    )}
                                    <div
                                        className={classnames(
                                            styles.footerBase,
                                            styles.regionBackground[normalizedVariant]
                                        )}
                                        style={
                                            footerBackgroundColor
                                                ? {backgroundColor: footerBackgroundColor}
                                                : undefined
                                        }
                                    >
                                        {footerSlot}
                                    </div>
                                </>
                            )}
                        </div>
                        {footerSlot && fixedFooter && (
                            <div
                                className={classnames(
                                    styles.footerBase,
                                    styles.regionBackground[normalizedVariant]
                                )}
                                style={
                                    footerBackgroundColor
                                        ? {backgroundColor: footerBackgroundColor}
                                        : undefined
                                }
                            >
                                {footerSlot}
                            </div>
                        )}
                    </div>
                    {doublePanelContent && (
                        <CSSTransition
                            in={isDoublePanelOpen}
                            timeout={isMotionOff ? 0 : COLLAPSE_DURATION_MS}
                            nodeRef={doublePanelRef}
                            classNames={styles.doublePanelTransitionClasses}
                            appear
                            mountOnEnter
                            unmountOnExit
                        >
                            <SidenavDoublePanel
                                ref={doublePanelRef}
                                label={doublePanelContent.label}
                                variant={normalizedVariant}
                                backgroundColor={bodyBackgroundColor}
                            >
                                {doublePanelContent.children.map((child) => renderSidenavItemFromData(child))}
                            </SidenavDoublePanel>
                        </CSSTransition>
                    )}
                </nav>
            </SidenavBarContext.Provider>
        </ThemeVariant>
    );
};

export default SidenavBar;
export {SidenavBar, SidenavSection, SidenavItem};
export {SidenavBarContext, useSidenavBarContext, SidenavLevelContext, assertChildrenAre, hasDescendantWithId};
export type {
    SidenavBarProps,
    SidenavSectionProps,
    SidenavBarBackgroundColors,
    SidenavCollapseActionRenderProps,
    SidenavLogoRenderProps,
};
