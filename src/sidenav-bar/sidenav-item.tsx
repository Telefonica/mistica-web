'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {NESTING_INDENT} from './sidenav-bar.css';
import {
    useSidenavBarContext,
    SidenavLevelContext,
    assertChildrenAre,
    hasDescendantWithId,
} from './sidenav-bar';
import {SidenavDialogPanel} from './sidenav-panel';
import {getPrefixedDataAttributes} from '../utils/dom';
import {applyCssVars} from '../utils/css';
import Touchable from '../touchable';
import Tooltip from '../tooltip';
import ScreenReaderOnly from '../screen-reader-only';
import {Text2} from '../text';
import IconChevronDownRegular from '../generated/mistica-icons/icon-chevron-down-regular';
import IconChevronRightRegular from '../generated/mistica-icons/icon-chevron-right-regular';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type {SidenavItem} from './sidenav-types';
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
    /** Original children data (for mobile navigation extraction). Internal use only. */
    childrenData?: ReadonlyArray<SidenavItem>;
};

/**
 * SidenavItem with nested children.
 * Mutually exclusive with `href`, `onPress`, and `to`.
 */
type SidenavItemWithChildrenProps = SidenavItemBaseProps & {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Nested SidenavItem elements (max 2 nesting levels). Mutually exclusive with `href`, `onPress`, and `to`. */
    children: React.ReactNode;
    onPress?: undefined;
    href?: undefined;
    to?: undefined;
};

/**
 * SidenavItem with custom click handler.
 * Mutually exclusive with `href`, `to`, and `children`.
 */
type SidenavItemOnPressProps = SidenavItemBaseProps & {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Click handler for custom actions. Mutually exclusive with `href`, `to`, and `children`. */
    onPress: () => void;
    href?: undefined;
    to?: undefined;
    children?: undefined;
};

/**
 * SidenavItem with href navigation.
 * Mutually exclusive with `onPress`, `to`, and `children`.
 */
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

/**
 * SidenavItem with router link navigation.
 * Mutually exclusive with `onPress`, `href`, and `children`.
 */
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
        childrenData,
    } = props as any;
    const {
        collapsed,
        doublePanel,
        panelOpenForItemId,
        setPanelOpenForItemId,
        containerRef,
        isInsidePanel,
        selectedItemId,
        onSelectedItemIdChange,
        isMobileMode,
        closeMobileMenu,
        pushMobileNavLevel,
    } = useSidenavBarContext();
    const level = React.useContext(SidenavLevelContext);

    const isItemSelected = id !== undefined && selectedItemId === id;
    const hasDescendantSelected = hasDescendantWithId(children, selectedItemId);
    const selected = isItemSelected || hasDescendantSelected;

    const hasChildren = React.Children.count(children) > 0;
    const isPanelOpen = hasChildren && panelOpenForItemId === id;
    // The left accent bar marks the directly-selected item only. A parent whose panel is open shows the
    // selected background, but never the accent: the accent belongs to the selected child.
    const showAccent = isItemSelected;

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
        // A panel item renders at level 0 to keep it on the same rail as a section item, but it never
        // appears in the collapsed rail, so it does not need an asset.
        if (level === 0 && !asset && !isInsidePanel) {
            console.warn(
                `SidenavItem "${label}" at top level may not be visible when sidenav is collapsed (asset icon recommended)`
            );
        }
    }

    const [open, setOpen] = React.useState(Boolean(defaultOpen));
    const shouldShowPanelMode = hasChildren && (collapsed || doublePanel);
    const isOpen = hasChildren && !collapsed && !shouldShowPanelMode && open;
    // In double panel mode the sidenav renders the panel as its second column, so the item only tracks
    // the open state. The dialog panel, instead, is anchored to this item and rendered here.
    const isDialogMode = shouldShowPanelMode && !doublePanel;

    // The selected background also marks a parent whose descendant is selected, but only while that
    // parent is closed (accordion collapsed, or in collapsed/panel mode) so it flags the hidden
    // selection. Once the accordion is open the selected child renders its own background, so the
    // parent drops it to avoid two stacked highlights.
    const showBackground = isItemSelected || isPanelOpen || (hasDescendantSelected && !isOpen);

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
            if (id && onSelectedItemIdChange) {
                onSelectedItemIdChange(id);
            }
            await callback?.();
            // Any navigation closes the open panel: a press on one of its children, and also a press on
            // a first-level item that navigates instead of revealing children.
            setPanelOpenForItemId(null);
            if (isMobileMode && !hasChildren && closeMobileMenu) {
                closeMobileMenu();
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

    const ChevronIcon = isMobileMode || doublePanel ? IconChevronRightRegular : IconChevronDownRegular;

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
        styles.itemTouchableSelected[showBackground ? 'true' : 'false'],
        {
            [styles.itemTouchableCollapsed]: collapsed && !isInsidePanel,
            [styles.itemTouchableMobile]: isMobileMode,
        }
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
        setPanelOpenForItemId(isPanelOpen ? null : id);
    };

    const interactiveRow = (() => {
        if (hasChildren) {
            const handlePress = () => {
                // Mobile: Always navigate to children with stacked navigation (exit early)
                if (isMobileMode) {
                    if (pushMobileNavLevel && childrenData && id && label) {
                        pushMobileNavLevel({
                            id,
                            label,
                            items: childrenData,
                        });
                    }
                    return; // CRITICAL: Exit to prevent desktop behavior
                }

                // Desktop: Use dialog or double panel mode
                if (shouldShowPanelMode) {
                    handleTogglePanel();
                }
                // Desktop: Inline expansion
                else {
                    setOpen((prev) => !prev);
                }
            };

            return (
                <Touchable
                    className={touchableClassName}
                    onPress={handlePress}
                    aria-expanded={!isMobileMode && (shouldShowPanelMode ? isPanelOpen : isOpen)}
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

    const itemDataAttributes: DataAttributes = {testid: 'SidenavItem', ...dataAttributes};
    if (id) {
        itemDataAttributes['sidenav-item-id'] = id;
    }

    const row = (
        <div
            className={styles.itemRow}
            style={applyCssVars({[styles.itemIndentVar]: `${level * NESTING_INDENT}px`})}
            {...getPrefixedDataAttributes(itemDataAttributes)}
        >
            {showAccent && <div className={styles.itemAccent} />}
            {collapsed && !isInsidePanel && !panelOpenForItemId ? (
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
            {isOpen && !isMobileMode && (
                <div className={styles.nestedList} role="group" aria-label={label}>
                    <SidenavLevelContext.Provider value={level + 1}>{children}</SidenavLevelContext.Provider>
                </div>
            )}
            {isPanelOpen && isDialogMode && (
                <SidenavDialogPanel itemId={id} label={label} containerRef={containerRef}>
                    {children}
                </SidenavDialogPanel>
            )}
        </>
    );
};

export {SidenavItem};
export type {SidenavItemProps};
