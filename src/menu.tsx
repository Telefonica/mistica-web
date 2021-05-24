import * as React from 'react';
import classNames from 'classnames';
import {ESC, TAB, DOWN, ENTER, SPACE, UP} from './utils/key-codes';
import Overlay from './overlay';
import {createUseStyles} from './jss';
import {cancelEvent} from './utils/dom';

const MAX_HEIGHT_DEFAULT = 416;

const useMenuItemStyles = createUseStyles((theme) => ({
    menuItemSelected: {
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
    },
    menuItem: {
        color: theme.colors.textPrimary,
        lineHeight: 1.5,
        padding: '6px 16px',
        minHeight: 48,
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
}));

export type MenuItemProps = {
    children?: React.ReactNode;
    selected?: boolean;
    hovered?: boolean;
    value: string;
    onPress?: (value: string) => void;
    render?: (value: string, selected?: boolean) => React.ReactNode;
};

export const MenuItem: React.FC<MenuItemProps> = ({children, value, selected, hovered, render, onPress}) => {
    const classes = useMenuItemStyles();

    return (
        <li
            role="option"
            aria-selected={selected}
            key={value}
            data-value={value}
            className={classNames(classes.menuItem, {
                [classes.menuItemSelected]: hovered || selected,
            })}
            onPointerDown={cancelEvent}
            onClick={() => onPress?.(value)}
        >
            {children ?? render?.(value, selected) ?? value}
        </li>
    );
};

type MenuContextState = {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    target: HTMLElement | null;
    setTarget: (target: HTMLElement) => void;
    menu: HTMLElement | null;
    setMenu: (target: HTMLElement) => void;
};

const MenuContext = React.createContext<MenuContextState>({
    isMenuOpen: false,
    setIsMenuOpen: () => {},
    target: null,
    setTarget: () => {},
    menu: null,
    setMenu: () => {},
});

export const MenuProvider: React.FC = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [target, setTarget] = React.useState<HTMLElement | null>(null);
    const [menu, setMenu] = React.useState<HTMLElement | null>(null);

    return (
        <MenuContext.Provider value={{target, setTarget, menu, setMenu, isMenuOpen, setIsMenuOpen}}>
            {children}
        </MenuContext.Provider>
    );
};

const useStyles = createUseStyles(({colors}) => ({
    menuContainer: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        position: 'absolute',
        top: ({itemsComputedProps}) => itemsComputedProps.top,
        left: ({itemsComputedProps}) => itemsComputedProps.left,
        width: ({itemsComputedProps}) => itemsComputedProps.width,
        borderRadius: 4,
        boxShadow:
            '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        backgroundColor: colors.backgroundContainer,
        transformOrigin: ({itemsComputedProps}) => itemsComputedProps.transformOrigin,
        transition: 'opacity .03s linear,transform .12s cubic-bezier(0,0,.2,1) .15s',
        opacity: ({animateShowItems}) => (animateShowItems ? 1 : 0),
        transform: ({animateShowItems}) => (animateShowItems ? 'scale(1)' : 'scale(0)'),
        maxHeight: ({itemsComputedProps}) => itemsComputedProps.maxHeight,
        overflowY: 'auto',
    },
}));

type Target = {
    ref: React.RefCallback<HTMLElement>;
    onPress: (event: React.MouseEvent | React.KeyboardEvent) => void;
};

type Menu = {
    ref: React.RefCallback<HTMLElement>;
    className: string;
};

