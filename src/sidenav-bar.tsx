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
import {useScreenSize, useTheme} from './hooks';
import {IconButton} from './icon-button';
import {Logo} from './logo';
import IconPanelExpandRegular from './generated/mistica-icons/icon-panel-expand-regular';
import IconPanelCollapseRegular from './generated/mistica-icons/icon-panel-collapse-regular';
import {SidenavFirstLevelItem} from './sidenav-bar-first-level-item';
import {SidenavNestedItem} from './sidenav-bar-nested-item';
import {SidenavSection} from './sidenav-bar-section';
import {SidenavDoublePanel} from './sidenav-bar-panel';
import {SidenavBarMobile} from './sidenav-bar-mobile';
import {useIsMotionOff} from './sidenav-bar-motion';
import {useSidenavRailKeyboard} from './sidenav-bar-keyboard';
import {SidenavBarContext} from './sidenav-bar-context';
import {shouldShowBoxedBorder} from './boxed';
import {
    isSidenavSection,
    getFirstLevelItems,
    getSidenavSectionTitle,
    renderSidenavSlot,
    renderSidenavLogo,
} from './sidenav-bar-data';
import * as tokens from './text-tokens';
import {isSidenavMoving} from './sidenav-bar-types';

import type {Variant} from './theme-variant-context';
import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes} from './utils/types';
import type {
    SidenavEntry,
    SidenavFirstLevelItem as SidenavFirstLevelItemData,
    SidenavNestedItem as SidenavNestedItemData,
    SidenavLogo,
    SidenavSlot,
    SidenavSlotRenderProps,
    SidenavCollapseState,
} from './sidenav-bar-types';

type SidenavBarBaseProps = {
    /**
     * First-level entries of the body. Each entry is either a section with items, or a stand-alone item
     * that needs no section.
     * @see SidenavEntry
     * @see SidenavSection
     * @see SidenavFirstLevelItem
     */
    entries?: ReadonlyArray<SidenavEntry>;
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
     * collapsed rail clamps the width of the logo to 32px, and the spot is at least 32px tall: a taller
     * logo of your own makes the spot grow. The mobile top bar matches the main navigation
     * bar: it shows the isotype at 40px, and it reports a collapsed state of false.
     * @see SidenavLogoRenderProps */
    logo?: SidenavLogo;
    /** Custom content below logo/collapse in header. It takes an element, or a function that receives the
     * collapse state and returns the content for that state.
     * @see SidenavSlotRenderProps */
    headerSlot?: SidenavSlot;
    /** Custom background color of the whole sidenav: header, body, footer and second column. Use an
     * opaque color: the header and the footer are sticky over the scrolling body, so a translucent color
     * lets the body content show through them. */
    background?: string;
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
 * - `showCollapseButton: false` removes the built-in collapse button, which is the only control that
 *   toggles the state from inside. Without it, the sidenav never changes the state by itself, so
 *   `onCollapse` has no event to report and `defaultCollapsed` has no state to seed: both are not
 *   allowed. That sidenav takes `collapsed` alone, and mirrors it on every render, so a control of your
 *   own (for example in a slot) still collapses it through that prop.
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
              /** Renders the built-in collapse button, which lets the user toggle the state. @default true */
              showCollapseButton?: true;
          }
        | {
              /** Initial collapsed state (uncontrolled). @default false */
              defaultCollapsed?: boolean;
              /** Optional handler for collapsed state changes (for logging/effects). */
              onCollapse?: (collapsed: boolean) => void;
              /** Renders the built-in collapse button, which lets the user toggle the state. @default true */
              showCollapseButton?: true;
          }
        | {
              /** Collapsed state. There is no built-in button to toggle it, so the sidenav mirrors this
               * prop on every render. Unlike `defaultCollapsed`, it is not a seed: a later change of it
               * moves the sidenav. @default false */
              collapsed?: boolean;
              /** Hides the built-in collapse button. Only a change of `collapsed` moves the sidenav. */
              showCollapseButton: false;
          }
    > &
    ExclusifyUnion<
        | {
              /** Custom content in footer region (at bottom of sidenav). It takes an element, or a function
               * that receives the collapse state and returns the content for that state.
               * @see SidenavSlotRenderProps */
              footerSlot: SidenavSlot;
              /** Keep footer fixed when scrolling. @default false */
              fixedFooter?: boolean;
          }
        | {
              /** No footer slot. */
              footerSlot?: undefined;
          }
    >;

