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
import {ThemeVariant, normalizeVariant, useThemeVariant} from './theme-variant-context';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import {isRunningAcceptanceTest} from './utils/platform';
import {useScreenSize, useTheme} from './hooks';
import {IconButton} from './icon-button';
import {Logo} from './logo';
import IconPanelExpandRegular from './generated/mistica-icons/icon-panel-expand-regular';
import IconPanelCollapseRegular from './generated/mistica-icons/icon-panel-collapse-regular';
import {SidenavItem} from './sidenav-bar-item';
import {SidenavSection} from './sidenav-bar-section';
import {
    renderSidenavItemFromData,
    getFirstLevelItems,
    findParentOfItem,
    findFirstLevelItem,
    renderSidenavEntries,
} from './sidenav-bar-entries';
import {SidenavDoublePanel} from './sidenav-bar-panel';
import {SidenavMobileBar} from './sidenav-bar-mobile';
import {useIsReducedMotion} from './sidenav-bar-motion';
import {useSidenavRailKeyboard} from './use-sidenav-bar-keyboard';
import {
    SidenavBarContext,
    useSidenavBarContext,
    SidenavLevelContext,
    assertChildrenAre,
    hasDescendantWithId,
} from './sidenav-bar-context';
import {shouldShowBoxedBorder} from './boxed';
import * as tokens from './text-tokens';

import type {Variant} from './theme-variant-context';
import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes} from './utils/types';
import type {SidenavSectionProps} from './sidenav-bar-section';
import type {
    SidenavEntry,
    SidenavItem as SidenavItemType,
    SidenavLogo,
    SidenavLogoRenderProps,
} from './sidenav-bar-types';