export const useMenu = (): {
    menuProps: Menu;
    targetProps: Target;
    closeMenu: () => void;
    isMenuOpen: boolean;
} => {
    const [animateShowItems, setAnimateShowItems] = React.useState(false);
    const {target, setTarget, menu, setMenu, isMenuOpen, setIsMenuOpen} = React.useContext(MenuContext);
    const [itemsComputedProps, setItemsComputedProps] = React.useState({});

    React.useEffect(() => {
        const targetRect = target?.getBoundingClientRect();

        if (!menu || !targetRect || !isMenuOpen) {
            setAnimateShowItems(false);
            return;
        }

        const MARGIN_THRESHOLD = 12;
        const {top: selectTop, width, left, height} = targetRect;
        const top = selectTop + height;
        const spaceTaken = parseInt(window.getComputedStyle(menu).getPropertyValue('height')) ?? 0;

        // if it doesn't fit on bottom
        if (top + spaceTaken + MARGIN_THRESHOLD > window.innerHeight) {
            const availableSpaceBottom = window.innerHeight - top;
            if (selectTop /* this is the available space on top */ > availableSpaceBottom) {
                const newTop = selectTop - spaceTaken;
                setItemsComputedProps({
                    width,
                    left,
                    top: Math.max(newTop, MARGIN_THRESHOLD),
                    maxHeight: selectTop - MARGIN_THRESHOLD,
                    transformOrigin: 'center bottom',
                });
            } else {
                setItemsComputedProps({
                    width,
                    top,
                    left,
                    maxHeight: Math.min(window.innerHeight - top - MARGIN_THRESHOLD, MAX_HEIGHT_DEFAULT),
                    transformOrigin: 'center top',
                });
            }
        } else {
            // if it fits on bottom
            setItemsComputedProps({
                width,
                top,
                left,
                maxHeight: Math.min(window.innerHeight - top - MARGIN_THRESHOLD, MAX_HEIGHT_DEFAULT),
                transformOrigin: 'center top',
            });
        }

        if (isMenuOpen) {
            requestAnimationFrame(() => {
                setAnimateShowItems(true);
            });
        }
    }, [isMenuOpen, menu, target]);

    const classes = useStyles({
        itemsComputedProps,
        animateShowItems,
    });

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
            className: classes.menuContainer,
        }),
        [classes.menuContainer, setMenu]
    );

    return React.useMemo(
        () => ({
            isMenuOpen,
            targetProps,
            menuProps,
            closeMenu: () => {
                setIsMenuOpen(false);
            },
        }),
        [isMenuOpen, targetProps, menuProps, setIsMenuOpen]
    );
};

type MenuItemsProps = {
    items: ReadonlyArray<{
        readonly value: string;
        readonly text: string;
    }>;
    renderItem: ({text, value}: {text: string; value: string}) => React.ReactNode;
    onSelect: (value: string) => void;
};

export const MenuItems: React.FC<MenuItemsProps> = ({renderItem, items, onSelect}) => {
    const {isMenuOpen, closeMenu, menuProps} = useMenu();
    const [cursorIndex, setCursorIndex] = React.useState<number | undefined>();

    React.useEffect(() => {
        const updateCursorIndex = (e: KeyboardEvent) => {
            const keyToOperand: Record<number, 1 | -1 | undefined> = {[UP]: -1, [DOWN]: 1};
            const operand = keyToOperand[e.keyCode];
            if (operand) {
                cancelEvent(e);
                const newIndex = cursorIndex !== undefined ? cursorIndex + operand : 0;

                setCursorIndex(newIndex);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isMenuOpen) {
                if (e.keyCode === TAB) {
                    cancelEvent(e);
                }
                if (e.keyCode === ENTER || e.keyCode === SPACE) {
                    cancelEvent(e);
                    if (cursorIndex !== undefined) {
                        onSelect(items[cursorIndex].value);
                    }
                    closeMenu?.();
                }
            }
            // so we don't change the cursorIndex while menu is closing
            if (isMenuOpen) {
                updateCursorIndex(e);
            }
        };
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    });

    return isMenuOpen ? (
        <Overlay
            onPress={(e) => {
                closeMenu();
                cancelEvent(e);
            }}
            disableScroll
        >
            <ul {...menuProps} role="listbox" tabIndex={-1}>
                {items.map(({value, text}, index) => {
                    const Item = renderItem({text, value});
                    return React.isValidElement(Item)
                        ? React.cloneElement(Item, {
                              onPress: () => {
                                  onSelect(value);
                              },
                              hovered: index === cursorIndex,
                          })
                        : null;
                })}
            </ul>
        </Overlay>
    ) : null;
};

type MenuTargetProps = {
    render: (target: Target & {isMenuOpen: boolean}) => React.ReactElement<any>;
};

export const MenuTarget: React.FC<MenuTargetProps> = ({render}) => {
    const {targetProps, isMenuOpen} = useMenu();
    return render({...targetProps, isMenuOpen});
};

export type MenuProps = {
    children: React.ReactNode;
};

const Menu: React.FC<MenuProps> = ({children}) => {
    const {isMenuOpen, setIsMenuOpen} = React.useContext(MenuContext);

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

    return <>{children}</>;
};

export default Menu;
