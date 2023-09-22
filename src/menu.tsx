import * as React from 'react';
import classnames from 'classnames';
import {ESC, TAB} from './utils/key-codes';
import {cancelEvent, getPrefixedDataAttributes} from './utils/dom';
import Overlay from './overlay';
import * as styles from './menu.css';
import {useWindowSize} from './hooks';
import {Portal} from './portal';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import Box from './box';
import Inline from './inline';
import Touchable from './touchable';
import {Text3} from './text';
import {vars} from './skins/skin-contract.css';
import Divider from './divider';
import Checkbox from './checkbox';

import type {DataAttributes, IconProps} from './utils/types';

type MenuItemProps = {
    text: string;
    Icon?: React.FC<IconProps>;
    destructive?: boolean;
    disabled?: boolean;
    children?: undefined;
    onPress?: (label: string) => void;
    checked?: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = ({text, Icon, destructive, disabled, onPress, checked}) => {
    const contentColor = destructive ? vars.colors.textLinkDanger : vars.colors.neutralHigh;

    return checked !== undefined ? (
        <Checkbox
            name={text}
            checked={checked}
            onChange={() => onPress?.(text)}
            disabled={disabled}
            render={({controlElement, labelId}) => (
                <Box
                    paddingX={8}
                    paddingY={12}
                    className={disabled ? styles.menuItemDisabled : styles.menuItem}
                >
                    <Inline space="between" alignItems="center">
                        <Inline space={8} alignItems="center">
                            {Icon && <Icon size={24} color={contentColor} />}
                            <Text3 regular color={contentColor} id={labelId}>
                                {text}
                            </Text3>
                        </Inline>
                        <Box paddingLeft={8}>{controlElement}</Box>
                    </Inline>
                </Box>
            )}
        />
    ) : (
        <Touchable onPress={() => onPress?.(text)} disabled={disabled}>
            <Box paddingX={8} paddingY={12} className={disabled ? styles.menuItemDisabled : styles.menuItem}>
                <Inline space={8} alignItems="center">
                    {Icon && <Icon size={24} color={contentColor} />}
                    <Text3 regular color={contentColor}>
                        {text}
                    </Text3>
                </Inline>
            </Box>
        </Touchable>
    );
};

type MenuSectionProps = {
    children?: React.ReactNode;
};

export const MenuSection: React.FC<MenuSectionProps> = ({children}) => {
    return (
        <>
            {children}
            <Box paddingY={8} className={styles.menuSectionDivider}>
                <Divider />
            </Box>
        </>
    );
};

const MARGIN_THRESHOLD = 12;
const MENU_OFFSET_FROM_TARGET = 8;

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

export const Menu: React.FC<MenuProps> = ({
    renderTarget,
    renderMenu,
    width,
    position = 'left',
    dataAttributes,
}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [target, setTarget] = React.useState<HTMLElement | null>(null);
    const [menu, setMenu] = React.useState<HTMLElement | null>(null);

    const [animateShowItems, setAnimateShowItems] = React.useState(false);
    const [itemsComputedProps, setItemsComputedProps] = React.useState<{
        left?: number;
        right?: number;
        top: string;
        bottom: string;
        maxHeight?: number;
        transformOrigin: string;
    } | null>(null);

    const windowSize = useWindowSize();

    React.useEffect(() => {
        const targetRect = target?.getBoundingClientRect();

        if (!menu || !targetRect || !isMenuOpen) {
            setAnimateShowItems(false);
            return;
        }

        const {top: topTarget, right: rightTarget, left: leftTarget, bottom: bottomTarget} = targetRect;

        const heightMenu = menu.scrollHeight;

        const leftDirection = position === 'left' ? leftTarget : undefined;
        const rightDirection = position === 'right' ? windowSize.width - rightTarget : undefined;

        const topTargetWithOffset = topTarget - MENU_OFFSET_FROM_TARGET;
        const bottomTargetWithOffset = bottomTarget + MENU_OFFSET_FROM_TARGET;

        const availableSpaceOnBottom = windowSize.height - bottomTargetWithOffset - MARGIN_THRESHOLD;
        const availableSpaceOnTop = topTargetWithOffset - MARGIN_THRESHOLD;
        const menuFitsOnBottom = availableSpaceOnBottom > heightMenu;
        const menuFitsOnTop = availableSpaceOnTop > heightMenu;

        if (menuFitsOnBottom) {
            setItemsComputedProps({
                left: leftDirection,
                right: rightDirection,
                top: `${bottomTargetWithOffset}px`,
                bottom: 'auto',
                maxHeight: undefined,
                transformOrigin: 'center top',
            });
        } else if (menuFitsOnTop) {
            setItemsComputedProps({
                left: leftDirection,
                right: rightDirection,
                top: `${topTargetWithOffset - heightMenu}px`,
                bottom: 'auto',
                maxHeight: undefined,
                transformOrigin: 'center bottom',
            });
        } else if (availableSpaceOnBottom > availableSpaceOnTop) {
            setItemsComputedProps({
                left: leftDirection,
                right: rightDirection,
                top: `${bottomTargetWithOffset}px`,
                bottom: 'auto',
                maxHeight: availableSpaceOnBottom,
                transformOrigin: 'center top',
            });
        } else {
            setItemsComputedProps({
                left: leftDirection,
                right: rightDirection,
                top: 'auto',
                bottom: `${windowSize.height - topTargetWithOffset}px`,
                maxHeight: availableSpaceOnTop,
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
                                ...assignInlineVars({
                                    ...(itemsComputedProps
                                        ? {
                                              [styles.vars.top]: itemsComputedProps.top,
                                              [styles.vars.bottom]: itemsComputedProps.bottom,
                                              ...(itemsComputedProps.left
                                                  ? {
                                                        [styles.vars.left]: `${itemsComputedProps.left}px`,
                                                    }
                                                  : {[styles.vars.right]: `${itemsComputedProps.right}px`}),
                                              [styles.vars.transformOrigin]:
                                                  itemsComputedProps.transformOrigin,
                                              [styles.vars.maxHeight]: `${itemsComputedProps.maxHeight}px`,
                                              [styles.vars.width]: `${width}px`,
                                          }
                                        : {}),
                                }),
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
