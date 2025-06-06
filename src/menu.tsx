'use client';
import * as React from 'react';
import classnames from 'classnames';
import {ESC, LEFT, RIGHT, UP, DOWN, ENTER, SPACE, TAB} from './utils/keys';
import {cancelEvent, getPrefixedDataAttributes} from './utils/dom';
import Overlay from './overlay';
import * as styles from './menu.css';
import {useWindowSize} from './hooks';
import {Portal} from './portal';
import Box from './box';
import Inline from './inline';
import Touchable from './touchable';
import {Text3} from './text';
import {vars} from './skins/skin-contract.css';
import Divider from './divider';
import Checkbox from './checkbox';
import {CSSTransition} from 'react-transition-group';
import {combineRefs} from './utils/common';
import {applyCssVars} from './utils/css';
import {isRunningAcceptanceTest} from './utils/platform';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps} from './utils/types';

const MENU_TRANSITION_DURATION_IN_MS = 120;

type MenuContextType = {
    focusedItem: number | null;
    isMenuOpen: boolean;
    setFocusedItem: (item: number | null) => void;
    closeMenu: () => void;
};

const MenuContext = React.createContext<MenuContextType>({
    focusedItem: null,
    isMenuOpen: false,
    setFocusedItem: () => {},
    closeMenu: () => {},
});

const useMenuContext = (): MenuContextType => React.useContext(MenuContext);

const getMenuItems = (menu: HTMLElement | null): Array<HTMLElement> =>
    menu ? Array.from(menu.querySelectorAll('[role=menuitem],[role=menuitemcheckbox]')) : [];

const getItemIndexInMenu = (menu: HTMLElement | null, item: HTMLElement | null): number | null => {
    if (!item) {
        return null;
    }
    const itemIndex = getMenuItems(menu).indexOf(item);
    return itemIndex < 0 ? null : itemIndex;
};

interface MenuItemBaseProps {
    label: string;
    Icon?: (props: IconProps) => JSX.Element;
    destructive?: boolean;
    disabled?: boolean;
    onPress: (item: number) => void;
    dataAttributes?: DataAttributes;
}

interface MenuItemWithoutControlProps extends MenuItemBaseProps {
    controlType?: undefined;
    checked?: undefined;
}

interface MenuItemWithControlProps extends MenuItemBaseProps {
    controlType?: 'checkbox';
    checked?: boolean;
}

type MenuItemProps = ExclusifyUnion<MenuItemWithControlProps | MenuItemWithoutControlProps>;

export const MenuItem = ({
    label,
    Icon,
    destructive,
    disabled,
    onPress,
    controlType,
    checked,
    dataAttributes,
}: MenuItemProps): JSX.Element => {
    const {focusedItem, setFocusedItem, closeMenu, isMenuOpen} = useMenuContext();
    const itemRef = React.useRef<HTMLDivElement | null>(null);

    const contentColor = destructive ? vars.colors.textLinkDanger : vars.colors.neutralHigh;

    const item = itemRef?.current;
    const menu: HTMLElement | null = item?.closest('[role=menu]') || null;
    const itemIndex = getItemIndexInMenu(menu, item);

    const menuItemDataAttributes = {testid: 'MenuItem', ...dataAttributes};

    const renderContent = () =>
        controlType === 'checkbox' ? (
            <Checkbox
                ref={itemRef}
                name={label}
                checked={checked}
                onChange={() => {
                    if (isMenuOpen && itemIndex !== null) {
                        onPress(itemIndex);
                        closeMenu();
                    }
                }}
                disabled={disabled}
                role="menuitemcheckbox"
                dataAttributes={menuItemDataAttributes}
                render={({controlElement}) => (
                    <Box paddingX={8} paddingY={12}>
                        <Inline space="between" alignItems="center">
                            <div className={styles.itemContent}>
                                {Icon && (
                                    <div className={styles.iconContainer}>
                                        <Icon size={24} color={contentColor} />
                                    </div>
                                )}
                                <Text3 regular color={contentColor}>
                                    {label}
                                </Text3>
                            </div>
                            <Box paddingLeft={16}>{controlElement}</Box>
                        </Inline>
                    </Box>
                )}
            />
        ) : (
            <Touchable
                ref={itemRef}
                onPress={() => {
                    if (isMenuOpen && itemIndex !== null) {
                        onPress(itemIndex);
                        closeMenu();
                    }
                }}
                disabled={disabled}
                role="menuitem"
                dataAttributes={menuItemDataAttributes}
            >
                <Box paddingX={8} paddingY={12}>
                    <div className={styles.itemContent}>
                        {Icon && (
                            <div className={styles.iconContainer}>
                                <Icon size={24} color={contentColor} />
                            </div>
                        )}
                        <Text3 regular color={contentColor}>
                            {label}
                        </Text3>
                    </div>
                </Box>
            </Touchable>
        );

    return (
        <div
            className={classnames(styles.menuItem, {
                [styles.menuItemEnabled]: !disabled,
                [styles.menuItemDisabled]: disabled,
                [styles.menuItemHovered]: !disabled && itemIndex !== null && focusedItem === itemIndex,
            })}
            onMouseMove={() => setFocusedItem(disabled ? null : itemIndex)}
            onMouseLeave={() => setFocusedItem(null)}
        >
            {renderContent()}
        </div>
    );
};

type MenuSectionProps = {
    children?: React.ReactNode;
};

