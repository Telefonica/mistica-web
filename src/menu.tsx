import * as React from 'react';
import classnames from 'classnames';
import {ESC, LEFT, RIGHT, UP, DOWN, ENTER, SPACE, TAB} from './utils/key-codes';
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

const CLOSE_MENU_DELAY = 150;

type MenuContextType = {
    focusedValue: string | null;
    isMenuOpen: boolean;
    setFocusedValue: (value: string | null) => void;
    closeMenu: () => void;
};
const MenuContext = React.createContext<MenuContextType>({
    focusedValue: null,
    isMenuOpen: false,
    setFocusedValue: () => {},
    closeMenu: () => {},
});
export const useMenuContext = (): MenuContextType => React.useContext(MenuContext);

interface MenuItemBaseProps {
    label: string;
    Icon?: React.FC<IconProps>;
    destructive?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    children?: undefined;
    onPress: (label: string) => void;
}

interface MenuItemWithoutControlProps extends MenuItemBaseProps {
    controlType?: undefined;
    checked?: undefined;
}

interface MenuItemWithControlProps extends MenuItemBaseProps {
    controlType: 'checkbox';
    checked?: boolean;
}

type MenuItemProps = MenuItemWithControlProps | MenuItemWithoutControlProps;

export const MenuItem: React.FC<MenuItemProps> = ({
    label,
    Icon,
    destructive,
    disabled,
    ariaLabel,
    onPress,
    controlType,
    checked,
}) => {
    const {focusedValue, setFocusedValue, closeMenu, isMenuOpen} = useMenuContext();
    const contentColor = destructive ? vars.colors.textLinkDanger : vars.colors.neutralHigh;

    const renderContent = () =>
        controlType === 'checkbox' ? (
            <Checkbox
                name={label}
                checked={checked}
                onChange={() => {
                    if (isMenuOpen) {
                        onPress(label);
                        closeMenu();
                    }
                }}
                disabled={disabled}
                role="menuitemcheckbox"
                aria-label={ariaLabel ?? label}
                render={({controlElement}) => (
                    <Box paddingX={8} paddingY={12}>
                        <Inline space="between" alignItems="center">
                            <Inline space={8} alignItems="center">
                                {Icon && <Icon size={24} color={contentColor} />}
                                <Text3 regular color={contentColor}>
                                    {label}
                                </Text3>
                            </Inline>
                            <Box paddingLeft={16}>{controlElement}</Box>
                        </Inline>
                    </Box>
                )}
            />
        ) : (
            <Touchable
                onPress={() => {
                    if (isMenuOpen) {
                        onPress(label);
                        closeMenu();
                    }
                }}
                disabled={disabled}
                role="menuitem"
                aria-label={label}
            >
                <Box paddingX={8} paddingY={12}>
                    <Inline space={8} alignItems="center">
                        {Icon && <Icon size={24} color={contentColor} />}
                        <Text3 regular color={contentColor}>
                            {label}
                        </Text3>
                    </Inline>
                </Box>
            </Touchable>
        );

    return (
        <div
            className={classnames(styles.menuItem, {
                [styles.menuItemDisabled]: disabled,
                [styles.menuItemHovered]: !disabled && focusedValue === label,
            })}
            onMouseMove={() => setFocusedValue(disabled ? null : label)}
            onMouseLeave={() => setFocusedValue(null)}
        >
            {renderContent()}
        </div>
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
    const [isMenuClosing, setIsMenuClosing] = React.useState(false);
    const [focusedValue, setFocusedValue] = React.useState<string | null>(null);
    const [isOpenedwithKeyboard, setIsOpenedwithKeyboard] = React.useState(false);

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

        if (!menu || !targetRect || !isMenuOpen || isMenuClosing) {
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
    }, [position, isMenuOpen, menu, target, width, windowSize, isMenuClosing]);

    const targetProps = React.useMemo(
        () => ({
            ref: setTarget,
            onPress: () => {
                if (isMenuOpen) setIsMenuClosing(true);
                else setIsMenuOpen(true);
            },
        }),
        [setTarget, isMenuOpen]
    );

    const menuProps = React.useMemo(
        () => ({
            ref: setMenu,
            className: classnames(
                styles.menuContainer,
                animateShowItems ? styles.showItems : styles.hideItems
            ),
            close: () => setIsMenuClosing(true),
        }),
        [animateShowItems]
    );

    React.useEffect(() => {
        let closingTimeout: NodeJS.Timeout;
        if (isMenuClosing) {
            closingTimeout = setTimeout(() => {
                setIsMenuOpen(false);
                setIsMenuClosing(false);
            }, CLOSE_MENU_DELAY);
        }
        return () => clearTimeout(closingTimeout);
    }, [isMenuClosing]);

    const getMenuItems = React.useCallback(
        (): Array<HTMLElement> =>
            menu ? Array.from(menu.querySelectorAll('[role=menuitem],[role=menuitemcheckbox]')) : [],
        [menu]
    );

    const setFirstFocusableItem = React.useCallback(() => {
        const items = getMenuItems();
        const nextItem = items.findIndex((value) => !value.getAttribute('aria-disabled'));
        setFocusedValue(nextItem < 0 ? null : items[nextItem].getAttribute('aria-label'));
    }, [getMenuItems]);

    const setNextFocusableItem = React.useCallback(
        (reverse?: boolean) => {
            const items = getMenuItems();
            if (reverse) {
                items.reverse();
            }
            const focusedId = items.findIndex((item) => item.getAttribute('aria-label') === focusedValue);

            let nextItem = items.findIndex(
                (value, index) => !value.getAttribute('aria-disabled') && index > focusedId
            );
            if (nextItem === -1) {
                nextItem = items.findIndex((value) => !value.getAttribute('aria-disabled'));
            }

            setFocusedValue(nextItem < 0 ? null : items[nextItem].getAttribute('aria-label'));
            items[nextItem]?.focus();
        },
        [focusedValue, getMenuItems]
    );

    React.useEffect(() => {
        if (!isMenuOpen) {
            setFocusedValue(null);
        } else if (isOpenedwithKeyboard && menu) {
            setFirstFocusableItem();
            setIsOpenedwithKeyboard(false);
        }
    }, [isMenuOpen, setFirstFocusableItem, isOpenedwithKeyboard, menu]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isMenuOpen) {
                switch (e.keyCode) {
                    case RIGHT:
                    case DOWN:
                        setNextFocusableItem();
                        e.preventDefault();
                        e.stopPropagation();
                        break;
                    case LEFT:
                    case UP:
                        setNextFocusableItem(true);
                        e.preventDefault();
                        e.stopPropagation();
                        break;
                    case ESC:
                        setIsMenuClosing(true);
                        break;
                    case SPACE:
                    case ENTER:
                        cancelEvent(e);
                        getMenuItems()
                            .find((item) => item.getAttribute('aria-label') === focusedValue)
                            ?.click();
                        break;
                    case TAB:
                        cancelEvent(e);
                        break;

                    default:
                    // do nothing
                }
            } else {
                switch (e.keyCode) {
                    case ENTER:
                    case SPACE:
                        setIsOpenedwithKeyboard(true);
                        break;
                    case DOWN:
                        if (target === document.activeElement) {
                            setIsOpenedwithKeyboard(true);
                            setIsMenuOpen(true);
                        }
                        break;
                    default:
                    // do nothing
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
                            setIsMenuClosing(true);
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
                                              [styles.vars.transformOrigin]:
                                                  itemsComputedProps.transformOrigin,

                                              ...(itemsComputedProps.left !== undefined && {
                                                  [styles.vars.left]: `${itemsComputedProps.left}px`,
                                              }),

                                              ...(itemsComputedProps.right !== undefined && {
                                                  [styles.vars.right]: `${itemsComputedProps.right}px`,
                                              }),

                                              ...(itemsComputedProps.maxHeight !== undefined && {
                                                  [styles.vars
                                                      .maxHeight]: `${itemsComputedProps.maxHeight}px`,
                                              }),

                                              ...(width !== undefined && {
                                                  [styles.vars.width]: width ? `${width}px` : '',
                                              }),
                                          }
                                        : {}),
                                }),
                            }}
                        >
                            <MenuContext.Provider
                                value={{
                                    isMenuOpen: isMenuOpen && !isMenuClosing,
                                    focusedValue,
                                    setFocusedValue,
                                    closeMenu: () => setIsMenuClosing(true),
                                }}
                            >
                                {renderMenu(menuProps)}
                            </MenuContext.Provider>
                        </div>
                    </Overlay>
                </Portal>
            ) : null}
        </div>
    );
};
