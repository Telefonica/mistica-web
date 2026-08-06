'use client';
import * as React from 'react';
import * as styles from './sidenav-bar.css';
import {useSidenavBarContext, SidenavBarContext, SidenavLevelContext} from './sidenav-bar';
import {Portal} from '../portal';
import {Text3} from '../text';
import {vars as skinVars} from '../skins/skin-contract.css';

type SidenavPanelProps = {
    itemId: string;
    label: string;
    containerRef: React.RefObject<HTMLElement | null>;
    level: number;
    children: React.ReactNode;
};

const SidenavPanel = ({itemId, label, containerRef, level, children}: SidenavPanelProps): JSX.Element => {
    const contextValue = useSidenavBarContext();
    const {collapsed, doublePanel, setPanelOpenForItemId} = contextValue;
    const panelRef = React.useRef<HTMLDivElement>(null);
    const [panelPosition, setPanelPosition] = React.useState<{top: number; left: number} | null>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                panelRef.current &&
                !panelRef.current.contains(target) &&
                containerRef.current &&
                !containerRef.current.contains(target)
            ) {
                setPanelOpenForItemId(null);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setPanelOpenForItemId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [containerRef, setPanelOpenForItemId]);

    React.useEffect(() => {
        const updatePosition = () => {
            const container = containerRef.current;
            if (!container) return;

            const triggerElement = container.querySelector(`[data-sidenav-item-id="${itemId}"]`);
            if (!triggerElement) return;

            const containerRect = container.getBoundingClientRect();
            const triggerRect = triggerElement.getBoundingClientRect();

            setPanelPosition({
                top: Math.max(0, triggerRect.top),
                left: containerRect.right + 8,
            });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, [itemId, containerRef]);

    const isDialogMode = collapsed && !doublePanel;
    const panelContextValue = {
        ...contextValue,
        isInsidePanel: true,
    };

    if (isDialogMode) {
        return (
            <Portal>
                <div
                    className={styles.panelOverlay}
                    role="presentation"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setPanelOpenForItemId(null);
                        }
                    }}
                >
                    <div
                        ref={panelRef}
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
                                : {
                                      position: 'fixed' as const,
                                      top: '50%',
                                      left: '50%',
                                      transform: 'translate(-50%, -50%)',
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
                </div>
            </Portal>
        );
    }

    return (
        <div ref={panelRef} className={styles.doublePanel} role="group" aria-label={label}>
            <SidenavBarContext.Provider value={panelContextValue}>
                <SidenavLevelContext.Provider value={level + 1}>{children}</SidenavLevelContext.Provider>
            </SidenavBarContext.Provider>
        </div>
    );
};

export {SidenavPanel};
export type {SidenavPanelProps};
