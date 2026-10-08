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
import {Text2, Text3} from './text';
import {vars} from './skins/skin-contract.css';
import Divider from './divider';
import Checkbox from './checkbox';
import {CSSTransition} from 'react-transition-group';
import {combineRefs} from './utils/common';
import {applyCssVars} from './utils/css';
import {isRunningAcceptanceTest} from './utils/platform';
import * as mediaStyles from './image.css';

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
    description?: string;
    Icon?: (props: IconProps) => JSX.Element;
    asset?: React.ReactElement;
    destructive?: boolean;
    disabled?: boolean;
    dataAttributes?: DataAttributes;
}

interface MenuItemOnPressProps extends MenuItemBaseProps {
    onPress: (item: number) => void;
    controlType?: 'checkbox';
    checked?: boolean;
    href?: undefined;
    to?: undefined;
}

interface MenuItemHrefProps extends MenuItemBaseProps {
    href: string;
    newTab?: boolean;
    loadOnTop?: boolean;
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    to?: undefined;
    controlType?: undefined;
    checked?: undefined;
}

interface MenuItemToProps extends MenuItemBaseProps {
    to: string;
    newTab?: boolean;
    fullPageOnWebView?: boolean;
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    href?: undefined;
    controlType?: undefined;
    checked?: undefined;
}

type MenuItemProps = ExclusifyUnion<MenuItemOnPressProps | MenuItemHrefProps | MenuItemToProps>;

