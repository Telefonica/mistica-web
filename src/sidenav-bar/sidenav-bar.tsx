'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {DEFAULT_WIDTH, COLLAPSED_WIDTH, LOGO_SIZE} from './sidenav-bar.css';
import {ThemeVariant, normalizeVariant, useThemeVariant} from '../theme-variant-context';
import {getPrefixedDataAttributes} from '../utils/dom';
import {applyCssVars} from '../utils/css';
import {useScreenSize, useTheme} from '../hooks';
import {IconButton} from '../icon-button';
import {Logo} from '../logo';
import Divider from '../divider';
import {Text3} from '../text';
import IconPanelExpandRegular from '../generated/mistica-icons/icon-panel-expand-regular';
import IconPanelCollapseRegular from '../generated/mistica-icons/icon-panel-collapse-regular';
import {SidenavItem} from './sidenav-item';
import {SidenavDoublePanel} from './sidenav-panel';
import {SidenavMobileBar} from './sidenav-mobile';
import {isSidenavSection} from './sidenav-types';
import {
    SidenavBarContext,
    useSidenavBarContext,
    SidenavLevelContext,
    assertChildrenAre,
    hasDescendantWithId,
} from './sidenav-context';
import {shouldShowBoxedBorder} from '../boxed';

import type {Variant} from '../theme-variant-context';
import type {ExclusifyUnion} from '../utils/utility-types';
import type {DataAttributes} from '../utils/types';
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

/*
 * SidenavBar — Mistica sidenav navigation component.
 *
 * This component follows the Mistica "sidenav" spec:
 * https://github.com/Telefonica/mistica-design/blob/aweell-generate-figma-specs/specs/sidenav.md
 *
 * The public API (props of SidenavBar / SidenavSection / SidenavItem) is stable and includes:
 *   - Dialog panel rendering of nested items when collapsed
 *   - Double panel rendering of nested items when doublePanel={true}
 *   - The mobile and tablet burger menu, which `SidenavMobileBar` renders
 *
 * Behaviours described in the spec that are not yet implemented:
 *   - Layout wrapper for the main content (whole-viewport / centered).
 *   - Per-region colour token matrices for brand/alternative/negative/media variants
 *     (currently only the `default` variant is fully styled; other variants still
 *     provide the correct `ThemeVariant` context to descendant components).
 */

// -----------------------------------------------------------------------------
// SidenavSection
// -----------------------------------------------------------------------------

type SidenavSectionProps = {
    /** Section heading. Hidden (space reserved) when the sidenav is collapsed. */
    title?: string;
    /** Renders a divider above the section. @default false */
    dividerTop?: boolean;
    /** Renders a divider below the section. @default false */
    dividerBottom?: boolean;
    /** Navigation items (`SidenavItem` elements).
     * @see SidenavItem
     */
    children: React.ReactNode;
    dataAttributes?: DataAttributes;
};

const SidenavSection = ({
    title,
    dividerTop,
    dividerBottom,
    children,
    dataAttributes,
}: SidenavSectionProps): JSX.Element => {
    const {collapsed} = useSidenavBarContext();
    const variant = useThemeVariant();

    return (
        <div
            className={styles.section}
            role="group"
            aria-label={title}
            {...getPrefixedDataAttributes({testid: 'SidenavSection', ...dataAttributes})}
        >
            {dividerTop && (
                <div className={styles.sectionDivider}>
                    <Divider />
                </div>
            )}
            {title && (
                <div
                    className={classnames(styles.sectionTitle, styles.sectionTitleVariant[variant], {
                        [styles.sectionTitleCollapsed]: collapsed,
                    })}
                >
                    <Text3 medium truncate={collapsed ? 1 : undefined} color="inherit">
                        {title}
                    </Text3>
                </div>
            )}
            <div className={styles.sectionContent}>{children}</div>
            {dividerBottom && (
                <div className={styles.sectionDivider}>
                    <Divider />
                </div>
            )}
        </div>
    );
};

