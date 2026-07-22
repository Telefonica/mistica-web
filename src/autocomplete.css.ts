import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars, vars as skinVars} from './skins/skin-contract.css';

export const optionListContainerPadding = 8;

export const autocompleteContainer = style([
    sprinkles({
        position: 'relative',
    }),
]);

export const optionsList = style([
    sprinkles({
        position: 'absolute',
        padding: optionListContainerPadding,
        borderRadius: vars.borderRadii.popup,
    }),
    {
        zIndex: 2,
        left: 0,
        right: 0,
        boxShadow: '0px 2px 4px 0px #00000033',
        marginTop: 0,
        backgroundColor: vars.colors.backgroundContainer,
        listStyle: 'none',
    },
]);

export const optionBaseItem = style([
    sprinkles({
        paddingX: 8,
        paddingY: 12,
    }),
    {
        borderRadius: `calc(${skinVars.borderRadii.popup} - ${optionListContainerPadding / 2}px)`,
        height: 48,
        userSelect: 'none',
        display: 'block',
    },
]);

export const optionItem = style([
    optionBaseItem,
    sprinkles({
        cursor: 'pointer',
    }),
    {
        selectors: {
            '&:hover': {
                backgroundColor: vars.colors.backgroundContainerHover,
            },
            '&:active': {
                backgroundColor: vars.colors.backgroundContainerPressed,
            },
        },
    },
]);

export const optionItemSelected = style({
    backgroundColor: vars.colors.backgroundContainerHover,
});
