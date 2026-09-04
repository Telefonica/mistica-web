'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {useSidenavBarContext, SidenavBarContext, SidenavLevelContext} from './sidenav-bar-context';
import {useDialogPanelKeyboard} from './use-sidenav-bar-keyboard';
import {Portal} from './portal';
import {Text2} from './text';
import {listenResize} from './utils/dom';
import {ThemeVariant} from './theme-variant-context';

import type {NonDeprecatedVariant} from './theme-variant-context';

/** Minimum distance kept between the panel and the viewport edges. */
const VIEWPORT_MARGIN = 8;

/**
 * Closes the dialog panel when the user presses outside of it, or presses the Escape key. A press on a
 * parent item does not close the panel here: that item toggles the panel itself, or replaces its content.
 *
 * The double panel does not use this hook: it is a column of the sidenav, not a floating dialog, so only
 * a press outside of the whole bar dismisses it. `SidenavBar` owns that rule.
 */
const useClosePanelOnOutsideInteraction = (panelElement: HTMLElement | null): void => {
    const {setPanelOpenForItemId} = useSidenavBarContext();

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!panelElement) {
                return;
            }
            // See the same call in `sidenav-bar.tsx`: the path holds the nodes that the press travelled
            // through, and not the node that survived until this listener ran.
            const path = event.composedPath();
            if (path.includes(panelElement)) {
                return;
            }
            // A press on a parent item lands outside of this panel, but that item owns the panel and
            // toggles it on its own, so this listener leaves it alone. The marker travels in the path
            // above, which is why it still reads a row that React already replaced.
            const isParentItem = path.some(
                (node) => node instanceof Element && node.matches('[data-parent-item="true"]')
            );
            if (!isParentItem) {
                setPanelOpenForItemId(null);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setPanelOpenForItemId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [panelElement, setPanelOpenForItemId]);
};

type SidenavDialogPanelProps = {
    id: string;
    itemId: string;
    label: string;
    containerRef: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
};

/**
 * A floating panel with the children of a parent item. It is used when the sidenav is collapsed and the
 * double panel mode is off. The panel is anchored to the top of its trigger whenever it fits.
 */
const SidenavDialogPanel = ({
    id,
    itemId,
    label,
    containerRef,
    children,
}: SidenavDialogPanelProps): JSX.Element => {
    const contextValue = useSidenavBarContext();
    // `Portal` creates its host element in an effect, so the panel node appears one render after the
    // panel mounts. Keeping the node in state (instead of in a ref) re-runs the effects that measure
    // it as soon as it exists.
    const [panelElement, setPanelElement] = React.useState<HTMLDivElement | null>(null);
    const [panelPosition, setPanelPosition] = React.useState<{top: number; left: number} | null>(null);
    // The visible title names the list, so the name a screen reader speaks is always the text the user
    // sees. The panel itself carries no role and no name: the named list is the whole structure.
    const titleId = React.useId();

    useClosePanelOnOutsideInteraction(panelElement);
    // The first item of the panel takes the focus only once the panel stands where it belongs: it stays
    // hidden until the effect below measures it, and a hidden element takes no focus.
    useDialogPanelKeyboard({
        panelElement,
        containerRef,
        itemId,
        isPositioned: panelPosition !== null,
        onClose: () => contextValue.setPanelOpenForItemId(null),
    });

    // The panel opens aligned with its trigger, but a trigger close to the bottom edge pushes the
    // panel out of the viewport. The top is therefore clamped to the lowest position where the whole
    // panel still fits, so every item stays readable and clickable. A panel taller than the viewport
    // starts at the top margin and scrolls inside its own `maxHeight`.
    React.useEffect(() => {
        const updatePosition = () => {
            const container = containerRef.current;
            if (!container) return;

            const triggerElement = container.querySelector(`[data-sidenav-item-id="${itemId}"]`);
            if (!triggerElement) return;

            const containerRect = container.getBoundingClientRect();
            const triggerRect = triggerElement.getBoundingClientRect();
            const panelHeight = panelElement?.offsetHeight ?? 0;
            const lowestFittingTop = window.innerHeight - panelHeight - VIEWPORT_MARGIN;

            setPanelPosition({
                top: Math.max(VIEWPORT_MARGIN, Math.min(triggerRect.top, lowestFittingTop)),
                left: containerRect.right + 8,
            });
        };

        updatePosition();

        const stopListeningResize = panelElement ? listenResize(panelElement, updatePosition) : undefined;
        window.addEventListener('resize', updatePosition);
        return () => {
            stopListeningResize?.();
            window.removeEventListener('resize', updatePosition);
        };
    }, [itemId, containerRef, panelElement]);

    const panelContextValue = {
        ...contextValue,
        isInsidePanel: true,
    };

    return (
        <Portal>
            <div
                ref={setPanelElement}
                id={id}
                className={styles.dialogPanel}
                data-sidenav-dialog-panel={itemId}
                style={
                    panelPosition
                        ? {
                              position: 'fixed' as const,
                              top: panelPosition.top,
                              left: panelPosition.left,
                          }
                        : // The panel needs its own height to know whether it fits below the
                          // trigger, so it stays hidden for the render that precedes the
                          // measurement instead of flashing at a placeholder position.
                          {
                              position: 'fixed' as const,
                              top: 0,
                              left: 0,
                              visibility: 'hidden' as const,
                          }
                }
            >
                <ThemeVariant variant="default">
                    <div
                        id={titleId}
                        className={classnames(styles.dialogPanelTitle, styles.sectionTitleVariant.default)}
                        // The list already speaks this text as its name, so the title steps out of the
                        // reading order. The name survives: `aria-labelledby` reads a hidden element that
                        // it references directly.
                        aria-hidden="true"
                    >
                        <Text2 medium color="inherit">
                            {label}
                        </Text2>
                    </div>
                    <SidenavBarContext.Provider value={panelContextValue}>
                        <SidenavLevelContext.Provider value={0}>
                            {/* The title names the list, and the list gives the count of its items. */}
                            <div className={styles.panelRows} role="list" aria-labelledby={titleId}>
                                {children}
                            </div>
                        </SidenavLevelContext.Provider>
                    </SidenavBarContext.Provider>
                </ThemeVariant>
            </div>
        </Portal>
    );
};

