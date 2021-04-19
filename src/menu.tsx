import * as React from 'react';
import {ESC, TAB} from './utils/key-codes';
import Overlay from './overlay';
import {createUseStyles} from './jss';
import {cancelEvent} from './utils/dom';

const MAX_HEIGHT_DEFAULT = 416;

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

        const MARGIN_TOP_SIZE = 12;
        const {top: selectTop, width, left, height} = targetRect;
        const top = selectTop + height;
        const spaceTaken = parseInt(window.getComputedStyle(menu).getPropertyValue('height')) ?? 0;

        // if it doesn't fit on bottom
        if (top + spaceTaken + MARGIN_TOP_SIZE > window.innerHeight) {
            const availableSpaceBottom = window.innerHeight - top;
            if (selectTop /* this is the available space on top */ > availableSpaceBottom) {
                const newTop = selectTop - spaceTaken;
                setOptionsComputedProps({
                    width,
                    left,
                    top: Math.max(newTop, MARGIN_TOP_SIZE),
                    maxHeight: selectTop - MARGIN_TOP_SIZE,
                    transformOrigin: 'center bottom',
                });
            } else {
                setOptionsComputedProps({
                    width,
                    top,
                    left,
                    maxHeight: window.innerHeight - top - MARGIN_TOP_SIZE,
                    transformOrigin: 'center top',
                });
            }
        } else {
            // if it fits on bottom
            setOptionsComputedProps({
                width,
                top,
                left,
                maxHeight: Math.min(window.innerHeight - top - MARGIN_TOP_SIZE, MAX_HEIGHT_DEFAULT),
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
