import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';
import {vars} from './skins/skin-contract.css';

export const timerWrapper = style([
    sprinkles({
        display: 'inline-block',
    }),
    {
        textDecoration: 'inherit',
    },
]);

export const content = style([
    sprinkles({
        display: 'inline-flex',
    }),
    {
        flexWrap: 'wrap',
        whiteSpace: 'break-spaces',
        textDecoration: 'inherit',
    },
]);

export const unitContainer = sprinkles({
    display: 'flex',
    justifyContent: 'center',
});

export const timerDisplayValue = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }),
    {
        minWidth: pxToRem(64),
        '@media': {
            [mq.tabletOrSmaller]: {
                minWidth: pxToRem(56),
            },
        },
    },
]);

export const timerDisplayValueContainer = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }),
    {
        minWidth: pxToRem(64),
        '@media': {
            [mq.tabletOrSmaller]: {
                minWidth: pxToRem(56),
            },
        },
    },
]);

const baseBoxedTimerValueContainer = style([
    sprinkles({
        padding: 8,
        borderRadius: vars.borderRadii.container,
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 10,
                paddingBottom: 10,
            },
        },
    },
]);

export const boxedTimerValueContainer = style([
    baseBoxedTimerValueContainer,
    sprinkles({
        background: vars.colors.brandLow,
    }),
]);

export const boxedTimerValueContainerInverse = style([
    baseBoxedTimerValueContainer,
    sprinkles({
        background: vars.colors.backgroundContainer,
    }),
]);