const renderNestedItem = (item: SidenavNestedItemData): React.ReactElement => (
    <SidenavNestedItem
        key={item.id}
        id={item.id}
        label={item.label}
        asset={item.asset}
        rightSlot={item.rightSlot}
        href={item.href}
        to={item.to}
        onPress={item.onPress}
        newTab={item.newTab}
        onNavigate={item.onNavigate}
    />
);

const renderFirstLevelItem = (
    item: SidenavFirstLevelItemData,
    {standalone}: {standalone?: boolean} = {}
): React.ReactElement => (
    <SidenavFirstLevelItem
        key={item.id}
        id={item.id}
        label={item.label}
        asset={item.asset}
        showAssetWhenExpanded={item.showAssetWhenExpanded}
        rightSlot={item.rightSlot}
        standalone={standalone}
        defaultOpen={item.defaultOpen}
        childIds={item.children?.map((child) => child.id)}
        href={item.href}
        to={item.to}
        onPress={item.onPress}
        newTab={item.newTab}
        onNavigate={item.onNavigate}
    >
        {item.children?.map((child) => renderNestedItem(child))}
    </SidenavFirstLevelItem>
);

/**
 * Finds the first-level item that owns the given child id. The sidenav supports a single nesting
 * level, so the parent of an item is always a first-level item.
 */
const findParentOfItem = (
    entries: ReadonlyArray<SidenavEntry>,
    childId: string
): SidenavFirstLevelItemData | undefined =>
    getFirstLevelItems(entries).find((item) => item.children?.some((child) => child.id === childId));

/** Finds a first-level item by id. Only these items can open a panel. */
const findFirstLevelItem = (
    entries: ReadonlyArray<SidenavEntry>,
    itemId: string
): SidenavFirstLevelItemData | undefined => getFirstLevelItems(entries).find((item) => item.id === itemId);

/**
 * Development-only validation of the entries. It walks the data instead of checking inside each
 * `SidenavItem` render: every item of the sidenav comes from this data, so one walk covers all of
 * them, it reports each problem once, and it does not see the re-renders of the panel.
 */
const validateSidenavEntries = (entries: ReadonlyArray<SidenavEntry>): void => {
    const seenIds = new Set<string>();
    const duplicateIds = new Set<string>();

    const visitItem = (item: SidenavFirstLevelItemData | SidenavNestedItemData, level: number): void => {
        if (seenIds.has(item.id)) {
            duplicateIds.add(item.id);
        } else {
            seenIds.add(item.id);
        }
        if (level > 0 && item.children?.length) {
            console.error(
                `SidenavItem "${item.label}" at level ${level} cannot have children. ` +
                    `SidenavItem supports maximum 2 levels of nesting. ` +
                    `Only level 0 items can have children.`
            );
        }
        item.children?.forEach((child) => visitItem(child, level + 1));
    };

    getFirstLevelItems(entries).forEach((item) => visitItem(item, 0));

    if (duplicateIds.size > 0) {
        console.error(
            `SidenavBar: duplicate item IDs found: ${Array.from(duplicateIds).join(', ')}. ` +
                `All SidenavItem ids must be unique within a SidenavBar.`
        );
    }
};

const renderSidenavEntries = (entries: ReadonlyArray<SidenavEntry>): Array<React.ReactElement> => {
    // Every entry of the first level is one item of the body list, a section as much as a stand-alone
    // item. A section holds a list of its own, and a stand-alone item holds a single row.
    return entries.map((entry, entryIndex) => {
        if (isSidenavSection(entry)) {
            const previousEntry = entries[entryIndex - 1];
            const sharesDividerWithPrevious =
                !!entry.dividerTop &&
                !!previousEntry &&
                isSidenavSection(previousEntry) &&
                !!previousEntry.dividerBottom;
            const isFirstEntry = entryIndex === 0;
            const isLastEntry = entryIndex === entries.length - 1;
            return (
                <div key={`${getSidenavSectionTitle(entry.title).text}-${entryIndex}`} role="listitem">
                    <SidenavSection
                        title={entry.title}
                        dividerTop={entry.dividerTop && !isFirstEntry && !sharesDividerWithPrevious}
                        dividerBottom={entry.dividerBottom && !isLastEntry}
                    >
                        {entry.items.map((item) => renderFirstLevelItem(item))}
                    </SidenavSection>
                </div>
            );
        }

        return (
            <div key={entry.id} className={styles.standaloneItem} role="listitem">
                {renderFirstLevelItem(entry as SidenavFirstLevelItemData, {standalone: true})}
            </div>
        );
    });
};

