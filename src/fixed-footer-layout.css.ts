import {createVar, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

const footerHeight = createVar();
const backgroundColor = createVar();

export const vars = {footerHeight, backgroundColor};

export const footer = style([
    sprinkles({
        width: '100%',
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
            boxShadow: '0 -2px 8px 0 rgba(0, 0, 0, 0)', // without this chrome mobile shows strange artifacts in the shadow animation
        },
    },
});

export const elevated = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            background: skinVars.colors.backgroundContainer,
            boxShadow: '0 -2px 8px 0 rgba(0, 0, 0, 0.10)',
        },
    },
});

export const withoutFooter = sprinkles({display: 'none'});

export const container = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            isolation: 'isolate',
            paddingBottom: footerHeight,
        },
    },
});

export const portal = style([
    sprinkles({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed',
    }),
    {
        zIndex: -1, // Render below everything, including other portals
    },
]);

export const fixedBackgroundLayer = style([
    sprinkles({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed',
    }),
    {
        zIndex: -3,
        '@media': {
            [mq.desktopOrBigger]: {
                display: 'none',
            },
        },
    },
]);

export const absoluteBackgroundLayer = style([
    sprinkles({
        left: 0,
        right: 0,
        position: 'absolute',
    }),
    {
        zIndex: -1,
        '@media': {
            [mq.desktopOrBigger]: {
                display: 'none',
            },
        },
    },
]);
