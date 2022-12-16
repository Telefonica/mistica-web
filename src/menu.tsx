import * as React from 'react';
import classnames from 'classnames';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {ESC, TAB} from './utils/key-codes';
import {cancelEvent, getPrefixedDataAttributes} from './utils/dom';
import Overlay from './overlay';
import * as styles from './menu.css';
import {sprinkles} from './sprinkles.css';

import type {DataAttributes} from './utils/types';

const MAX_HEIGHT_DEFAULT = 416;

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
    dataAttributes: DataAttributes;
};

const Menu: React.FC<MenuProps> = ({renderTarget, renderMenu, width, position = 'left', dataAttributes}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [target, setTarget] = React.useState<HTMLElement | null>(null);
    const [menu, setMenu] = React.useState<HTMLElement | null>(null);

    const [animateShowItems, setAnimateShowItems] = React.useState(false);
    const [itemsComputedProps, setItemsComputedProps] = React.useState<{
        right?: string;
        bottom?: string;
        top?: string;
        maxHeight?: number;
        transformOrigin?: string;
    }>({});

    React.useEffect(() => {
        const targetRect = target?.getBoundingClientRect();

        if (!menu || !targetRect || !isMenuOpen) {
            setAnimateShowItems(false);
            return;
        }

        const MARGIN_THRESHOLD = 12;
        const {top: topTarget, width: widthTarget, height} = targetRect;
        const top = topTarget + height;
        const spaceTaken = parseInt(window.getComputedStyle(menu).getPropertyValue('height')) ?? 0;

        const rightDirection = position === 'left' ? 'auto' : `calc(100% - ${widthTarget}px)`;

        // if it doesn't fit on bottom
        if (top + spaceTaken + MARGIN_THRESHOLD > window.innerHeight) {
            const availableSpaceBottom = window.innerHeight - top;
            if (topTarget /* this is the available space on top */ > availableSpaceBottom) {
                setItemsComputedProps({
                    right: rightDirection,
                    bottom: '100%',
                    top: 'auto',
                    maxHeight: Math.min(topTarget, MAX_HEIGHT_DEFAULT),
                    transformOrigin: 'center bottom',
                });
            } else {
                setItemsComputedProps({
                    top: '100%',
                    bottom: 'auto',
                    right: rightDirection,
                    maxHeight: Math.min(window.innerHeight - top - MARGIN_THRESHOLD, MAX_HEIGHT_DEFAULT),
                    transformOrigin: 'center top',
                });
            }
        } else {
            // if it fits on bottom
            setItemsComputedProps({
                top: '100%',
                bottom: 'auto',
                right: rightDirection,
                maxHeight: Math.min(window.innerHeight - top - MARGIN_THRESHOLD, MAX_HEIGHT_DEFAULT),
                transformOrigin: 'center top',
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
    }, [position, isMenuOpen, menu, target, width]);

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
        <div
            className={sprinkles({position: 'relative'})}
            style={{
                ...assignInlineVars({
                    [styles.vars.width]: width ? `${width}px` : '100%',
                    [styles.vars.top]: itemsComputedProps.top ?? '',
                    [styles.vars.bottom]: itemsComputedProps.bottom ?? '',
                    [styles.vars.right]: itemsComputedProps.right ?? '',
                    [styles.vars.transformOrigin]: itemsComputedProps.transformOrigin ?? '',
                    [styles.vars.maxHeight]: itemsComputedProps.maxHeight
                        ? `${itemsComputedProps.maxHeight}px`
                        : '',
                }),
            }}
            {...getPrefixedDataAttributes(dataAttributes, 'Menu')}
        >
            {isMenuOpen ? (
                <Overlay
                    onPress={(e) => {
                        cancelEvent(e);
                        setIsMenuOpen(false);
                    }}
                    disableScroll
                />
            ) : null}
            {renderTarget({...targetProps, isMenuOpen})}
            {isMenuOpen ? renderMenu(menuProps) : null}
        </div>
    );
};

export default Menu;