type SidenavBarBackgroundColors = {
    /** Header background color. Use an opaque color: the header is sticky over the scrolling body, so a
     * translucent color lets the body content show through it. */
    header?: string;
    /** Body background color (can be any color including transparent). */
    body?: string;
    /** Footer background color. Use an opaque color: the footer is sticky over the scrolling body, so a
     * translucent color lets the body content show through it. */
    footer?: string;
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
 * - When `collapsible: false`, the sidenav cannot be toggled, so `onCollapse` is not allowed, and it takes
 *   the static `collapsed` prop (not `defaultCollapsed`), which drives the collapsed state of every render
 *   instead of seeding it once. That sidenav shows no collapse action either, so `renderCollapseAction` is
 *   not allowed there.
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
              /** Collapsed state. The user cannot toggle it, so the sidenav mirrors this prop on every
               * render. Unlike `defaultCollapsed`, it is not a seed: a later change of it moves the
               * sidenav. @default false */
              collapsed?: boolean;
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
    const ariaLabel = ariaLabelProp ?? (texts.sidenavLandmark || t(tokens.sidenavLandmark));
    const isReducedMotion = useIsReducedMotion();
    // Acceptance runs and reduced motion both force zero-duration motion, so no half-animated node is
    // left in the DOM after the state that removed it.
    const isMotionOff = isRunningAcceptanceTest(platformOverrides) || isReducedMotion;
    // Read before the `ThemeVariant` of the returned tree, so this is the variant of the page that holds the
    // sidenav, and not the variant of the sidenav itself.
    const pageVariant = normalizeVariant(useThemeVariant());
    const [panelOpenForItemId, setPanelOpenForItemId] = React.useState<string | null>(() =>
        doublePanel && sections && selectedItemId
            ? findParentOfItem(sections, selectedItemId)?.id ?? null
            : null
    );

    const isCollapsedControlled = collapsedProp !== undefined;
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed);
    // The collapsed state is read on every render when the sidenav is controlled (`collapsed` set) or
    // cannot be toggled. A toggleable, uncontrolled sidenav instead owns its state, which `defaultCollapsed`
    // seeds once. A non-toggleable sidenav that omits `collapsed` falls back to that same default (false).
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

    // See `collapsedSettled` in `sidenav-bar-context.tsx` for why the sidenav reports the collapsed state
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

    // A press on an item of the sidenav closes the second column and moves the selection at the same
    // time. The press records its selection here, so the adjustment below knows the user already
    // dismissed the column for that selection, and does not reopen it.
    const [dismissedSelection, setDismissedSelection] = React.useState<string | null>(null);

    const closePanelForSelection = React.useCallback(
        (selectionId: string | null) => {
            if (doublePanel) {
                setDismissedSelection(selectionId);
            }
            setPanelOpenForItemId(null);
        },
        [doublePanel]
    );

    // The second column follows the selection, which can also move from outside of the sidenav (a
    // breadcrumb, a card, a button of the app):
    //   - a second-level item opens the column on its parent, so that the new selection stays visible;
    //   - a first-level item without children closes the column, because it has nothing to show there;
    //   - a press inside the sidenav closes the column through `closePanelForSelection`, and that press
    //     wins over the selection it carries.
    // The adjustment runs during the render, where the entries and the previous selection are both in
    // scope, so it needs no effect and no refs. React applies the state it sets before it paints.
    const [previousSelection, setPreviousSelection] = React.useState(selectedItemId);
    if (selectedItemId !== previousSelection) {
        setPreviousSelection(selectedItemId);
        if (dismissedSelection !== null) {
            setDismissedSelection(null);
        }
        if (doublePanel && sections && selectedItemId && dismissedSelection !== selectedItemId) {
            const parent = findParentOfItem(sections, selectedItemId);
            if (parent) {
                setPanelOpenForItemId(parent.id);
            } else {
                const firstLevelItem = findFirstLevelItem(sections, selectedItemId);
                if (firstLevelItem && !firstLevelItem.children?.length) {
                    setPanelOpenForItemId(null);
                }
            }
        }
    }

    // The column closes as soon as the double panel mode goes off. Only the change of the mode closes it:
    // the collapsed rail opens its dialog panel through this same state with the mode off.
    const [previousDoublePanel, setPreviousDoublePanel] = React.useState(doublePanel);
    if (doublePanel !== previousDoublePanel) {
        setPreviousDoublePanel(doublePanel);
        if (!doublePanel) {
            setPanelOpenForItemId(null);
        }
    }

    // A change of the entries invalidates the open column, whose parent item may not exist anymore.
    const [previousSectionsLength, setPreviousSectionsLength] = React.useState(sections?.length ?? 0);
    if ((sections?.length ?? 0) !== previousSectionsLength) {
        setPreviousSectionsLength(sections?.length ?? 0);
        setPanelOpenForItemId(null);
    }

    // Only a press outside of the whole bar, or Escape, dismisses the second column: a press inside the
    // bar that lands on no item keeps it open, and a press on an item closes it through
    // `closePanelForSelection`. A press that also carries a new selection does not race the close: the
    // adjustment above reopens the column for that selection in the same batch of updates.
    React.useEffect(() => {
        if (!doublePanel || !panelOpenForItemId) {
            return;
        }

        const handlePressOutside = (event: MouseEvent) => {
            const container = containerRef.current;
            if (!container) return;
            // The browser builds this path when it dispatches the press, so the path still holds the node
            // that the user pressed and all of its ancestors, even when React replaced them before this
            // listener ran. Reading `event.target` instead counts a press on a control that swaps its own
            // node as a press outside of the bar: the collapse action swaps its icon, and a parent item
            // swaps its whole row, so both of them closed the column that they should have left alone.
            if (event.composedPath().includes(container)) return;
            setPanelOpenForItemId(null);
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
    }, [doublePanel, panelOpenForItemId]);

    const headerBackgroundColor = background?.header;
    const footerBackgroundColor = background?.footer;
    const bodyBackgroundColor = background?.body;

    const [showHeaderDivider, setShowHeaderDivider] = React.useState(false);
    const [showFooterDivider, setShowFooterDivider] = React.useState(false);
    // The panel keeps its node while it slides back into the main column, so the column separator stays with
    // it until the movement ends. `isDoublePanelOpen` alone drops the separator when the panel starts to
    // close, and the boundary disappears while the column is still visible.
    const [isDoublePanelMounted, setIsDoublePanelMounted] = React.useState(false);
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

    // A tablet has no room for the rail either, so both breakpoints take the mobile treatment.
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

    const isLogoCollapsed = collapsed;
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
                        [styles.sidenavPanelWidthVar]: `${width}px`,
                        [styles.collapseDurationVar]: `${isMotionOff ? 0 : COLLAPSE_DURATION_MS}ms`,
                        [styles.contentDurationVar]: `${isMotionOff ? 0 : CONTENT_DURATION_MS}ms`,
                    })}
                    {...getPrefixedDataAttributes({testid: 'SidenavBar', ...dataAttributes})}
                >
                    <div
                        className={classnames(styles.mainColumn, {
                            [styles.columnSeparator[normalizedVariant]]:
                                isDoublePanelOpen || isDoublePanelMounted,
                        })}
                    >
                        {hasHeader && (
                            <div
                                className={classnames(
                                    styles.headerBase,
                                    styles.regionBackground[normalizedVariant],
                                    {
                                        [styles.headerNegativeBoxedBackground]:
                                            boxed && normalizedVariant === 'negative',
                                    }
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
                            {hasHeader && showHeaderDivider && (
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
                            onEnter={() => setIsDoublePanelMounted(true)}
                            onExited={() => setIsDoublePanelMounted(false)}
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
