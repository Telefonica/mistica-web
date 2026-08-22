'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {useSidenavBarContext, SidenavBarContext, SidenavLevelContext} from './sidenav-context';
import {useDialogPanelKeyboard} from './use-sidenav-keyboard';
import {Portal} from '../portal';
import {Text3} from '../text';
import {listenResize} from '../utils/dom';
import {useTheme} from '../hooks';
import {ThemeVariant} from '../theme-variant-context';
import * as tokens from '../text-tokens';

import type {NonDeprecatedVariant} from '../theme-variant-context';

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
    itemId,
    label,
    containerRef,
    children,
}: SidenavDialogPanelProps): JSX.Element => {
    const contextValue = useSidenavBarContext();
    const {texts, t} = useTheme();
    // `Portal` creates its host element in an effect, so the panel node appears one render after the
    // panel mounts. Keeping the node in state (instead of in a ref) re-runs the effects that measure
    // it as soon as it exists.
    const [panelElement, setPanelElement] = React.useState<HTMLDivElement | null>(null);
    const [panelPosition, setPanelPosition] = React.useState<{top: number; left: number} | null>(null);

    useClosePanelOnOutsideInteraction(panelElement);
    useDialogPanelKeyboard({panelElement, containerRef, itemId});

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
                className={styles.dialogPanel}
                role="group"
                aria-label={t(texts.sidenavSubmenu || tokens.sidenavSubmenu, label)}
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
                        className={classnames(styles.dialogPanelTitle, styles.sectionTitleVariant.default)}
                        // The panel already carries the label through its `aria-label`, and the trigger
                        // announces it too, so the visible title stays out of the reading order.
                        aria-hidden="true"
                    >
                        <Text3 medium color="inherit">
                            {label}
                        </Text3>
                    </div>
                    <SidenavBarContext.Provider value={panelContextValue}>
                        <SidenavLevelContext.Provider value={0}>{children}</SidenavLevelContext.Provider>
                    </SidenavBarContext.Provider>
                </ThemeVariant>
            </div>
        </Portal>
    );
};

type SidenavDoublePanelProps = {
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
    ({label, variant, backgroundColor, children}, ref) => {
        const contextValue = useSidenavBarContext();

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
                role="group"
                aria-label={label}
            >
                <div className={styles.doublePanelContent}>
                    <div
                        className={classnames(styles.doublePanelTitle, styles.sectionTitleVariant[variant])}
                        // The column already carries the label through its `aria-label`, and the trigger
                        // item announces it too, so the visible title stays out of the reading order.
                        aria-hidden="true"
                    >
                        <Text3 medium color="inherit">
                            {label}
                        </Text3>
                    </div>
                    <SidenavBarContext.Provider value={panelContextValue}>
                        <SidenavLevelContext.Provider value={0}>{children}</SidenavLevelContext.Provider>
                    </SidenavBarContext.Provider>
                </div>
            </div>
        );
    }
);

export {SidenavDialogPanel, SidenavDoublePanel};
export type {SidenavDialogPanelProps, SidenavDoublePanelProps};
