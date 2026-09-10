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
import {SidenavDialogPanel} from './sidenav-bar-sub-menu';
import {useIsReducedMotion, useRestWidth} from './sidenav-bar-motion';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import {isRunningAcceptanceTest} from './utils/platform';
import {useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';
import Touchable from './touchable';
import Tooltip from './tooltip';
import {Text2} from './text';
import IconChevron from './icons/icon-chevron';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps} from './utils/types';

type SidenavItemBaseProps = {
    /** Display text. A text longer than the row wraps over several lines, and it never truncates. */
    label: string;
    /**
     * Icon component or element to display. A first-level item must carry one, because the collapsed rail
     * shows nothing else of it. The level is only known at runtime, so a missing asset is reported in the
     * console. `SidenavEntry` enforces it in the type.
     */
    asset?: ((props: IconProps) => JSX.Element) | React.ReactElement;
    /** Show asset when expanded (not collapsed). Only a first-level item reads it. @default true */
    showAssetWhenExpanded?: boolean;
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
 * Props `href`, `onPress`, `to`, and `children` are mutually exclusive: use exactly one of them.
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
        showAssetWhenExpanded = true,
    } = props as any;
    const {
        collapsed,
        collapsedSettled,
        doublePanel,
        subMenuOpenForItemId,
        setSubMenuOpenForItemId,
        selectItemAndCloseSubMenu,
        containerRef,
        isInsideSubMenu,
        selectedItemId,
    } = useSidenavBarContext();
    const level = React.useContext(SidenavLevelContext);
    const itemIndex = React.useContext(SidenavItemIndexContext);
    const hasOuterListItem = React.useContext(SidenavHasOuterListItemContext);
    const {platformOverrides} = useTheme();
    const isReducedMotion = useIsReducedMotion();
    const isMotionOff = isRunningAcceptanceTest(platformOverrides) || isReducedMotion;
    // Read from context, not from `SidenavBar`: the floating panel restores the default variant.
    const variant = useThemeVariant();

    const isItemSelected = id !== undefined && selectedItemId === id;
    const hasDescendantSelected = hasDescendantWithId(children, selectedItemId);
    const selected = isItemSelected || hasDescendantSelected;

    const hasChildren = React.Children.count(children) > 0;
    const isSubMenuOpen = hasChildren && subMenuOpenForItemId === id;
    // The accent belongs to the selected item only, never to a parent of it.
    const showAccent = isItemSelected;

    const [open, setOpen] = React.useState(Boolean(defaultOpen));
    const nestedListRef = React.useRef<HTMLDivElement>(null);
    // The dialog panel renders in a portal, so the trigger points at it with `aria-controls`.
    const dialogPanelId = React.useId();
    const labelId = React.useId();
    const isSubMenuMode = hasChildren && (collapsed || doublePanel);
    const isOpen = hasChildren && !collapsed && !isSubMenuMode && open;
    // In double panel mode the bar renders the sub menu as its second column; the dialog panel renders here.
    const isDialogMode = isSubMenuMode && !doublePanel;

    const isSubMenuOpenForAnotherItem = Boolean(subMenuOpenForItemId && subMenuOpenForItemId !== id);

    // Never two highlighted rows: a closed parent flags a hidden selected descendant, an open parent
    // leaves the background to the selected child, and an open sub menu takes it from every other parent.
    const showBackground =
        isItemSelected || isSubMenuOpen || (hasDescendantSelected && !isOpen && !isSubMenuOpenForAnotherItem);

    // Keyed on the descendant id, not on a boolean, so that a selection change between two siblings
    // reopens a parent the user closed. It only opens, never closes.
    const selectedDescendantId = hasDescendantSelected ? selectedItemId : null;
    React.useEffect(() => {
        if (selectedDescendantId !== null) {
            setOpen(true);
        }
    }, [selectedDescendantId]);

    const wrapNavCallback = (callback?: () => void | Promise<void>): (() => Promise<void>) => {
        return async () => {
            selectItemAndCloseSubMenu(id ?? null);
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

    // The sub menu resets the level to 0 for the indentation, so `level` alone does not tell the first level.
    const isFirstLevel = level === 0 && !isInsideSubMenu;
    const hasAsset = !!asset;
    React.useEffect(() => {
        if (process.env.NODE_ENV !== 'production' && isFirstLevel && !hasAsset) {
            console.error(
                `SidenavItem "${label}" is a first-level item without an asset, so the collapsed sidenav shows nothing of it. ` +
                    `Pass an asset, and hide it with showAssetWhenExpanded if you do not want it next to the label.`
            );
        }
    }, [isFirstLevel, hasAsset, label]);
    // The collapsed rail never shows a nested item, so `showAssetWhenExpanded` has no meaning there.
    const shouldShowAsset = asset && (collapsed || showAssetWhenExpanded || !isFirstLevel);
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

    // The collapsed label stays in the DOM: a screen reader still reads it, and the fade needs it.
    const isLabelCollapsed = collapsed && !isInsideSubMenu;
    // The label keeps the width of its text while the bar moves in either direction, and wraps only at
    // rest expanded. See `itemLabelKeepsWidth`.
    const isLabelWidthKept = !isInsideSubMenu && (collapsed || collapsedSettled);
    const {ref: labelRef, frozenWidth: labelWidth} = useRestWidth(isLabelWidthKept);
    const labelNode = (
        <div
            ref={labelRef}
            id={labelId}
            className={classnames(styles.itemLabel, {
                [styles.itemLabelCollapsed]: isLabelCollapsed,
                [styles.itemLabelFrozenWidth]: labelWidth !== undefined,
                [styles.itemLabelKeepsWidth]: isLabelWidthKept && labelWidth === undefined,
            })}
            style={labelWidth !== undefined ? {width: labelWidth} : undefined}
        >
            <div className={styles.itemLabelContent}>
                <Text2 regular color="inherit">
                    {label}
                </Text2>
            </div>
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
                    <IconChevron size={16} color="currentColor" direction={doublePanel ? 'right' : 'down'} />
                </span>
            )}
        </>
    );

    const ariaCurrent = selected ? ('page' as const) : undefined;

    const handleToggleSubMenu = () => {
        setSubMenuOpenForItemId(isSubMenuOpen ? null : id);
    };

    const interactiveRow = (() => {
        if (hasChildren) {
            const handlePress = () => {
                if (isSubMenuMode) {
                    handleToggleSubMenu();
                } else {
                    setOpen((prev) => !prev);
                }
            };

            return (
                <Touchable
                    className={touchableClassName}
                    onPress={handlePress}
                    aria-expanded={isSubMenuMode ? isSubMenuOpen : isOpen}
                    aria-controls={isSubMenuOpen && isDialogMode ? dialogPanelId : undefined}
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

    // The rail drops every tooltip while the dialog panel floats over it. Beside a second column only the
    // owner item drops its own, because the column shows its label as a title. `collapsedSettled` and not
    // `collapsed`: the tooltip wrapper replaces the row node, and a replaced row drops its transition.
    const showTooltip =
        collapsedSettled && !isInsideSubMenu && (doublePanel ? !isSubMenuOpen : !subMenuOpenForItemId);

    const itemDataAttributes: DataAttributes = {testid: 'SidenavItem', ...dataAttributes};
    if (id) {
        itemDataAttributes['sidenav-item-id'] = id;
    }

    // The delay stops growing at the spec maximum, so that a long list ends its fade with the rail.
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
                <div className={classnames(styles.itemAccent, styles.itemAccentVariant[variant])} />
            )}
            {showTooltip ? (
                <Tooltip
                    position="right"
                    description={label}
                    target={interactiveRow}
                    // Without `minWidth: 0` the wrapper never shrinks below its content, past the rail.
                    targetStyle={{flex: 1, minWidth: 0}}
                />
            ) : (
                interactiveRow
            )}
        </div>
    );

    // The row and its nested list share one list item. A stand-alone first-level entry already sits in
    // a list item of the body list, so this one steps aside there.
    return (
        <div role={hasOuterListItem ? undefined : 'listitem'}>
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
                            // ArrowLeft on a child reads it to move the focus back to the trigger.
                            data-sidenav-nested-list-for={id}
                        >
                            <div className={styles.nestedList}>
                                <div className={styles.nestedListRows} role="list" aria-labelledby={labelId}>
                                    <SidenavLevelContext.Provider value={level + 1}>
                                        {children}
                                    </SidenavLevelContext.Provider>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                )}
                {isSubMenuOpen && isDialogMode && (
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
