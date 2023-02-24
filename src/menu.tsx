import * as React from 'react';
import classnames from 'classnames';
import {ESC, TAB} from './utils/key-codes';
import {cancelEvent, getPrefixedDataAttributes} from './utils/dom';
import Overlay from './overlay';
import * as styles from './menu.css';
import {useWindowSize} from './hooks';
import {Portal} from './portal';

import type {DataAttributes} from './utils/types';

const DEFAULT_MENU_WIDTH = 350;
const MARGIN_THRESHOLD = 12;

type MenuRenderProps = {
    ref: (element: HTMLElement | null) => void;
    className: string;
    close: () => void;
};

type TargetRenderProps = {
    ref: (element: HTMLElement | null) => void;
    onPress: () => void;
    isMenuOpen: boolean;
};

export type MenuProps = {
    width?: number;
    renderTarget: (props: TargetRenderProps) => React.ReactNode;
    renderMenu: (props: MenuRenderProps) => React.ReactNode;
    children?: void;
    position?: 'left' | 'right';
    dataAttributes?: DataAttributes;
};

const Menu: React.FC<MenuProps> = ({
    renderTarget,
    renderMenu,
    width = DEFAULT_MENU_WIDTH,
    position = 'left',
    dataAttributes,
}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [target, setTarget] = React.useState<HTMLElement | null>(null);
    const [menu, setMenu] = React.useState<HTMLElement | null>(null);

    const [animateShowItems, setAnimateShowItems] = React.useState(false);
    const [itemsComputedProps, setItemsComputedProps] = React.useState<{
        left: string;
        top: string;
        bottom: string;
        maxHeight: string;
        transformOrigin: string;
    } | null>(null);

    const windowSize = useWindowSize();

    React.useEffect(() => {
        const targetRect = target?.getBoundingClientRect();

        if (!menu || !targetRect || !isMenuOpen) {
            setAnimateShowItems(false);
            return;
        }

        const {top: topTarget, width: widthTarget, left: leftTarget, bottom: bottomTarget} = targetRect;

        const heightMenu = parseInt(window.getComputedStyle(menu).getPropertyValue('height')) ?? 0;

        const leftDirection =
            position === 'left' ? `${leftTarget}px` : `${leftTarget + widthTarget - width}px`;

        const availableSpaceOnBottom = windowSize.height - bottomTarget - MARGIN_THRESHOLD;
        const availableSpaceOnTop = topTarget - MARGIN_THRESHOLD;
        const menuFitsOnBottom = availableSpaceOnBottom > heightMenu;
        const menuFitsOnTop = availableSpaceOnTop > heightMenu;

        if (menuFitsOnBottom) {
            setItemsComputedProps({
                left: leftDirection,
                top: `${bottomTarget}px`,
                bottom: 'auto',
                maxHeight: '100%',
                transformOrigin: 'center top',
            });
        } else if (menuFitsOnTop) {
            setItemsComputedProps({
                left: leftDirection,
                top: `${topTarget - heightMenu}px`,
                bottom: 'auto',
                maxHeight: '100%',
                transformOrigin: 'center bottom',
            });
        } else if (availableSpaceOnBottom > availableSpaceOnTop) {
            setItemsComputedProps({
                left: leftDirection,
                top: `${bottomTarget}px`,
                bottom: 'auto',
                maxHeight: `${availableSpaceOnBottom}px`,
                transformOrigin: 'center top',
            });
        } else {
            setItemsComputedProps({
                left: leftDirection,
                top: 'auto',
                bottom: `${windowSize.height - topTarget}px`,
                maxHeight: `${availableSpaceOnTop}px`,
                transformOrigin: 'center bottom',
            });
        }

        let requestAnimationFrameId: number;
        if (isMenuOpen) {
            requestAnimationFrameId = requestAnimationFrame(() => {
                setAnimateShowItems(true);
            });
        }

        return () => {
            if (requestAnimationFrameId) {
                cancelAnimationFrame(requestAnimationFrameId);
            }
        };
    }, [position, isMenuOpen, menu, target, width, windowSize]);

    const targetProps = React.useMemo(
        () => ({
            ref: setTarget,
            onPress: () => {
                setIsMenuOpen(!isMenuOpen);
            },
        }),
        [setTarget, isMenuOpen, setIsMenuOpen]
    );

    const menuProps = React.useMemo(
        () => ({
            ref: setMenu,
            className: classnames(
                styles.menuContainer,
                animateShowItems ? styles.showItems : styles.hideItems
            ),
            close: () => {
                setIsMenuOpen(false);
            },
        }),
        [animateShowItems]
    );

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isMenuOpen) {
                if (e.keyCode === TAB) {
                    cancelEvent(e);
                }
                if (e.keyCode === ESC) {
                    setIsMenuOpen(false);
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    });

    return (
        <div {...getPrefixedDataAttributes(dataAttributes, 'Menu')}>
            {renderTarget({...targetProps, isMenuOpen})}
            {isMenuOpen ? (
                <Portal>
                    <Overlay
                        onPress={(e) => {
                            cancelEvent(e);
                            setIsMenuOpen(false);
                        }}
                        disableScroll
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'absolute',
                                top: itemsComputedProps?.top,
                                bottom: itemsComputedProps?.bottom,
                                maxHeight: itemsComputedProps?.maxHeight,
                                left: itemsComputedProps?.left,
                                transformOrigin: itemsComputedProps?.transformOrigin,
                                width: `${width}px`,
                            }}
                        >
                            {renderMenu(menuProps)}
                        </div>
                    </Overlay>
                </Portal>
            ) : null}
        </div>
    );
};

export default Menu;
