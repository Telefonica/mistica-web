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

export const unitContainer = sprinkles({
    display: 'inline-flex',
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

const baseBoxedTimerValueContainer = style([
    sprinkles({
        paddingX: 4,
        paddingY: 8,
        borderRadius: vars.borderRadii.container,
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
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