// -----------------------------------------------------------------------------
// SidenavBar
// -----------------------------------------------------------------------------

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
};

type SidenavBarBaseProps = {
    /** First-level entries of the body. Each entry is either a section with items, or a stand-alone
     * item that needs no section. Data-driven API replaces JSX children for better alignment with
     * MainNavigationBar.
     * @see SidenavEntry
     * @see SidenavSection
     * @see SidenavItem
     */
    sections?: ReadonlyArray<SidenavEntry>;
    /** Accessible name of the navigation landmark. @default 'Main navigation' */
    'aria-label'?: string;
    /** Color variant (default, brand, alternative, negative, media). @default 'default' */
    variant?: Variant;
    /** Width of expanded sidenav in pixels. The second column takes the same width. @default 240 */
    width?: number;
    /** Opens the children of a parent item in a second column, to the right of the sidenav.
     * @default false */
    doublePanel?: boolean;
    /** Logo of the header. Defaults to the logo of the skin: the imagotype when the sidenav is expanded,
     * and the isotype when it is collapsed, both 32px tall. It takes true for that same default, false to
     * hide the logo, an element of your own, or a function that receives the collapsed state and returns
     * one logo for each state. The collapsed rail clamps the width of the logo to 32px. The mobile top bar
     * is not a rail, so it shows the imagotype at 40px, and it reports a collapsed state of false.
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

// Render a single item with its nested children recursively
const renderSidenavItemFromData = (item: SidenavItemType): React.ReactElement => {
    const children = item.children?.map((child) => renderSidenavItemFromData(child));
    const baseProps = {
        id: item.id,
        label: item.label,
        asset: item.asset,
        showIconWhenExpanded: item.showIconWhenExpanded,
        rightSlot: item.rightSlot,
        defaultOpen: item.defaultOpen,
        newTab: item.newTab,
        onNavigate: item.onNavigate,
        children,
    };

    // Build navigation props based on which one is defined
    if (item.href !== undefined) {
        return <SidenavItem key={item.id} {...(baseProps as any)} href={item.href} />;
    }
    if (item.to !== undefined) {
        return <SidenavItem key={item.id} {...(baseProps as any)} to={item.to} />;
    }
    if (item.onPress !== undefined) {
        return <SidenavItem key={item.id} {...(baseProps as any)} onPress={item.onPress} />;
    }
    // No navigation: this item has children
    return <SidenavItem key={item.id} {...(baseProps as any)} />;
};

/** The items of the first level, in order: the items of every section, and every stand-alone item. */
const getFirstLevelItems = (entries: ReadonlyArray<SidenavEntry>): Array<SidenavItemType> =>
    entries.flatMap((entry) => (isSidenavSection(entry) ? [...entry.items] : [entry as SidenavItemType]));

/**
 * Finds the first-level item that owns the given child id. The sidenav supports a single nesting
 * level, so the parent of an item is always a first-level item.
 */
const findParentOfItem = (
    entries: ReadonlyArray<SidenavEntry>,
    childId: string
): SidenavItemType | undefined =>
    getFirstLevelItems(entries).find((item) => item.children?.some((child) => child.id === childId));

/** Finds a first-level item by id. Only these items can open a panel. */
const findFirstLevelItem = (
    entries: ReadonlyArray<SidenavEntry>,
    itemId: string
): SidenavItemType | undefined => getFirstLevelItems(entries).find((item) => item.id === itemId);

/**
 * Render the first-level entries of the body. An entry is either a section, which groups its items,
 * or a stand-alone item, which the items rail wraps so that it aligns with the items of a section.
 */
const renderSidenavEntries = (entries: ReadonlyArray<SidenavEntry>): Array<React.ReactElement> =>
    entries.map((entry, entryIndex) => {
        if (isSidenavSection(entry)) {
            return (
                <SidenavSection
                    key={entry.title || `section-${entryIndex}`}
                    title={entry.title}
                    dividerTop={entry.dividerTop}
                    dividerBottom={entry.dividerBottom}
                >
                    {entry.items.map((item) => renderSidenavItemFromData(item))}
                </SidenavSection>
            );
        }

        return (
            <div key={entry.id} className={styles.standaloneItem}>
                {renderSidenavItemFromData(entry as SidenavItemType)}
            </div>
        );
    });

const SidenavBar = ({
    sections,
    'aria-label': ariaLabel = 'Main navigation',
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
    const {componentProperties} = useTheme();
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
            const target = event.target;
            if (target instanceof Node && containerRef.current?.contains(target)) return;
            // A press on a parent item opens the column, or replaces its content. That press re-renders
            // the item (a collapsed item drops its tooltip wrapper, for instance), so its node can leave
            // the document before this listener runs, and the check above then reads it as a press
            // outside of the bar. The node still carries the marker of a parent item, which tells that
            // the press came from the bar itself.
            if (target instanceof Element && target.closest('[data-parent-item="true"]')) return;
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

    const toggleCollapsed = React.useCallback(() => {
        const next = !collapsed;
        if (!isCollapsedControlled) {
            setUncontrolledCollapsed(next);
            onCollapse?.(next);
            return;
        }
        onCollapse?.(next);
    }, [collapsed, isCollapsedControlled, onCollapse]);

    const contextValue = React.useMemo(
        () => ({
            collapsed,
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

    // The expanded sidenav has room for the brand name, so the default logo is the imagotype. The
    // collapsed rail only fits the symbol, so it falls back to the isotype. Both keep the same height.
    // The symbol shifts a little between the two states, and the sidenav does not cause it: both boxes
    // sit at the same top and the same left. Each brand draws its symbol at its own scale and offset
    // inside the canvas of 72 units of its two artworks. Movistar centers the symbol in the imagotype
    // and places it 1.5 units above centre in the isotype, which reads as 0.67px at a height of 32px.
    // Telefonica reaches 4px. A correction belongs to the artwork of the skin, not here: an offset in
    // this component would need one value per skin and would still leave the other components unaligned.
    // `logo` takes true for the default logo, so that a consumer can drive the header from a flag of its
    // own without repeating the default element. It also takes a function, which receives the same state
    // that the default logo reads, so a logo of its own swaps with the sidenav as well.
    const isLogoCollapsed = collapsed;
    const logoElement = (() => {
        if (logo === false) {
            return null;
        }
        if (typeof logo === 'function') {
            return logo({collapsed: isLogoCollapsed});
        }
        if (logo === undefined || logo === true) {
            return <Logo size={LOGO_SIZE} type={isLogoCollapsed ? 'isotype' : 'imagotype'} />;
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
            'aria-label': collapsed ? 'Expand navigation' : 'Collapse navigation',
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

    return (
        <ThemeVariant variant={normalizedVariant}>
            <SidenavBarContext.Provider value={contextValue}>
                <nav
                    ref={containerRef}
                    aria-label={ariaLabel}
                    className={classnames(styles.container, {
                        [styles.withRightDivider[normalizedVariant]]: divider && !boxed,
                        [styles.boxed]: boxed,
                        [styles.boxedBorder]: hasBoxedBorder,
                    })}
                    style={applyCssVars({
                        [styles.sidenavWidthVar]: `${currentWidth}px`,
                        // The second column takes the width of the expanded sidenav, which the collapsed
                        // rail does not: a rail of 72px would give a column too narrow for its children.
                        [styles.sidenavPanelWidthVar]: `${width}px`,
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
                    {isDoublePanelOpen && doublePanelItem && doublePanelChildren && (
                        <SidenavDoublePanel
                            label={doublePanelItem.label}
                            variant={normalizedVariant}
                            backgroundColor={bodyBackgroundColor}
                        >
                            {doublePanelChildren.map((child) => renderSidenavItemFromData(child))}
                        </SidenavDoublePanel>
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
