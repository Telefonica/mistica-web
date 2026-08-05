'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {NESTING_INDENT} from './sidenav-bar.css';
import {
    useSidenavBarContext,
    SidenavLevelContext,
    generateItemId,
    assertChildrenAre,
    hasDescendantWithId,
} from './sidenav-bar';
import {getPrefixedDataAttributes} from '../utils/dom';
import {applyCssVars} from '../utils/css';
import Touchable from '../touchable';
import Tooltip from '../tooltip';
import ScreenReaderOnly from '../screen-reader-only';
import {Text2} from '../text';
import IconChevronDownRegular from '../generated/mistica-icons/icon-chevron-down-regular';
import IconChevronRightRegular from '../generated/mistica-icons/icon-chevron-right-regular';
import {SidenavPanel} from './sidenav-panel';

import type {ExclusifyUnion} from '../utils/utility-types';
import type {DataAttributes, IconProps} from '../utils/types';

type SidenavItemBaseProps = {
    label: string;
    asset?: ((props: IconProps) => JSX.Element) | React.ReactElement;
    showIconWhenExpanded?: boolean;
    rightSlot?: React.ReactNode;
    children?: React.ReactNode;
    defaultOpen?: boolean;
    dataAttributes?: DataAttributes;
};

type SidenavItemOnPressProps = SidenavItemBaseProps & {
    id: string;
    onPress: () => void;
    href?: undefined;
    to?: undefined;
};

type SidenavItemHrefProps = SidenavItemBaseProps & {
    id: string;
    href: string;
    newTab?: boolean;
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    to?: undefined;
};

type SidenavItemToProps = SidenavItemBaseProps & {
    id: string;
    to: string;
    newTab?: boolean;
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    href?: undefined;
};

type SidenavItemExpandOnlyProps = SidenavItemBaseProps & {
    onPress?: undefined;
    href?: undefined;
    to?: undefined;
};

type SidenavItemProps = ExclusifyUnion<
    SidenavItemOnPressProps | SidenavItemHrefProps | SidenavItemToProps | SidenavItemExpandOnlyProps
