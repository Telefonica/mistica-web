'use client';
import * as React from 'react';
import classnames from 'classnames';
import {CSSTransition} from 'react-transition-group';
import * as styles from './sidenav-bar.css';
import {
    NESTING_INDENT,
    CONTENT_DURATION_MS,
    LABEL_DELAY_BASE_MS,
    LABEL_DELAY_STEP_MS,
    LABEL_DELAY_MAX_MS,
} from './sidenav-bar.css';
import {
    useSidenavBarContext,
    SidenavLevelContext,
    SidenavItemIndexContext,
    SidenavHasOuterListItemContext,
    hasDescendantWithId,
} from './sidenav-bar-context';
import {SidenavDialogPanel} from './sidenav-bar-panel';
import {useIsReducedMotion} from './sidenav-bar-motion';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import {isRunningAcceptanceTest} from './utils/platform';
import {useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';
import Touchable from './touchable';
import Tooltip from './tooltip';
import {Text2} from './text';
import IconChevronDownRegular from './generated/mistica-icons/icon-chevron-down-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps} from './utils/types';

type SidenavItemBaseProps = {
    /** Display text. A text longer than the row wraps over several lines, and it never truncates. */
    label: string;
    /** Icon component or element to display. Required for top-level items in collapsed sidenav. */
    asset?: ((props: IconProps) => JSX.Element) | React.ReactElement;
    /** Show asset when expanded (not collapsed). @default true */
    showIconWhenExpanded?: boolean;
    /** Custom content on the right side (e.g., Badge). */
    rightSlot?: React.ReactNode;
    /** Initial expanded state for items with children. @default false */
    defaultOpen?: boolean;
    dataAttributes?: DataAttributes;
};

type SidenavItemWithChildrenProps = SidenavItemBaseProps & {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Nested SidenavItem elements (max 2 nesting levels). Mutually exclusive with `href`, `onPress`, and `to`. */
    children: React.ReactNode;
    onPress?: undefined;
    href?: undefined;
    to?: undefined;
};

type SidenavItemOnPressProps = SidenavItemBaseProps & {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Click handler for custom actions. Mutually exclusive with `href`, `to`, and `children`. */
    onPress: () => void;
    href?: undefined;
    to?: undefined;
    children?: undefined;
};

type SidenavItemHrefProps = SidenavItemBaseProps & {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Navigation URL for href link. Mutually exclusive with `onPress`, `to`, and `children`. */
    href: string;
    /** Open link in new tab. @default false */
    newTab?: boolean;
    /** Called after navigation. */
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    to?: undefined;
    children?: undefined;
};

type SidenavItemToProps = SidenavItemBaseProps & {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Router link target. Mutually exclusive with `onPress`, `href`, and `children`. */
    to: string;
    /** Open link in new tab. @default false */
    newTab?: boolean;
    /** Called after navigation. */
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    href?: undefined;
    children?: undefined;
};

type SidenavItemProps = ExclusifyUnion<
    SidenavItemWithChildrenProps | SidenavItemOnPressProps | SidenavItemHrefProps | SidenavItemToProps
>;

/**
 * Navigation item component for use within SidenavSection.
 * Props `href`, `onPress`, `to`, and `children` are mutually exclusive—use exactly one of these to define the item's behavior.
 */
const SidenavItem = (props: SidenavItemProps): JSX.Element => {
    const {
        label,
        asset,
        id,
        rightSlot,
        children,
        defaultOpen,
        dataAttributes,
        showIconWhenExpanded = true,
    } = props as any;
    const {
        collapsed,
        collapsedSettled,
        doublePanel,
        panelOpenForItemId,
        setPanelOpenForItemId,
        closePanelForSelection,
        containerRef,
        isInsidePanel,
        selectedItemId,
        onSelectedItemIdChange,
    } = useSidenavBarContext();
    const level = React.useContext(SidenavLevelContext);
    const itemIndex = React.useContext(SidenavItemIndexContext);
    const hasOuterListItem = React.useContext(SidenavHasOuterListItemContext);
    const {platformOverrides} = useTheme();
    const isReducedMotion = useIsReducedMotion();
    const isMotionOff = isRunningAcceptanceTest(platformOverrides) || isReducedMotion;
    // `SidenavBar` overrides the ambient variant with its own, so the item takes its colors from here. The
    // floating panel of a collapsed sidenav restores the default variant, and its items follow.
    const variant = useThemeVariant();

    const isItemSelected = id !== undefined && selectedItemId === id;
    const hasDescendantSelected = hasDescendantWithId(children, selectedItemId);
    const selected = isItemSelected || hasDescendantSelected;

    const hasChildren = React.Children.count(children) > 0;
    const isPanelOpen = hasChildren && panelOpenForItemId === id;
    // The left accent bar marks the directly-selected item only. A parent whose panel is open shows the
    // selected background, but never the accent: the accent belongs to the selected child.
    const showAccent = isItemSelected;

    const [open, setOpen] = React.useState(Boolean(defaultOpen));
    const nestedListRef = React.useRef<HTMLDivElement>(null);
    // The dialog panel lives in a portal, far from its trigger in the document, so the trigger names it
    // with `aria-controls`. The id exists on every item, and only the open dialog panel carries it.
    const dialogPanelId = React.useId();
    const shouldShowPanelMode = hasChildren && (collapsed || doublePanel);
    const isOpen = hasChildren && !collapsed && !shouldShowPanelMode && open;
    // In double panel mode the sidenav renders the panel as its second column, so the item only tracks
    // the open state. The dialog panel, instead, is anchored to this item and rendered here.
    const isDialogMode = shouldShowPanelMode && !doublePanel;

    // The panel of another parent takes the background for itself, so that the sidenav never shows two
    // highlighted parents. This parent takes the background back as soon as that panel closes, which
    // needs no change of the selection.
    const isPanelOpenForAnotherItem = Boolean(panelOpenForItemId && panelOpenForItemId !== id);

    // The selected background also marks a parent whose descendant is selected, but only while that
    // parent is closed (accordion collapsed, or in collapsed/panel mode) so it flags the hidden
    // selection. Once the accordion is open the selected child renders its own background, so the
    // parent drops it to avoid two stacked highlights.
    const showBackground =
        isItemSelected || isPanelOpen || (hasDescendantSelected && !isOpen && !isPanelOpenForAnotherItem);

    // Auto-expand this parent whenever the selection moves to one of its descendants. The effect keys
    // on the selected descendant id (not on a boolean) so that a selection change between two siblings
    // reopens a parent the user closed, which keeps the new selection visible. It only ever opens
    // (never force-closes), so sibling parents and unrelated manual collapses are left as-is.
    const selectedDescendantId = hasDescendantSelected ? selectedItemId : null;
    React.useEffect(() => {
        if (selectedDescendantId !== null) {
            setOpen(true);
        }
    }, [selectedDescendantId]);

    const wrapNavCallback = (callback?: () => void | Promise<void>): (() => Promise<void>) => {
        return async () => {
            // Any navigation closes the open panel: a press on one of its children, and also a press on
            // a first-level item that navigates instead of revealing children. The close comes first and
            // carries the new selection, because the selection of this press must not reopen the panel,
            // and the bar reads that selection as soon as the consumer applies it.
            closePanelForSelection(id ?? null);
            if (id && onSelectedItemIdChange) {
                onSelectedItemIdChange(id);
            }
            await callback?.();
        };
    };

    const navigationProps = (() => {
        switch (true) {
            case !!props.onPress:
                return {onPress: wrapNavCallback(props.onPress)};
            case props.href !== undefined:
                return {
                    href: props.href,
                    newTab: props.newTab,
                    onNavigate: wrapNavCallback(props.onNavigate),
                };
            case props.to !== undefined:
                return {to: props.to, newTab: props.newTab, onNavigate: wrapNavCallback(props.onNavigate)};
            default:
                return null;
        }
    })();

    const ChevronIcon = doublePanel ? IconChevronRightRegular : IconChevronDownRegular;

    const shouldShowAsset = asset && (collapsed || showIconWhenExpanded);
    let assetContent: React.ReactNode = null;
    if (typeof asset === 'function') {
        const Asset = asset;
        assetContent = <Asset size={20} color="currentColor" />;
    } else if (asset) {
        assetContent = asset;
    }
    const assetElement =
        shouldShowAsset && assetContent ? (
            <span className={classnames(styles.itemAsset, styles.itemAssetVariant[variant])}>
                {assetContent}
            </span>
        ) : null;

    // The label keeps its box on the collapsed rail, where it fades out. It stays in the DOM there, which
    // the spec asks for: a screen reader still reads it, and the fade needs it.
    const isLabelCollapsed = collapsed && !isInsidePanel;
    // The label holds the width of its text while the sidenav moves, in both directions: during a collapse
    // the sidenav is already collapsed, and during an expansion the settled state still reports the rail.
    // The expanded sidenav at rest drops it, and the label wraps there. See `itemLabelKeepsWidth`.
    const isLabelWidthKept = !isInsidePanel && (collapsed || collapsedSettled);
    const labelNode = (
        <div
            className={classnames(styles.itemLabel, {
                [styles.itemLabelCollapsed]: isLabelCollapsed,
                [styles.itemLabelKeepsWidth]: isLabelWidthKept,
            })}
        >
            <Text2 regular color="inherit">
                {label}
            </Text2>
        </div>
    );

    const touchableClassName = classnames(styles.itemTouchable, styles.itemTouchableVariant[variant], {
        [styles.itemTouchableSelected[variant]]: showBackground,
        [styles.itemTouchableCollapsed]: isLabelCollapsed,
    });

    const rowContent = (
        <>
            {assetElement}
            {labelNode}
            {rightSlot && (
                <span
                    className={classnames(styles.itemRightSlot, {
                        [styles.itemRightSlotCollapsed]: isLabelCollapsed,
                    })}
                >
                    {rightSlot}
                </span>
            )}
            {hasChildren && (
                <span
                    className={classnames(styles.itemChevron, styles.itemChevronVariant[variant], {
                        [styles.itemChevronRotated]: isOpen,
                        [styles.itemChevronCollapsed]: isLabelCollapsed,
                    })}
                    aria-hidden="true"
                >
                    <ChevronIcon size={16} color="currentColor" />
                </span>
            )}
        </>
    );

    const ariaCurrent = selected ? ('page' as const) : undefined;

    const handleTogglePanel = () => {
        setPanelOpenForItemId(isPanelOpen ? null : id);
    };

    const interactiveRow = (() => {
        if (hasChildren) {
            const handlePress = () => {
                if (shouldShowPanelMode) {
                    handleTogglePanel();
                } else {
                    setOpen((prev) => !prev);
                }
            };

            return (
                <Touchable
                    className={touchableClassName}
                    onPress={handlePress}
                    aria-expanded={shouldShowPanelMode ? isPanelOpen : isOpen}
                    aria-controls={isPanelOpen && isDialogMode ? dialogPanelId : undefined}
                    aria-label={label}
                    dataAttributes={{'parent-item': 'true'}}
                >
                    {rowContent}
                </Touchable>
            );
        }

        if (navigationProps) {
            return (
                <Touchable
                    {...navigationProps}
                    className={touchableClassName}
                    aria-current={ariaCurrent}
                    aria-label={collapsed ? label : undefined}
                >
                    {rowContent}
                </Touchable>
            );
        }

        return (
            <div className={touchableClassName} aria-current={ariaCurrent}>
                {rowContent}
            </div>
        );
    })();

    // The collapsed rail shows only the icon of an item, so a tooltip gives its label. The dialog panel
    // floats over the rail, and a tooltip would overlap it, so the rail drops its tooltips while that
    // panel is open. The second column, instead, sits beside the rail, so the rail keeps its tooltips. Only
    // the item that owns the column drops its own, because the column already shows its label as a title.
    // The tooltip follows the settled collapsed state, and not the one of this render: its wrapper replaces
    // the row in the DOM, and a replaced row would drop the movement of the rail (see `collapsedSettled`).
    const showTooltip =
        collapsedSettled && !isInsidePanel && (doublePanel ? !isPanelOpen : !panelOpenForItemId);

    const itemDataAttributes: DataAttributes = {testid: 'SidenavItem', ...dataAttributes};
    if (id) {
        itemDataAttributes['sidenav-item-id'] = id;
    }

    // The labels fade out one after the other, from the first item of the body to the last one. The delay
    // stops growing at the last value of the spec, so that a long list ends its fade with the rail.
    const labelDelay = Math.min(LABEL_DELAY_BASE_MS + itemIndex * LABEL_DELAY_STEP_MS, LABEL_DELAY_MAX_MS);

    const row = (
        <div
            className={styles.itemRow}
            style={applyCssVars({
                [styles.itemIndentVar]: `${level * NESTING_INDENT}px`,
                [styles.itemLabelDelayVar]: `${labelDelay}ms`,
            })}
            {...getPrefixedDataAttributes(itemDataAttributes)}
        >
            {showAccent && (
                <div
                    className={classnames(styles.itemAccent, styles.itemAccentVariant[variant], {
                        [styles.itemAccentCollapsed]: isLabelCollapsed,
                    })}
                />
            )}
            {showTooltip ? (
                <Tooltip
                    position="right"
                    description={label}
                    target={interactiveRow}
                    // The wrapper of the tooltip becomes the box that the row measures itself against, so
                    // it has to take the width of the rail. Without `minWidth`, a flex item never shrinks
                    // below the content that it holds, and the row and its wrapper would then widen each
                    // other past the rail.
                    targetStyle={{flex: 1, minWidth: 0}}
                />
            ) : (
                interactiveRow
            )}
        </div>
    );

    // The row of an item and the group of its children live in the same list item, so that a screen
    // reader ties them together: the trigger opens what the list item holds. A stand-alone entry of the
    // first level already sits in a list item of the body list, and this one steps aside there.
    return (
        <div role={hasOuterListItem ? undefined : 'listitem'}>
            {/* Every item below this one owns its list item: the flag applies to this item alone. */}
            <SidenavHasOuterListItemContext.Provider value={false}>
                {row}
                {hasChildren && (
                    <CSSTransition
                        in={isOpen}
                        timeout={isMotionOff ? 0 : CONTENT_DURATION_MS}
                        nodeRef={nestedListRef}
                        classNames={styles.nestedListTransitionClasses}
                        mountOnEnter
                        unmountOnExit
                    >
                        <div
                            className={styles.nestedListContainer}
                            ref={nestedListRef}
                            // Marks this group with the id of its parent, so ArrowLeft on a child moves
                            // the focus back to the trigger that owns the group.
                            data-sidenav-nested-list-for={id}
                        >
                            <div className={styles.nestedList} role="group" aria-label={label}>
                                <div className={styles.nestedListRows} role="list">
                                    <SidenavLevelContext.Provider value={level + 1}>
                                        {children}
                                    </SidenavLevelContext.Provider>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                )}
                {isPanelOpen && isDialogMode && (
                    <SidenavDialogPanel
                        id={dialogPanelId}
                        itemId={id}
                        label={label}
                        containerRef={containerRef}
                    >
                        {children}
                    </SidenavDialogPanel>
                )}
            </SidenavHasOuterListItemContext.Provider>
        </div>
    );
};

export {SidenavItem};
export type {SidenavItemProps};
