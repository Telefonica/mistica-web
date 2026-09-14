'use client';
import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import * as styles from './sidenav-bar.css';
import {CONTENT_DURATION_MS} from './sidenav-bar.css';
import {useSidenavBarContext} from './sidenav-bar-context';
import {SidenavDialogPanel} from './sidenav-bar-panel';
import {SidenavRow, useSidenavNavigation} from './sidenav-bar-row';
import {useIsReducedMotion} from './sidenav-bar-motion';
import {isRunningAcceptanceTest} from './utils/platform';
import {useTheme} from './hooks';

import type {DataAttributes} from './utils/types';
import type {SidenavAsset} from './sidenav-bar-types';

type SidenavFirstLevelItemProps = {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Display text. A text longer than the row wraps over several lines, and it never truncates. */
    label: string;
    /** Icon component or element. The collapsed rail shows nothing else of a first-level item. */
    asset: SidenavAsset;
    /** Show asset when expanded (not collapsed). @default true */
    showAssetWhenExpanded?: boolean;
    /** Custom content on the right side (e.g., Badge). */
    rightSlot?: React.ReactNode;
    /**
     * True when the item sits directly in the body list, which already gave it a list item. A stand-alone
     * entry carries that list item on a wrapper of its own, so this item renders none.
     */
    standalone?: boolean;
    /** Rendered `SidenavNestedItem` elements. An item with children cannot navigate. */
    children?: React.ReactNode;
    /** Ids of the children, which tell the item whether the current selection hides inside it. */
    childIds?: ReadonlyArray<string>;
    /** Initial open state of the children. @default false */
    defaultOpen?: boolean;
    onPress?: () => void;
    href?: string;
    to?: string;
    /** Open link in new tab. @default false */
    newTab?: boolean;
    /** Called after navigation. */
    onNavigate?: () => void | Promise<void>;
    dataAttributes?: DataAttributes;
};

/**
 * A first-level item. It either navigates, or it owns the second-level items and only opens and closes
 * them. It opens them in place when the rail is expanded, in a floating panel when the rail is collapsed,
 * and in the second column in double panel mode.
 */
const SidenavFirstLevelItem = ({
    id,
    label,
    asset,
    showAssetWhenExpanded = true,
    rightSlot,
    standalone = false,
    children,
    childIds,
    defaultOpen,
    dataAttributes,
    ...navigationProps
}: SidenavFirstLevelItemProps): JSX.Element => {
    const {collapsed, doublePanel, panelOpenForItemId, setPanelOpenForItemId, containerRef, selectedItemId} =
        useSidenavBarContext();
    const {platformOverrides} = useTheme();
    const isReducedMotion = useIsReducedMotion();
    const isMotionOff = isRunningAcceptanceTest(platformOverrides) || isReducedMotion;
    const navigation = useSidenavNavigation(id, navigationProps);

    const hasChildren = React.Children.count(children) > 0;
    const isItemSelected = selectedItemId === id;
    const hasDescendantSelected = !!selectedItemId && !!childIds?.includes(selectedItemId);

    const [open, setOpen] = React.useState(Boolean(defaultOpen));
    // The dialog panel renders in a portal, so the trigger points at it with `aria-controls`.
    const dialogPanelId = React.useId();
    const labelId = React.useId();
    const nestedListRef = React.useRef<HTMLDivElement>(null);

    const isPanelOpen = hasChildren && panelOpenForItemId === id;
    const isPanelMode = hasChildren && (collapsed || doublePanel);
    const isOpen = hasChildren && !collapsed && !isPanelMode && open;
    // In double panel mode the bar renders the panel as its second column; the dialog panel renders here.
    const isDialogMode = isPanelMode && !doublePanel;
    const isPanelOpenForAnotherItem = Boolean(panelOpenForItemId && panelOpenForItemId !== id);

    // Never two highlighted rows: a closed parent flags a hidden selected descendant, an open parent
    // leaves the background to the selected child, and an open panel takes it from every other parent.
    const showBackground =
        isItemSelected || isPanelOpen || (hasDescendantSelected && !isOpen && !isPanelOpenForAnotherItem);

    // Keyed on the descendant id, not on a boolean, so that a selection change between two siblings
    // reopens a parent the user closed. It only opens, never closes.
    const selectedDescendantId = hasDescendantSelected ? selectedItemId : null;
    React.useEffect(() => {
        if (selectedDescendantId !== null) {
            setOpen(true);
        }
    }, [selectedDescendantId]);

    React.useEffect(() => {
        if (process.env.NODE_ENV !== 'production' && !asset) {
            console.error(
                `SidenavBar item "${label}" is a first-level item without an asset, so the collapsed sidenav shows nothing of it. ` +
                    `Pass an asset, and hide it with showAssetWhenExpanded if you do not want it next to the label.`
            );
        }
    }, [asset, label]);

    const handlePress = () => {
        if (isPanelMode) {
            setPanelOpenForItemId(isPanelOpen ? null : id);
        } else {
            setOpen((prev) => !prev);
        }
    };

    const row = (
        <SidenavRow
            id={id}
            label={label}
            asset={asset}
            // The collapsed rail shows the asset alone, so it keeps it whatever the prop says.
            showAsset={collapsed || showAssetWhenExpanded}
            rightSlot={rightSlot}
            indent={0}
            labelId={labelId}
            showBackground={showBackground}
            // The accent belongs to the selected item only, never to a parent of it.
            showAccent={isItemSelected}
            current={isItemSelected || hasDescendantSelected}
            chevron={hasChildren ? {rotated: isOpen} : undefined}
            navigation={hasChildren ? undefined : navigation}
            toggle={
                hasChildren
                    ? {
                          onPress: handlePress,
                          expanded: isPanelMode ? isPanelOpen : isOpen,
                          controls: isPanelOpen && isDialogMode ? dialogPanelId : undefined,
                      }
                    : undefined
            }
            dataAttributes={dataAttributes}
        />
    );

    // The row and its nested list share one list item. A stand-alone first-level entry already sits in
    // a list item of the body list, so this one steps aside there.
    return (
        <div role={standalone ? undefined : 'listitem'}>
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
                                {children}
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            )}
            {isPanelOpen && isDialogMode && (
                <SidenavDialogPanel id={dialogPanelId} itemId={id} label={label} containerRef={containerRef}>
                    {children}
                </SidenavDialogPanel>
            )}
        </div>
    );
};

export {SidenavFirstLevelItem};
export type {SidenavFirstLevelItemProps};
