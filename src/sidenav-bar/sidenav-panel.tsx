'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {useSidenavBarContext, SidenavBarContext, SidenavLevelContext} from './sidenav-bar';
import {Portal} from '../portal';
import {Text3} from '../text';
import {listenResize} from '../utils/dom';
import {vars as skinVars} from '../skins/skin-contract.css';

import type {NonDeprecatedVariant} from '../theme-variant-context';

/** Minimum distance kept between the panel and the viewport edges. */
const VIEWPORT_MARGIN = 8;

/**
 * Closes the panel when the user presses outside of it, or presses the Escape key. A press on a parent
 * item does not close the panel here: that item toggles the panel itself, or replaces its content.
 */
const useClosePanelOnOutsideInteraction = (panelElement: HTMLElement | null): void => {
    const {setPanelOpenForItemId} = useSidenavBarContext();

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (panelElement && !panelElement.contains(target as Node)) {
                const isParentItem = target instanceof Element && target.closest('[data-parent-item="true"]');
                if (!isParentItem) {
                    setPanelOpenForItemId(null);
                }
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
    // `Portal` creates its host element in an effect, so the panel node appears one render after the
    // panel mounts. Keeping the node in state (instead of in a ref) re-runs the effects that measure
    // it as soon as it exists.
    const [panelElement, setPanelElement] = React.useState<HTMLDivElement | null>(null);
    const [panelPosition, setPanelPosition] = React.useState<{top: number; left: number} | null>(null);

    useClosePanelOnOutsideInteraction(panelElement);

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
                aria-label={label}
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
                <div className={styles.dialogPanelTitle}>
                    <Text3 medium color={skinVars.colors.textSecondary}>
                        {label}
                    </Text3>
                </div>
                <SidenavBarContext.Provider value={panelContextValue}>
                    <SidenavLevelContext.Provider value={0}>{children}</SidenavLevelContext.Provider>
                </SidenavBarContext.Provider>
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
 */
const SidenavDoublePanel = ({
    label,
    variant,
    backgroundColor,
    children,
}: SidenavDoublePanelProps): JSX.Element => {
    const contextValue = useSidenavBarContext();
    const [panelElement, setPanelElement] = React.useState<HTMLDivElement | null>(null);

    useClosePanelOnOutsideInteraction(panelElement);

    const panelContextValue = {
        ...contextValue,
        // The children of the panel always show their label and never a tooltip, even when the sidenav
        // is collapsed, and a press on one of them closes the panel.
        isInsidePanel: true,
    };

    return (
        <div
            ref={setPanelElement}
            className={classnames(styles.doublePanelColumn, styles.body[variant])}
            style={backgroundColor ? {backgroundColor} : undefined}
            role="group"
            aria-label={label}
        >
            <div className={styles.doublePanelTitle}>
                <Text3 medium color={skinVars.colors.textSecondary}>
                    {label}
                </Text3>
            </div>
            <SidenavBarContext.Provider value={panelContextValue}>
                <SidenavLevelContext.Provider value={0}>{children}</SidenavLevelContext.Provider>
            </SidenavBarContext.Provider>
        </div>
    );
};

export {SidenavDialogPanel, SidenavDoublePanel};
export type {SidenavDialogPanelProps, SidenavDoublePanelProps};
