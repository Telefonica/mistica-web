import * as React from 'react';
import {ESC, TAB} from './utils/key-codes';
import {createUseStyles} from './jss';
import {cancelEvent} from './utils/dom';
import Overlay from './overlay';

const MAX_HEIGHT_DEFAULT = 416;

const useStyles = createUseStyles(({colors}) => ({
    menuContainer: {
        zIndex: 12,
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        position: 'absolute',
        top: ({itemsComputedProps}) => itemsComputedProps.top,
        bottom: ({itemsComputedProps}) => itemsComputedProps.bottom,
        right: ({itemsComputedProps}) => itemsComputedProps.right,
        width: ({width}) => width ?? '100%',
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
};

const Menu: React.FC<MenuProps> = ({renderTarget, renderMenu, width, position = 'left'}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [target, setTarget] = React.useState<HTMLElement | null>(null);
    const [menu, setMenu] = React.useState<HTMLElement | null>(null);

    const [animateShowItems, setAnimateShowItems] = React.useState(false);
    const [itemsComputedProps, setItemsComputedProps] = React.useState({});

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

    const classes = useStyles({
        itemsComputedProps,
        animateShowItems,
        width,
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
            close: () => {
                setIsMenuOpen(false);
            },
        }),
        [classes.menuContainer, setMenu]
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
        <div style={{position: 'relative'}}>
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
