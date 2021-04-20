import * as React from 'react';
import classNames from 'classnames';
import {ESC, TAB, DOWN, ENTER, SPACE, UP} from './utils/key-codes';
import Overlay from './overlay';
import {createUseStyles} from './jss';
import {cancelEvent} from './utils/dom';

const MAX_HEIGHT_DEFAULT = 416;

const useStylesMenuOption = createUseStyles((theme) => ({
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

export type MenuOptionProps = {
    selected?: boolean;
    hover?: boolean;
    value: string;
    text: string;
    onPress: (value: string) => void;
    renderOption?: (text: string, value: string, selected?: boolean) => React.ReactNode;
};

export const MenuOption: React.FC<MenuOptionProps> = ({
    value,
    text,
    selected,
    hover,
    renderOption,
    onPress,
}) => {
    const classes = useStylesMenuOption();

    return (
        <li
            role="option"
            aria-selected={selected}
            key={value}
            data-value={value}
            className={classNames(classes.menuItem, {
                [classes.menuItemSelected]: hover || selected,
            })}
            onPointerDown={cancelEvent}
            onClick={() => onPress(value)}
        >
            {renderOption ? renderOption(text, value, selected) : text}
        </li>
    );
};

type MenuItemsProps = {
    menuProps: {
        ref: React.RefCallback<HTMLElement>;
        className: string;
    };
    renderItem: ({
        index,
        cursorIndex,
        text,
        value,
    }: {
        index: number;
        cursorIndex: number | null;
        text: string;
        value: string;
    }) => React.ReactElement<typeof MenuOption>;
    options: ReadonlyArray<{
        readonly value: string;
        readonly text: string;
    }>;
    initialIndex?: number | null;
    isOpen: boolean;
    closeMenu?: () => void;
    onItemSelectIndex: (index: number) => void;
};

export const MenuItems: React.FC<MenuItemsProps> = ({
    renderItem,
    menuProps,
    options,
    initialIndex,
    isOpen,
    closeMenu,
    onItemSelectIndex,
}) => {
    const [cursorIndex, setCursorIndex] = React.useState<number | null>(initialIndex || null);

    React.useEffect(() => {
        const updateCursorIndex = (e: KeyboardEvent) => {
            const keyToOperand: Record<number, 1 | -1 | undefined> = {[UP]: -1, [DOWN]: 1};
            const operand = keyToOperand[e.keyCode];
            if (operand) {
                cancelEvent(e);
                const newIndex = cursorIndex !== null ? cursorIndex + operand : 0;

                setCursorIndex(newIndex);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen) {
                if (e.keyCode === TAB) {
                    cancelEvent(e);
                }
                if (e.keyCode === ENTER || e.keyCode === SPACE) {
                    cancelEvent(e);
                    if (cursorIndex !== null) {
                        onItemSelectIndex(cursorIndex);
                    }
                    closeMenu?.();
                }
            }
            // so we don't change the cursorIndex while menu is closing
            if (isOpen) {
                updateCursorIndex(e);
            }
        };
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    });

    return (
        <ul {...menuProps} role="listbox" tabIndex={-1}>
            {options.map(({value, text}, index) => renderItem({index, cursorIndex, text, value}))}
        </ul>
    );
};

type MenuContextState = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const MenuContext = React.createContext<MenuContextState>({
    isOpen: false,
    setIsOpen: () => {},
});

export const MenuProvider: React.FC = ({children}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return <MenuContext.Provider value={{isOpen, setIsOpen}}>{children}</MenuContext.Provider>;
};

const useStyles = createUseStyles(({colors}) => ({
    menuContainer: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        position: 'absolute',
        top: ({optionsComputedProps}) => optionsComputedProps.top,
        left: ({optionsComputedProps}) => optionsComputedProps.left,
        width: ({optionsComputedProps}) => optionsComputedProps.width,
        borderRadius: 4,
        boxShadow:
            '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        backgroundColor: colors.backgroundContainer,
        transformOrigin: ({optionsComputedProps}) => optionsComputedProps.transformOrigin,
        transition: 'opacity .03s linear,transform .12s cubic-bezier(0,0,.2,1) .15s',
        opacity: ({animateShowOptions}) => (animateShowOptions ? 1 : 0),
        transform: ({animateShowOptions}) => (animateShowOptions ? 'scale(1)' : 'scale(0)'),
        maxHeight: ({optionsComputedProps}) => optionsComputedProps.maxHeight,
        overflowY: 'auto',
    },
}));

export const useMenu = (): {
    menuProps: {
        ref: React.RefCallback<HTMLElement>;
        className: string;
    };
    targetProps: {
        ref: React.RefCallback<HTMLElement>;
        onPress: (event: React.MouseEvent | React.KeyboardEvent) => void;
    };
    closeMenu: () => void;
    isOpen: boolean;
} => {
    const [animateShowOptions, setAnimateShowOptions] = React.useState(false);
    const {isOpen, setIsOpen} = React.useContext(MenuContext);
    const [target, setTarget] = React.useState<HTMLElement | null>(null);
    const [menu, setMenu] = React.useState<Element | null>(null);
    const [optionsComputedProps, setOptionsComputedProps] = React.useState({});

    React.useEffect(() => {
        const targetRect = target?.getBoundingClientRect();

        if (!menu || !targetRect || !isOpen) {
            setAnimateShowOptions(false);
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
                setOptionsComputedProps({
                    width,
                    left,
                    top: Math.max(newTop, MARGIN_THRESHOLD),
                    maxHeight: selectTop - MARGIN_THRESHOLD,
                    transformOrigin: 'center bottom',
                });
            } else {
                setOptionsComputedProps({
                    width,
                    top,
                    left,
                    maxHeight: window.innerHeight - top - MARGIN_THRESHOLD,
                    transformOrigin: 'center top',
                });
            }
        } else {
            // if it fits on bottom
            setOptionsComputedProps({
                width,
                top,
                left,
                maxHeight: Math.min(window.innerHeight - top - MARGIN_THRESHOLD, MAX_HEIGHT_DEFAULT),
                transformOrigin: 'center top',
            });
        }

        if (isOpen) {
            requestAnimationFrame(() => {
                setAnimateShowOptions(true);
            });
        }
    }, [isOpen, menu, target]);

    const classes = useStyles({
        optionsComputedProps,
        animateShowOptions,
    });

    const targetProps = React.useMemo(
        () => ({
            ref: setTarget,
            onPress: () => setIsOpen(!isOpen),
        }),
        [setIsOpen, isOpen]
    );

    const menuProps = React.useMemo(
        () => ({
            ref: setMenu,
            className: classes.menuContainer,
        }),
        [classes]
    );

    return React.useMemo(
        () => ({
            isOpen,
            targetProps,
            menuProps,
            closeMenu: () => {
                setIsOpen(false);
            },
        }),
        [isOpen, targetProps, menuProps, setIsOpen]
    );
};

export type MenuProps = {
    children: React.ReactNode;
};

const Menu: React.FC<MenuProps> = ({children}) => {
    const {isOpen, setIsOpen} = React.useContext(MenuContext);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen) {
                if (e.keyCode === TAB) {
                    cancelEvent(e);
                }
                if (e.keyCode === ESC) {
                    setIsOpen(false);
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    });

    return isOpen ? (
        <Overlay
            onPress={(e) => {
                setIsOpen(false);
                cancelEvent(e);
            }}
            disableScroll
        >
            {children}
        </Overlay>
    ) : null;
};

export default Menu;