export const MenuItem = ({
    label,
    Icon,
    asset,
    destructive,
    disabled,
    onPress,
    href,
    to,
    newTab,
    loadOnTop,
    fullPageOnWebView,
    onNavigate,
    controlType,
    checked,
    description,
    dataAttributes,
}: MenuItemProps): JSX.Element => {
    const {focusedItem, setFocusedItem, closeMenu, isMenuOpen} = useMenuContext();
    const itemRef = React.useRef<HTMLDivElement | null>(null);

    const contentColor = destructive ? vars.colors.textLinkDanger : vars.colors.neutralHigh;

    const item = itemRef?.current;
    const menu: HTMLElement | null = item?.closest('[role=menu]') || null;
    const itemIndex = getItemIndexInMenu(menu, item);

    const menuItemDataAttributes = {testid: 'MenuItem', ...dataAttributes};

    const renderTextContent = (id?: string) => (
        <div id={id} className={styles.itemTextContent}>
            <Text3 regular color={contentColor}>
                {label}
            </Text3>
            {description && (
                <Text2 regular color={vars.colors.textSecondary}>
                    {description}
                </Text2>
            )}
        </div>
    );

    const renderItemContent = (labelId?: string) => (
        <div className={styles.itemContent}>
            {(asset || Icon) && (
                <div
                    className={styles.assetContainer}
                    {...(asset ? getPrefixedDataAttributes({testid: 'asset'}) : {})}
                    style={
                        asset
                            ? applyCssVars({
                                  [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                              })
                            : undefined
                    }
                >
                    {asset || (Icon && <Icon size={24} color={contentColor} />)}
                </div>
            )}
            {renderTextContent(labelId)}
        </div>
    );

    const renderContent = () =>
        controlType === 'checkbox' ? (
            <Checkbox
                ref={itemRef}
                name={label}
                checked={checked}
                onChange={() => {
                    if (isMenuOpen && itemIndex !== null) {
                        onPress?.(itemIndex);
                    }
                }}
                disabled={disabled}
                role="menuitemcheckbox"
                dataAttributes={menuItemDataAttributes}
                render={({controlElement, labelId}) => (
                    <Box paddingX={8} paddingY={12}>
                        <Inline space="between" alignItems="center">
                            {renderItemContent(labelId)}
                            <Box paddingLeft={16}>{controlElement}</Box>
                        </Inline>
                    </Box>
                )}
            />
        ) : href ? (
            <Touchable
                ref={itemRef}
                href={href}
                newTab={newTab}
                loadOnTop={loadOnTop}
                onNavigate={() => {
                    closeMenu();
                    onNavigate?.();
                }}
                disabled={disabled}
                role="menuitem"
                dataAttributes={menuItemDataAttributes}
            >
                <Box paddingX={8} paddingY={12}>
                    {renderItemContent()}
                </Box>
            </Touchable>
        ) : to ? (
            <Touchable
                ref={itemRef}
                to={to}
                newTab={newTab}
                fullPageOnWebView={fullPageOnWebView}
                onNavigate={() => {
                    closeMenu();
                    onNavigate?.();
                }}
                disabled={disabled}
                role="menuitem"
                dataAttributes={menuItemDataAttributes}
            >
                <Box paddingX={8} paddingY={12}>
                    {renderItemContent()}
                </Box>
            </Touchable>
        ) : (
            <Touchable
                ref={itemRef}
                onPress={() => {
                    if (isMenuOpen && itemIndex !== null) {
                        onPress?.(itemIndex);
                        closeMenu();
                    }
                }}
                disabled={disabled}
                role="menuitem"
                dataAttributes={menuItemDataAttributes}
            >
                <Box paddingX={8} paddingY={12}>
                    {renderItemContent()}
                </Box>
            </Touchable>
        );

    return (
        <div
            className={classnames(styles.menuItem, {
                [styles.menuItemEnabled]: !disabled,
                [styles.menuItemDisabled]: disabled,
                [styles.menuItemHovered]:
                    !disabled && !destructive && itemIndex !== null && focusedItem === itemIndex,
                [styles.menuItemHoveredDestructive]:
                    !disabled && destructive && itemIndex !== null && focusedItem === itemIndex,
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

const MENU_OFFSET_FROM_TARGET = 8;
const REFLECTED_PLACEMENT = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'} as const;
const TRANSFORM_ORIGINS = {
    top: 'center bottom',
    bottom: 'center top',
    left: 'right center',
    right: 'left center',
} as const;

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
    /** Width in pixels, constrained to 136–280px and the viewport width. */
    width?: number;
    renderTarget: (props: TargetRenderProps) => React.ReactNode;
    renderMenu: (props: MenuRenderProps) => React.ReactNode;
    children?: void;
    dataAttributes?: DataAttributes;
} & ExclusifyUnion<
    | {
          /** @deprecated Use placement and alignment instead. */
          position?: 'left' | 'right';
      }
    | {
          placement?: 'top' | 'bottom' | 'left' | 'right';
          alignment?: 'start' | 'middle' | 'end';
      }
>;

export const Menu = ({
    renderTarget,
    renderMenu,
    width,
    position = 'left',
    placement = 'bottom',
    alignment = position === 'left' ? 'start' : 'end',
    dataAttributes,
}: MenuProps): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [target, setTarget] = React.useState<HTMLElement | null>(null);
    const [menu, setMenu] = React.useState<HTMLElement | null>(null);
    const [focusedItem, setFocusedItem] = React.useState<number | null>(null);
    const [isOpenedwithKeyboard, setIsOpenedwithKeyboard] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement | null>(null);

    const [itemsComputedProps, setItemsComputedProps] = React.useState<{
        left: number;
        top: number;
        maxHeight: number;
        transformOrigin: string;
    } | null>(null);

    const windowSize = useWindowSize();

    React.useEffect(() => {
        const targetRect = target?.getBoundingClientRect();

        if (!menu || !targetRect || !isMenuOpen) {
            return;
        }

        const availableSpace = {
            top: targetRect.top - MENU_OFFSET_FROM_TARGET,
            bottom: windowSize.height - targetRect.bottom - MENU_OFFSET_FROM_TARGET,
            left: targetRect.left - MENU_OFFSET_FROM_TARGET,
            right: windowSize.width - targetRect.right - MENU_OFFSET_FROM_TARGET,
        };
        const menuSize = placement === 'top' || placement === 'bottom' ? menu.scrollHeight : menu.offsetWidth;
        const candidateReflectedPlacement = REFLECTED_PLACEMENT[placement];
        let finalPlacement =
            availableSpace[placement] < menuSize &&
            availableSpace[candidateReflectedPlacement] > availableSpace[placement]
                ? candidateReflectedPlacement
                : placement;
        if (
            (finalPlacement === 'left' || finalPlacement === 'right') &&
            availableSpace[finalPlacement] < menu.offsetWidth
        ) {
            finalPlacement = availableSpace.bottom >= availableSpace.top ? 'bottom' : 'top';
        }

        const isVertical = finalPlacement === 'top' || finalPlacement === 'bottom';
        const maxHeight = Math.max(0, isVertical ? availableSpace[finalPlacement] : windowSize.height);
        const heightMenu = Math.min(menu.scrollHeight, maxHeight);
        const widthMenu = menu.offsetWidth;
        const targetStart = isVertical ? targetRect.left : targetRect.top;
        const targetSize = isVertical ? targetRect.width : targetRect.height;
        const alignmentSize = isVertical ? widthMenu : heightMenu;
        const alignmentOffset = alignment === 'start' ? 0 : alignment === 'end' ? 1 : 0.5;
        const alignedPosition = targetStart + (targetSize - alignmentSize) * alignmentOffset;
        const shiftedPosition = Math.max(
            0,
            Math.min(alignedPosition, (isVertical ? windowSize.width : windowSize.height) - alignmentSize)
        );
        const positions = {
            top: {left: shiftedPosition, top: targetRect.top - MENU_OFFSET_FROM_TARGET - heightMenu},
            bottom: {left: shiftedPosition, top: targetRect.bottom + MENU_OFFSET_FROM_TARGET},
            left: {left: targetRect.left - MENU_OFFSET_FROM_TARGET - widthMenu, top: shiftedPosition},
            right: {left: targetRect.right + MENU_OFFSET_FROM_TARGET, top: shiftedPosition},
        };

        setItemsComputedProps({
            ...positions[finalPlacement],
            maxHeight,
            transformOrigin: TRANSFORM_ORIGINS[finalPlacement],
        });
    }, [placement, alignment, isMenuOpen, menu, target, width, windowSize]);

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
        <div {...getPrefixedDataAttributes({testid: 'Menu', ...dataAttributes})}>
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
                                    [styles.vars.maxWidth]:
                                        `${Math.min(styles.MENU_MAX_WIDTH, Math.max(0, windowSize.width))}px`,
                                    ...(width && {
                                        [styles.vars.width]: `${width}px`,
                                    }),
                                    ...(itemsComputedProps
                                        ? {
                                              [styles.vars.top]: `${itemsComputedProps.top}px`,
                                              [styles.vars.left]: `${itemsComputedProps.left}px`,
                                              [styles.vars.maxHeight]: `${itemsComputedProps.maxHeight}px`,
                                              [styles.vars.transformOrigin]:
                                                  itemsComputedProps.transformOrigin,
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
