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
    /** Display text (truncated if too long). */
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
    /** Nested SidenavItem elements (max 2 nesting levels). */
    children: React.ReactNode;
    onPress?: undefined;
    href?: undefined;
    to?: undefined;
};

type SidenavItemOnPressProps = SidenavItemBaseProps & {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Click handler for custom actions. */
    onPress: () => void;
    href?: undefined;
    to?: undefined;
    children?: undefined;
};

type SidenavItemHrefProps = SidenavItemBaseProps & {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Navigation URL for href link. */
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
    /** Router link target. */
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

    const isItemSelected = id !== undefined && selectedItemId === id;
    const hasDescendantSelected = collapsed && hasDescendantWithId(children, selectedItemId);
    const selected = isItemSelected || hasDescendantSelected;

    const hasChildren = React.Children.count(children) > 0;
    const itemIdRef = React.useRef<string | null>(null);
    if (itemIdRef.current === null && hasChildren) {
        itemIdRef.current = generateItemId();
    }
    const itemId = itemIdRef.current;
    const isPanelOpen = itemId !== null && panelOpenForItemId === itemId;
    const showAccent = isItemSelected || isPanelOpen;

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
                <Text2 regular truncate color={selected ? 'textPrimary' : undefined}>
                    {label}
                </Text2>
            </div>
        );

    const touchableClassName = classnames(
        styles.itemTouchable,
        styles.itemTouchableSelected[showAccent ? 'true' : 'false'],
        {[styles.itemTouchableCollapsed]: collapsed && !isInsidePanel}
    );

    const rowContent = (
        <>
            {assetElement}
            {labelNode}
            {!collapsed && rightSlot && <span className={styles.itemRightSlot}>{rightSlot}</span>}
            {!collapsed && hasChildren && (
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
            {showAccent && <div className={styles.itemAccent} />}
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
