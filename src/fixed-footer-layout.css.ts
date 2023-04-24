import {createVar, fallbackVar, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

const footerHeight = createVar();
const backgroundColor = createVar();

export const vars = {footerHeight, backgroundColor};

export const footer = style([
    sprinkles({
        width: '100%',
        background: skinVars.colors.background,
    }),
    {
        transition: 'box-shadow 0.2s linear',
    },
]);

export const fixedFooter = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            position: 'fixed',
            left: 0,
            bottom: 0,
            zIndex: 1,
        },
    },
});

export const elevated = style([
    sprinkles({
        background: skinVars.colors.backgroundContainer,
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                boxShadow: '0 -2px 8px 0 rgba(0, 0, 0, 0.10)',
            },
        },
    },
]);

export const withoutFooter = sprinkles({display: 'none'});

export const container = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingBottom: footerHeight,
            background: fallbackVar(backgroundColor, skinVars.colors.background),
        },
    },
});