>;

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
    } = props;
    const {
        collapsed,
        doublePanel,
        panelOpenForItemId,
        setPanelOpenForItemId,
        containerRef,
        isInsidePanel,
        selectedItemId,
        onSelectedItemIdChange,
    } = useSidenavBarContext();
    const level = React.useContext(SidenavLevelContext);

    const selected =
        (id !== undefined && selectedItemId === id) ||
        (collapsed && hasDescendantWithId(children, selectedItemId));

    const hasChildren = React.Children.count(children) > 0;
    const navigates = props.onPress !== undefined || props.href !== undefined || props.to !== undefined;

    const itemIdRef = React.useRef<string | null>(null);
    if (itemIdRef.current === null && hasChildren) {
        itemIdRef.current = generateItemId();
    }
    const itemId = itemIdRef.current;
    const isPanelOpen = itemId !== null && panelOpenForItemId === itemId;

    if (process.env.NODE_ENV !== 'production') {
        if (level > 1) {
            throw new Error(
                `SidenavItem nesting limit exceeded: "${label}" is at level ${level}. ` +
                    `SidenavItem only supports 2 levels of nesting (level 0 and level 1). ` +
                    `Items at level 1 cannot have children.`
            );
        }

        if (level === 1 && hasChildren) {
            throw new Error(
                `SidenavItem "${label}" at level 1 (nested item) cannot have children. ` +
                    `SidenavItem supports maximum 2 levels of nesting. ` +
                    `Only level 0 items can have children.`
            );
        }

        assertChildrenAre(children, SidenavItem, 'SidenavItem children must be SidenavItem elements');
        if (level === 0 && !asset) {
            console.error(
                `SidenavItem "${label}" at top level needs an asset to be usable in a collapsed sidenav`
            );
        }
    }

    const [open, setOpen] = React.useState(Boolean(defaultOpen));
    const shouldShowPanelMode = hasChildren && (collapsed || doublePanel);
    const isOpen = hasChildren && !collapsed && !shouldShowPanelMode && open;

    const wrapNavCallback = (callback?: () => void | Promise<void>): (() => Promise<void>) => {
        return async () => {
            if (id && onSelectedItemIdChange) {
                onSelectedItemIdChange(id);
            }
            await callback?.();
            if (isInsidePanel) {
                setPanelOpenForItemId(null);
            }
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
        assetContent = (asset as (props: IconProps) => JSX.Element)({
            size: 20,
            color: 'currentColor',
        });
    } else if (asset) {
        assetContent = asset;
    }
    const assetElement =
        shouldShowAsset && assetContent ? <span className={styles.itemAsset}>{assetContent}</span> : null;

    const labelNode =
        collapsed && !isInsidePanel ? (
            <ScreenReaderOnly>
                <span>{label}</span>
            </ScreenReaderOnly>
        ) : (
            <div className={styles.itemLabel}>
                <Text2 regular truncate>
                    {label}
                </Text2>
            </div>
        );

    const touchableClassName = classnames(
        styles.itemTouchable,
        styles.itemTouchableSelected[selected || isPanelOpen ? 'true' : 'false'],
        {[styles.itemTouchableCollapsed]: collapsed}
    );

    const rowContent = (
        <>
            {assetElement}
            {labelNode}
            {!collapsed && rightSlot && <span className={styles.itemRightSlot}>{rightSlot}</span>}
            {!collapsed && hasChildren && !navigates && (
                <span className={styles.itemChevron} aria-hidden="true">
                    <ChevronIcon size={16} color="currentColor" />
                </span>
            )}
        </>
    );

    const ariaCurrent = selected ? ('page' as const) : undefined;

    const handleTogglePanel = () => {
        if (itemId === null) return;
        setPanelOpenForItemId(isPanelOpen ? null : itemId);
    };

    const interactiveRow = (() => {
        if (hasChildren && !navigates) {
            return (
                <Touchable
                    className={touchableClassName}
                    onPress={() => {
                        if (shouldShowPanelMode) {
                            handleTogglePanel();
                        } else {
                            setOpen((prev) => !prev);
                        }
                    }}
                    aria-expanded={collapsed ? undefined : isOpen}
                    aria-label={label}
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

    const itemDataAttributes: DataAttributes = {testid: 'SidenavItem', ...dataAttributes};
    if (itemId) {
        itemDataAttributes['sidenav-item-id'] = itemId;
    }

    const row = (
        <div
            className={styles.itemRow}
            style={applyCssVars({[styles.itemIndentVar]: `${level * NESTING_INDENT}px`})}
            {...getPrefixedDataAttributes(itemDataAttributes)}
        >
            {selected ? (
                <span className={styles.selectedIndicator} />
            ) : (
                <span className={styles.selectedIndicatorPlaceholder} />
            )}
            {collapsed && !isInsidePanel ? (
                <Tooltip
                    position="right"
                    description={label}
                    target={interactiveRow}
                    targetStyle={{flex: 1}}
                />
            ) : (
                interactiveRow
            )}
            {hasChildren && navigates && (
                <Touchable
                    className={styles.itemChevron}
                    onPress={() => {
                        if (shouldShowPanelMode) {
                            handleTogglePanel();
                        } else {
                            setOpen((prev) => !prev);
                        }
                    }}
                    aria-expanded={shouldShowPanelMode ? isPanelOpen : isOpen}
                    aria-label={`${shouldShowPanelMode ? (isPanelOpen ? 'Close' : 'Open') : isOpen ? 'Collapse' : 'Expand'} ${label}`}
                >
                    <ChevronIcon size={16} color="currentColor" />
                </Touchable>
            )}
        </div>
    );

    return (
        <>
            {row}
            {isOpen && (
                <div className={styles.nestedList} role="group" aria-label={label}>
                    <SidenavLevelContext.Provider value={level + 1}>{children}</SidenavLevelContext.Provider>
                </div>
            )}
            {isPanelOpen && itemId && (
                <SidenavPanel itemId={itemId} label={label} containerRef={containerRef} level={level}>
                    {children}
                </SidenavPanel>
            )}
        </>
    );
};

export {SidenavItem};
export type {SidenavItemProps};
