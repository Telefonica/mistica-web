import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as colorsVars} from './skins/skin-contract.css';

export const menuContainer = style([
    sprinkles({
        padding: 0,
        background: colorsVars.colors.backgroundContainer,
        borderRadius: 8,
    }),
    {
        listStyleType: 'none',
        margin: 0,
        overflowY: 'auto',
        transition: 'opacity .03s linear,transform .12s cubic-bezier(0,0,.2,1) .15s',
        boxShadow:
            '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
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