type SidenavDoublePanelProps = {
    itemId: string;
    label: string;
    variant: NonDeprecatedVariant;
    backgroundColor?: string;
    children: React.ReactNode;
};

/**
 * The second column of the sidenav, with the children of the open parent item. It is used in double
 * panel mode, both when the sidenav is expanded and when it is collapsed.
 *
 * It forwards its ref because `SidenavBar` slides it out and back in with a `CSSTransition`, which needs
 * the node of the column. The column itself carries no padding: an inner box of the width of the open
 * column holds it instead, so the column can narrow to zero without reflowing its content.
 */
const SidenavDoublePanel = React.forwardRef<HTMLDivElement, SidenavDoublePanelProps>(
    ({itemId, label, variant, backgroundColor, children}, ref) => {
        const contextValue = useSidenavBarContext();
        // The visible title names the list, so the name a screen reader speaks is always the text the
        // user sees. The column itself carries no role and no name: the named list is the whole structure.
        const titleId = React.useId();

        const panelContextValue = {
            ...contextValue,
            // The children of the panel always show their label and never a tooltip, even when the sidenav
            // is collapsed, and a press on one of them closes the panel.
            isInsidePanel: true,
        };

        return (
            <div
                ref={ref}
                className={classnames(styles.doublePanelColumn, styles.regionBackground[variant])}
                style={backgroundColor ? {backgroundColor} : undefined}
                // Marks the column with the id of the item that owns it, so the keyboard of the rail finds
                // the list of a trigger, and the trigger of a list.
                data-sidenav-double-panel={itemId}
            >
                <div className={styles.doublePanelContent}>
                    <div
                        id={titleId}
                        className={classnames(styles.doublePanelTitle, styles.sectionTitleVariant[variant])}
                        // The list already speaks this text as its name, so the title steps out of the
                        // reading order. The name survives: `aria-labelledby` reads a hidden element that
                        // it references directly.
                        aria-hidden="true"
                    >
                        <Text2 medium color="inherit">
                            {label}
                        </Text2>
                    </div>
                    <SidenavBarContext.Provider value={panelContextValue}>
                        <SidenavLevelContext.Provider value={0}>
                            {/* The title names the list, and the list gives the count of its items. */}
                            <div className={styles.panelRows} role="list" aria-labelledby={titleId}>
                                {children}
                            </div>
                        </SidenavLevelContext.Provider>
                    </SidenavBarContext.Provider>
                </div>
            </div>
        );
    }
);

export {SidenavDialogPanel, SidenavDoublePanel};
export type {SidenavDialogPanelProps, SidenavDoublePanelProps};
