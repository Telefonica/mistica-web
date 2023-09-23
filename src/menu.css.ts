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
        transition: 'opacity .12s linear,transform .12s cubic-bezier(0,0,.2,1) .15s',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    },
]);

export const showItems = style({
    opacity: 1,
    transform: 'scale(1)',
});

export const hideItems = style({
    opacity: 0,
    transform: 'scale(0)',
});

export const menuItem = style({
    userSelect: 'none',
    transition: 'background-color 0.15s ease-in-out',
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                backgroundColor: skinVars.colors.backgroundContainerHover,
            },
            ':active': {
                backgroundColor: skinVars.colors.backgroundContainerPressed,
            },
        },
    },
});

export const menuItemDisabled = style({
    userSelect: 'none',
    opacity: 0.5,
});

export const menuSectionDivider = style({
    ':last-child': {
        display: 'none',
    },
});
