import {createVar, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

const top = createVar();
const bottom = createVar();
const left = createVar();
const width = createVar();
const right = createVar();
const maxHeight = createVar();
const transformOrigin = createVar();

const MENU_MIN_WIDTH = 136;
const MENU_MAX_WIDTH = 280;

export const vars = {
    top,
    bottom,
    left,
    right,
    width,
    maxHeight,
    transformOrigin,
};

export const menuContainer = style([
    sprinkles({
        padding: 8,
        background: skinVars.colors.backgroundContainer,
        borderRadius: skinVars.borderRadii.popup,
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
    }),
    {
        top,
        bottom,
        left,
        right,
        width,
        minWidth: MENU_MIN_WIDTH,
        maxWidth: MENU_MAX_WIDTH,
        maxHeight,
        transformOrigin,
        listStyleType: 'none',
        margin: 0,
        overflowY: 'auto',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    },
]);

export const menuTransitionClasses = {
    enter: style({
        opacity: 0,
        transform: 'scale(0)',
    }),
    enterActive: style({
        opacity: 1,
        transform: 'scale(1)',
        transition: 'opacity .12s linear,transform .12s cubic-bezier(0,0,.2,1)',
    }),
    exit: style({
        opacity: 1,
    }),
    exitActive: style({
        opacity: 0,
        transition: 'opacity .12s linear',
    }),
};

export const menuItem = style({
    userSelect: 'none',
    transition: 'background-color 0.1s ease-in-out',
    borderRadius: skinVars.borderRadii.popup,
    backgroundColor: 'transparent',
    '@media': {
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
});

export const menuItemHovered = style({
    transition: 'background-color 0.1s ease-in-out',
    backgroundColor: skinVars.colors.backgroundContainerHover,
    ':active': {
        backgroundColor: skinVars.colors.backgroundContainerPressed,
    },
    '@media': {
        [mq.touchableOnly]: {
            backgroundColor: 'transparent',
            transition: 'none',
        },
    },
});

export const menuItemEnabled = style({
    '@media': {
        [mq.touchableOnly]: {
            selectors: {
                '&:active:not([menuItemDisabled])': {
                    backgroundColor: skinVars.colors.backgroundContainerPressed,
                },
            },
        },
    },
});

export const menuItemDisabled = style({
    userSelect: 'none',
    opacity: 0.5,
});

export const menuSectionDivider = style([
    sprinkles({paddingY: 8}),
    {
        ':last-child': {
            display: 'none',
        },
    },
]);

export const itemContent = style({
    display: 'flex',
    alignItems: 'center',
});

export const iconContainer = style({
    display: 'flex',
    paddingRight: 8,
});
