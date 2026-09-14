'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {useSidenavBarContext} from './sidenav-bar-context';
import {useRestWidth} from './sidenav-bar-motion';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import {useThemeVariant} from './theme-variant-context';
import Touchable from './touchable';
import Tooltip from './tooltip';
import {Text2} from './text';
import IconChevron from './icons/icon-chevron';

import type {DataAttributes} from './utils/types';
import type {SidenavAsset} from './sidenav-bar-types';

/** Props that make the row navigate. The item builds them with `useSidenavNavigation`. */
type SidenavRowNavigationProps =
    | {onPress: () => Promise<void>}
    | {href: string; newTab?: boolean; onNavigate: () => Promise<void>}
    | {to: string; newTab?: boolean; onNavigate: () => Promise<void>};

/** Props that make the row open and close its children instead of navigating. */
type SidenavRowToggleProps = {
    onPress: () => void;
    expanded: boolean;
    /** Id of the dialog panel that the row opens, when it opens one. */
    controls?: string;
};

type SidenavRowProps = {
    /** Id of the item, written to the DOM so the keyboard code and the tests find the row. */
    id?: string;
    label: string;
    asset?: SidenavAsset;
    /** Hide the asset without removing it from the data. The collapsed rail always shows it. */
    showAsset?: boolean;
    rightSlot?: React.ReactNode;
    /** Indent of the row in pixels. The first level takes 0, and a nested row takes one step. */
    indent: number;
    /** Paint the selected background. A parent takes it for a hidden selected descendant. */
    showBackground?: boolean;
    /** Paint the accent bar. Only the selected item itself takes it, never a parent of it. */
    showAccent?: boolean;
    /** Id written on the label, so a nested list can take its name from it. */
    labelId?: string;
    /** Render the chevron of a parent item, rotated when its children are open. */
    chevron?: {rotated: boolean};
    /** Present when the row navigates. Mutually exclusive with `toggle`. */
    navigation?: SidenavRowNavigationProps;
    /** Present when the row opens and closes its children. Mutually exclusive with `navigation`. */
    toggle?: SidenavRowToggleProps;
    /** True when the row is the current page, or holds it among its children. */
    current?: boolean;
    dataAttributes?: DataAttributes;
};

/**
 * The visible row of an item, at both levels: the accent, the asset, the label, the right slot, the
 * chevron, and the tooltip of the collapsed rail. It holds no state: `SidenavFirstLevelItem` and
 * `SidenavNestedItem` decide what the row shows, and this component paints it.
 */
const SidenavRow = ({
    id,
    label,
    asset,
    showAsset = true,
    rightSlot,
    indent,
    showBackground = false,
    showAccent = false,
    labelId,
    chevron,
    navigation,
    toggle,
    current = false,
    dataAttributes,
}: SidenavRowProps): JSX.Element => {
    const {collapsed, collapsedSettled, doublePanel, panelOpenForItemId, isInsidePanel} =
        useSidenavBarContext();
    // Read from context, not from `SidenavBar`: the floating panel restores the default variant.
    const variant = useThemeVariant();

    let assetContent: React.ReactNode = null;
    if (typeof asset === 'function') {
        const Asset = asset;
        assetContent = <Asset size={20} color="currentColor" />;
    } else if (asset) {
        assetContent = asset;
    }
    const assetElement =
        showAsset && assetContent ? (
            <span className={classnames(styles.itemAsset, styles.itemAssetVariant[variant])}>
                {assetContent}
            </span>
        ) : null;

    // The collapsed label stays in the DOM: a screen reader still reads it, and the fade needs it.
    const isLabelCollapsed = collapsed && !isInsidePanel;
    // The label keeps the width of its text while the bar moves in either direction, and wraps only at
    // rest expanded. See `itemLabelKeepsWidth`.
    const isLabelWidthKept = !isInsidePanel && (collapsed || collapsedSettled);
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
            {chevron && (
                <span
                    className={classnames(styles.itemChevron, styles.itemChevronVariant[variant], {
                        [styles.itemChevronRotated]: chevron.rotated,
                        [styles.itemChevronCollapsed]: isLabelCollapsed,
                    })}
                    aria-hidden="true"
                >
                    <IconChevron size={16} color="currentColor" direction={doublePanel ? 'right' : 'down'} />
                </span>
            )}
        </>
    );

    const ariaCurrent = current ? ('page' as const) : undefined;

    const interactiveRow = (() => {
        if (toggle) {
            return (
                <Touchable
                    className={touchableClassName}
                    onPress={toggle.onPress}
                    aria-expanded={toggle.expanded}
                    aria-controls={toggle.controls}
                    aria-label={label}
                    dataAttributes={{'parent-item': 'true'}}
                >
                    {rowContent}
                </Touchable>
            );
        }

        if (navigation) {
            return (
                <Touchable
                    {...navigation}
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
    const isOwnPanelOpen = !!id && panelOpenForItemId === id;
    const showTooltip =
        collapsedSettled && !isInsidePanel && (doublePanel ? !isOwnPanelOpen : !panelOpenForItemId);

    const rowDataAttributes: DataAttributes = {testid: 'SidenavItem', ...dataAttributes};
    if (id) {
        rowDataAttributes['sidenav-item-id'] = id;
    }

    return (
        <div
            className={styles.itemRow}
            style={applyCssVars({[styles.itemIndentVar]: `${indent}px`})}
            {...getPrefixedDataAttributes(rowDataAttributes)}
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
};

/**
 * Builds the props that make a row navigate. Every navigation of the sidenav reports the new selection
 * and closes the open panel in one call, so the selection does not reopen the column that the press
 * closed.
 */
const useSidenavNavigation = (
    itemId: string,
    props: {
        onPress?: () => void;
        href?: string;
        to?: string;
        newTab?: boolean;
        onNavigate?: () => void | Promise<void>;
    }
): SidenavRowNavigationProps | undefined => {
    const {selectItemAndClosePanel} = useSidenavBarContext();

    const wrapNavCallback = (callback?: () => void | Promise<void>): (() => Promise<void>) => {
        return async () => {
            selectItemAndClosePanel(itemId ?? null);
            await callback?.();
        };
    };

    if (props.onPress) {
        return {onPress: wrapNavCallback(props.onPress)};
    }
    if (props.href !== undefined) {
        return {href: props.href, newTab: props.newTab, onNavigate: wrapNavCallback(props.onNavigate)};
    }
    if (props.to !== undefined) {
        return {to: props.to, newTab: props.newTab, onNavigate: wrapNavCallback(props.onNavigate)};
    }
    return undefined;
};

export {SidenavRow, useSidenavNavigation};
export type {SidenavRowProps, SidenavRowNavigationProps, SidenavRowToggleProps};