export const MenuSection = ({children}: MenuSectionProps): JSX.Element => {
    return children ? (
        <>
            {children}
            <div className={styles.menuSectionDivider}>
                <Divider />
            </div>
        </>
    ) : (
        <></>
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

export const Menu = ({
    renderTarget,
    renderMenu,
    width,
    position = 'left',
    dataAttributes,
}: MenuProps): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [target, setTarget] = React.useState<HTMLElement | null>(null);
    const [menu, setMenu] = React.useState<HTMLElement | null>(null);
    const [focusedItem, setFocusedItem] = React.useState<number | null>(null);
    const [isOpenedwithKeyboard, setIsOpenedwithKeyboard] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement | null>(null);

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

        const isMenuOnBottom =
            menuFitsOnBottom || (!menuFitsOnTop && availableSpaceOnBottom > availableSpaceOnTop);

        if (isMenuOnBottom) {
            setItemsComputedProps({
                left: leftDirection,
                right: rightDirection,
                top: `${bottomTargetWithOffset}px`,
                bottom: 'auto',
                maxHeight: menuFitsOnBottom ? undefined : availableSpaceOnBottom,
                transformOrigin: 'center top',
            });
        } else {
            setItemsComputedProps({
                left: leftDirection,
                right: rightDirection,
                top: 'auto',
                bottom: `${windowSize.height - topTargetWithOffset}px`,
                maxHeight: menuFitsOnTop ? undefined : availableSpaceOnTop,
                transformOrigin: 'center bottom',
            });
        }
    }, [position, isMenuOpen, menu, target, width, windowSize]);

    const targetProps = React.useMemo(
        () => ({
            ref: setTarget,
            onPress: () => {
                if (isMenuOpen) setIsMenuOpen(false);
                else setIsMenuOpen(true);
            },
        }),
        [setTarget, isMenuOpen]
    );

    const menuProps = {
        ref: combineRefs(setMenu, menuRef),
        className: styles.menuContainer,
        close: () => setIsMenuOpen(false),
    };

    const setFirstFocusableItem = React.useCallback(() => {
        const items = getMenuItems(menu);
        const nextItem = items.findIndex((item) => !item.getAttribute('aria-disabled'));
        setFocusedItem(nextItem < 0 ? null : nextItem);
    }, [menu]);

    const setNextFocusableItem = React.useCallback(
        (reverse?: boolean) => {
            const items = getMenuItems(menu);
            if (reverse) {
                items.reverse();
            }
            const currentItem =
                focusedItem === null ? -1 : reverse ? items.length - 1 - focusedItem : focusedItem;

            let nextItem = items.findIndex(
                (item, index) => !item.getAttribute('aria-disabled') && index > currentItem
            );
            if (nextItem === -1) {
                nextItem = items.findIndex((item) => !item.getAttribute('aria-disabled'));
            }

            const nextFocusedItem = reverse && nextItem !== -1 ? items.length - 1 - nextItem : nextItem;
            setFocusedItem(nextFocusedItem < 0 ? null : nextFocusedItem);
            items[nextItem]?.focus();
        },
        [focusedItem, menu]
    );

    React.useEffect(() => {
        if (!isMenuOpen) {
            setFocusedItem(null);
        } else if (isOpenedwithKeyboard && menu) {
            setFirstFocusableItem();
            setIsOpenedwithKeyboard(false);
        }
    }, [isMenuOpen, setFirstFocusableItem, isOpenedwithKeyboard, menu]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isMenuOpen) {
                switch (e.key) {
                    case RIGHT:
                    case DOWN:
                        cancelEvent(e);
                        setNextFocusableItem();
                        break;
                    case LEFT:
                    case UP:
                        cancelEvent(e);
                        setNextFocusableItem(true);
                        break;
                    case ESC:
                        setIsMenuOpen(false);
                        break;
                    case SPACE:
                    case ENTER:
                        cancelEvent(e);
                        if (focusedItem !== null) {
                            getMenuItems(menu)[focusedItem].click();
                        }
                        break;
                    case TAB:
                        cancelEvent(e);
                        break;

                    default:
                    // do nothing
                }
            } else {
                switch (e.key) {
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

    React.useEffect(() => {
        target?.setAttribute('aria-haspopup', 'menu');
        target?.setAttribute('aria-expanded', String(isMenuOpen));
    }, [target, isMenuOpen]);

    return (
        <div {...getPrefixedDataAttributes(dataAttributes, 'Menu')}>
            {renderTarget({...targetProps, isMenuOpen})}

            <Portal>
                <CSSTransition
                    in={isMenuOpen}
                    nodeRef={menuRef}
                    timeout={isRunningAcceptanceTest() ? 0 : MENU_TRANSITION_DURATION_IN_MS}
                    classNames={styles.menuTransitionClasses}
                    mountOnEnter
                    unmountOnExit
                    onExit={() => target?.focus()}
                >
                    <Overlay
                        onPress={(e) => {
                            cancelEvent(e);
                            setIsMenuOpen(false);
                        }}
                        disableScroll
                    >
                        <div
                            style={{
                                ...applyCssVars({
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
                                                  [styles.vars.maxHeight]:
                                                      `${itemsComputedProps.maxHeight}px`,
                                              }),

                                              ...(width !== undefined && {
                                                  [styles.vars.width]: width ? `${width}px` : '',
                                              }),
                                          }
                                        : {}),
                                }),
                            }}
                            role="menu"
                        >
                            <MenuContext.Provider
                                value={{
                                    isMenuOpen,
                                    focusedItem,
                                    setFocusedItem,
                                    closeMenu: () => setIsMenuOpen(false),
                                }}
                            >
                                {renderMenu(menuProps)}
                            </MenuContext.Provider>
                        </div>
                    </Overlay>
                </CSSTransition>
            </Portal>
        </div>
    );
};
