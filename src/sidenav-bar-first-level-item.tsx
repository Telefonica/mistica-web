'use client';
import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import * as styles from './sidenav-bar.css';
import {CONTENT_DURATION_MS} from './sidenav-bar.css';
import {useSidenavBarContext} from './sidenav-bar-context';
import {SidenavDialogPanel} from './sidenav-bar-panel';
import {SidenavRow, useSidenavNavigation} from './sidenav-bar-row';
import {renderSidenavSecondLevelItem} from './sidenav-bar-second-level-item';

import type {DataAttributes} from './utils/types';
import type {SidenavAsset, SidenavSecondLevelItem as SidenavSecondLevelItemData} from './sidenav-bar-types';

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
    /**
     * Second-level items. An item with second-level items cannot navigate: it lists them in place, in a dialog
     * panel over the collapsed rail, or in the second column, which the bar renders.
     */
    secondLevelItems?: ReadonlyArray<SidenavSecondLevelItemData>;
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
    secondLevelItems,
    defaultOpen,
    dataAttributes,
    ...navigationProps
}: SidenavFirstLevelItemProps): JSX.Element => {
    const {
        collapsed,
        collapseState,
        isMotionOff,
        doublePanel,
        panelOpenForItemId,
        setPanelOpenForItemId,
        containerRef,
        selectedItemId,
    } = useSidenavBarContext();
    const navigation = useSidenavNavigation(id, navigationProps);

    const hasChildren = !!secondLevelItems?.length;
    const isItemSelected = selectedItemId === id;
    const hasDescendantSelected =
        !!selectedItemId && !!secondLevelItems?.some((item) => item.id === selectedItemId);

    const [open, setOpen] = React.useState(Boolean(defaultOpen));
    // The dialog panel renders in a portal, so the trigger points at it with `aria-controls`.
    const dialogPanelId = React.useId();
    const labelId = React.useId();
    const accordionRef = React.useRef<HTMLDivElement>(null);

    const isPanelOpen = hasChildren && panelOpenForItemId === id;
    const isPanelMode = hasChildren && (collapsed || doublePanel);
    const isOpen = hasChildren && !collapsed && !isPanelMode && open;
    // In double panel mode the bar renders the panel as its second column; the dialog panel renders here.
    const isDialogMode = isPanelMode && !doublePanel;
    const isPanelOpenForAnotherItem = panelOpenForItemId && panelOpenForItemId !== id;

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

    // The rail drops every tooltip while the dialog panel floats over it. Beside a second column only the
    // owner item drops its own, because the column shows its label as a title. The tooltip arrives once the
    // rail rests collapsed and leaves once it rests expanded: its wrapper replaces the row node, and a
    // replaced row drops its transition.
    const isRestingCollapsed = collapseState === 'collapsed' || collapseState === 'expanding';
    const showTooltip = isRestingCollapsed && (doublePanel ? !isPanelOpen : !panelOpenForItemId);

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
            labelId={labelId}
            showBackground={showBackground}
            // The accent belongs to the selected item only, never to a parent of it.
            showAccent={isItemSelected}
            current={isItemSelected || hasDescendantSelected}
            chevron={hasChildren ? {rotated: isOpen, direction: doublePanel ? 'right' : 'down'} : undefined}
            placement="rail"
            tooltip={showTooltip}
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

    // The row and its accordion share one list item. A stand-alone first-level entry already sits in
    // a list item of the body list, so this one steps aside there.
    return (
        <div role={standalone ? undefined : 'listitem'}>
            {row}
            {hasChildren && (
                <CSSTransition
                    in={isOpen}
                    timeout={isMotionOff ? 0 : CONTENT_DURATION_MS}
                    nodeRef={accordionRef}
                    classNames={styles.accordionTransitionClasses}
                    mountOnEnter
                    unmountOnExit
                >
                    <div
                        className={styles.accordionContainer}
                        ref={accordionRef}
                        // ArrowLeft on a child reads it to move the focus back to the trigger.
                        data-sidenav-accordion-for={id}
                    >
                        <div className={styles.accordion}>
                            <div className={styles.accordionRows} role="list" aria-labelledby={labelId}>
                                {secondLevelItems?.map((item) =>
                                    renderSidenavSecondLevelItem(item, {placement: 'accordion'})
                                )}
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            )}
            {isPanelOpen && isDialogMode && (
                <SidenavDialogPanel id={dialogPanelId} itemId={id} label={label} containerRef={containerRef}>
                    {secondLevelItems?.map((item) =>
                        renderSidenavSecondLevelItem(item, {placement: 'panel'})
                    )}
                </SidenavDialogPanel>
            )}
        </div>
    );
};

export {SidenavFirstLevelItem};