const SidenavBar = ({
    entries,
    'aria-label': ariaLabelProp,
    variant = 'default',
    boxed = false,
    divider = true,
    showCollapseButton = true,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapse,
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
    const {componentProperties, texts, t} = useTheme();
    const ariaLabel = ariaLabelProp ?? (texts.sidenavLandmark || t(tokens.sidenavLandmark));
    const isMotionOff = useIsMotionOff();
    // Read before the `ThemeVariant` of the returned tree, so this is the variant of the page that holds the
    // sidenav, and not the variant of the sidenav itself.
    const pageVariant = normalizeVariant(useThemeVariant());
    const [panelOpenForItemId, setPanelOpenForItemId] = React.useState<string | null>(() =>
        doublePanel && entries && selectedItemId
            ? findParentOfItem(entries, selectedItemId)?.id ?? null
            : null
    );

    const isCollapsedControlled = collapsedProp !== undefined;
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed);
    // A controlled sidenav (`collapsed` set) reads the prop on every render. An uncontrolled one owns its
    // state, which `defaultCollapsed` seeds once. Without the built-in button nothing toggles that state,
    // so a sidenav that hides the button and omits `collapsed` keeps the seed, which the types pin to false.
    const collapsed = isCollapsedControlled ? Boolean(collapsedProp) : uncontrolledCollapsed;
    const containerRef = React.useRef<HTMLElement>(null);

    // The second column slides away instead of disappearing, so it still renders while it closes, when the
    // item that opened it is already gone. It therefore keeps the title and the children of that item
    // until a new item replaces them.
    const doublePanelRef = React.useRef<HTMLDivElement>(null);
    const [doublePanelContent, setDoublePanelContent] = React.useState<{
        itemId: string;
        label: string;
        children: ReadonlyArray<SidenavNestedItemData>;
    } | null>(null);

    // The settled state follows `collapsed` once the rail rests. A user who turned motion down sees no
    // movement, so it follows at once there.
    const [collapsedSettled, setCollapsedSettled] = React.useState(collapsed);
    React.useEffect(() => {
        if (isMotionOff) {
            setCollapsedSettled(collapsed);
            return;
        }
        const timeoutId = setTimeout(() => setCollapsedSettled(collapsed), COLLAPSE_DURATION_MS);
        return () => clearTimeout(timeoutId);
    }, [collapsed, isMotionOff]);
    const collapseState: SidenavCollapseState = collapsed
        ? collapsedSettled
            ? 'collapsed'
            : 'collapsing'
        : collapsedSettled
          ? 'expanding'
          : 'expanded';

    // A press on an item of the sidenav closes the panel and moves the selection at the same time.
    // The press records its selection here, so the adjustment below knows the user already dismissed
    // the second column for that selection, and does not reopen it.
    const [dismissedSelection, setDismissedSelection] = React.useState<string | null>(null);

    const selectItemAndClosePanel = React.useCallback(
        (itemId: string | null) => {
            if (doublePanel) {
                setDismissedSelection(itemId);
            }
            setPanelOpenForItemId(null);
            if (itemId) {
                onSelectedItemIdChange?.(itemId);
            }
        },
        [doublePanel, onSelectedItemIdChange]
    );

    // The second column follows the selection, which can also move from outside of the sidenav (a
    // breadcrumb, a card, a button of the app):
    //   - a second-level item opens the column on its parent, so that the new selection stays visible;
    //   - a first-level item without children closes the column, because it has nothing to show there;
    //   - a press inside the sidenav closes the column through `selectItemAndClosePanel`, and that press
    //     wins over the selection it carries.
    // The adjustment runs during the render, where the entries and the previous selection are both in
    // scope, so it needs no effect and no refs. React applies the state it sets before it paints.
    const [previousSelection, setPreviousSelection] = React.useState(selectedItemId);
    if (selectedItemId !== previousSelection) {
        setPreviousSelection(selectedItemId);
        if (dismissedSelection !== null) {
            setDismissedSelection(null);
        }
        if (doublePanel && entries && selectedItemId && dismissedSelection !== selectedItemId) {
            const parent = findParentOfItem(entries, selectedItemId);
            if (parent) {
                setPanelOpenForItemId(parent.id);
            } else {
                const firstLevelItem = findFirstLevelItem(entries, selectedItemId);
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
    const [previousEntriesLength, setPreviousEntriesLength] = React.useState(entries?.length ?? 0);
    if ((entries?.length ?? 0) !== previousEntriesLength) {
        setPreviousEntriesLength(entries?.length ?? 0);
        setPanelOpenForItemId(null);
    }

    // Only a press outside of the whole bar, or Escape, dismisses the second column: a press inside the
    // bar that lands on no item keeps it open, and a press on an item closes it through
    // `selectItemAndClosePanel`. A press that also carries a new selection does not race the close: the
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

    const backgroundStyle = background ? {backgroundColor: background} : undefined;

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

        // The sentinels have no height, and at rest they sit exactly on the edge of the scrollport. A
        // fractional layout (a boxed sidenav measures 100vh minus its margins) can leave them half a
        // pixel outside, and the observer would then paint the divider before any scroll. The 1px root
        // margin counts an edge-adjacent sentinel as inside.
        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                setShowHeaderDivider(!entry.isIntersecting);
            },
            {root: bodyRef.current, threshold: 0, rootMargin: '1px 0px 1px 0px'}
        );

        const footerObserver = new IntersectionObserver(
            ([entry]) => {
                setShowFooterDivider(!entry.isIntersecting);
            },
            {root: bodyRef.current, threshold: 0, rootMargin: '1px 0px 1px 0px'}
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
    const isMoving = isSidenavMoving(collapseState);

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
            collapseState,
            isMotionOff,
            doublePanel,
            panelOpenForItemId,
            setPanelOpenForItemId,
            selectItemAndClosePanel,
            containerRef,
            selectedItemId: selectedItemId ?? null,
        }),
        [
            collapsed,
            collapseState,
            isMotionOff,
            doublePanel,
            panelOpenForItemId,
            selectItemAndClosePanel,
            containerRef,
            selectedItemId,
        ]
    );

    const handleRailKeyDown = useSidenavRailKeyboard(containerRef);

    const currentWidth = collapsed ? COLLAPSED_WIDTH : width;

    if (process.env.NODE_ENV !== 'production' && entries) {
        validateSidenavEntries(entries);
    }

    const normalizedVariant = normalizeVariant(variant);

    // A tablet has no room for the rail either, so both breakpoints take the mobile treatment.
    if (isTabletOrSmaller) {
        return (
            <SidenavBarMobile
                entries={entries}
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

    const slotRenderProps: SidenavSlotRenderProps = {collapsed, state: collapseState};
    const isDefaultLogo = logo === undefined || logo === true;
    const logoElement = renderSidenavLogo(logo, slotRenderProps, <Logo size={LOGO_SIZE} type="isotype" />);

    const collapseActionElement = (() => {
        if (!showCollapseButton) {
            return null;
        }

        return (
            <IconButton
                Icon={collapsed ? IconPanelExpandRegular : IconPanelCollapseRegular}
                type="neutral"
                backgroundType="transparent"
                small
                onPress={toggleCollapsed}
                aria-label={
                    collapsed
                        ? texts.sidenavExpand || t(tokens.sidenavExpand)
                        : texts.sidenavCollapse || t(tokens.sidenavCollapse)
                }
                aria-expanded={!collapsed}
            />
        );
    })();

    const headerSlotElement = renderSidenavSlot(headerSlot, slotRenderProps);
    const footerSlotElement = renderSidenavSlot(footerSlot, slotRenderProps);
    const hasHeader = Boolean(logoElement || collapseActionElement || headerSlotElement);
    // todo https://github.com/Telefonica/mistica-design/issues/2827 review Boxed border rendering logic
    const hasBoxedBorder =
        boxed && shouldShowBoxedBorder(normalizedVariant, pageVariant, componentProperties.showBoxedBorder);

    // The second column belongs to the sidenav, not to the item that opens it, so that it can span the
    // whole height of the sidenav and push the content of the layout.
    const doublePanelItem =
        doublePanel && panelOpenForItemId && entries
            ? findFirstLevelItem(entries, panelOpenForItemId)
            : undefined;
    const doublePanelChildren = doublePanelItem?.children;
    const isDoublePanelOpen = Boolean(doublePanelChildren?.length);

    // This sets state during the render, as the block above does. React then paints once, with the new
    // content. The comparison skips the update when the content did not change, which would loop.
    if (
        doublePanelItem &&
        doublePanelChildren?.length &&
        (doublePanelContent?.label !== doublePanelItem.label ||
            doublePanelContent?.children !== doublePanelChildren)
    ) {
        setDoublePanelContent({
            itemId: doublePanelItem.id,
            label: doublePanelItem.label,
            children: doublePanelChildren,
        });
    }

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
                                style={backgroundStyle}
                            >
                                <div
                                    className={classnames(styles.headerControls, {
                                        [styles.headerControlsCollapsed]: collapsed,
                                    })}
                                >
                                    {logoElement && (
                                        <div
                                            className={classnames(styles.logo, {
                                                [styles.logoDefault]: isDefaultLogo,
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
                                {headerSlotElement && (
                                    <div
                                        className={classnames(styles.headerSlot, {
                                            [styles.headerSlotCollapsed]: collapsed,
                                        })}
                                    >
                                        {headerSlotElement}
                                    </div>
                                )}
                            </div>
                        )}
                        <div
                            ref={bodyRef}
                            className={classnames(
                                styles.bodyBase,
                                styles.regionBackground[normalizedVariant],
                                {[styles.bodyWithFixedFooter]: !!footerSlot && fixedFooter}
                            )}
                            style={backgroundStyle}
                            onFocus={(event) => {
                                // A row can take the focus while its ring crosses a seam: the row itself
                                // is visible, so the browser scrolls nothing, and the scroll padding of
                                // the body never engages. The nudge applies it. `nearest` keeps an
                                // already-clear row untouched, and the check leaves a pointer focus
                                // alone, which draws no ring.
                                const target = event.target as HTMLElement;
                                try {
                                    if (target.matches(':focus-visible')) {
                                        target.scrollIntoView({block: 'nearest'});
                                    }
                                } catch {
                                    // jsdom implements neither `:focus-visible` nor `scrollIntoView`.
                                }
                            }}
                        >
                            <div ref={headerDividerSentinelRef} />
                            <div
                                className={classnames(styles.headerScrollSpacer, {
                                    [styles.regionBackground[normalizedVariant]]:
                                        hasHeader && showHeaderDivider,
                                })}
                                style={hasHeader && showHeaderDivider ? backgroundStyle : undefined}
                            >
                                {hasHeader && showHeaderDivider && (
                                    <div
                                        className={classnames(
                                            styles.scrollSpacerDivider,
                                            styles.scrollDividerVariant[normalizedVariant]
                                        )}
                                    />
                                )}
                            </div>
                            {entries && (
                                // The body is the list of the first level. Each entry is one of its items.
                                <div className={styles.bodyContent} role="list">
                                    {renderSidenavEntries(entries)}
                                </div>
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
                                            styles.regionBackground[normalizedVariant],
                                            {[styles.footerCollapsed]: collapsed}
                                        )}
                                        style={backgroundStyle}
                                    >
                                        {footerSlotElement}
                                    </div>
                                </>
                            )}
                            {footerSlot && fixedFooter && (
                                <>
                                    <div ref={footerDividerSentinelRef} />
                                    <div
                                        className={classnames(styles.footerScrollSpacer, {
                                            [styles.regionBackground[normalizedVariant]]: showFooterDivider,
                                        })}
                                        style={showFooterDivider ? backgroundStyle : undefined}
                                    >
                                        {showFooterDivider && (
                                            <div
                                                className={classnames(
                                                    styles.scrollSpacerDivider,
                                                    styles.scrollDividerVariant[normalizedVariant]
                                                )}
                                            />
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        {footerSlot && fixedFooter && (
                            <div
                                className={classnames(
                                    styles.footerBase,
                                    styles.footerFixed,
                                    styles.regionBackground[normalizedVariant],
                                    {[styles.footerCollapsed]: collapsed}
                                )}
                                style={backgroundStyle}
                            >
                                {footerSlotElement}
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
                                itemId={doublePanelContent.itemId}
                                label={doublePanelContent.label}
                                variant={normalizedVariant}
                                backgroundColor={background}
                            >
                                {doublePanelContent.children.map((child) => renderNestedItem(child))}
                            </SidenavDoublePanel>
                        </CSSTransition>
                    )}
                </nav>
            </SidenavBarContext.Provider>
        </ThemeVariant>
    );
};

export default SidenavBar;
export {SidenavBar};
export type {SidenavBarProps};
