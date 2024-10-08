import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const disabled = style({
    opacity: 0.5,
});

export const row = sprinkles({
    width: '100%',
});

export const touchableBackground = style({
    transition: 'background-color 0.1s ease-in-out',
    ':active': {
        background: vars.colors.backgroundContainerPressed,
    },
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: vars.colors.backgroundContainerHover,
            },
            ':active': {
                background: vars.colors.backgroundContainerPressed,
            },
        },
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
});

export const touchableBackgroundInverse = style({
    transition: 'background-color 0.1s ease-in-out',
    ':active': {
        background: vars.colors.backgroundContainerBrandPressed,
    },
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: vars.colors.backgroundContainerBrandHover,
            },
            ':active': {
                background: vars.colors.backgroundContainerBrandPressed,
            },
        },
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
});

export const pointer = sprinkles({cursor: 'pointer'});

export const rowContent = sprinkles({
    width: '100%',
    border: 'none',
    background: 'transparent',
    padding: 0,
    display: 'block',
    height: '100%',
});

export const content = sprinkles({
    display: 'flex',
    width: '100%',
    minHeight: 72,
});

export const asset = sprinkles({
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
});

export const rowBody = sprinkles({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});

export const center = sprinkles({
    display: 'flex',
    alignItems: 'center',
});

export const badge = style([
    center,
    sprinkles({
        justifyContent: 'center',
        minWidth: 16,
        height: '100%',
        flexShrink: 0,
    }),
]);

export const rightContent = style({display: 'flex', marginLeft: 16});
export const rightRestrictedWidth = style({maxWidth: '40%'});

export const detailRight = style({paddingLeft: 8});

export const detail = style([center, {textAlign: 'right'}]);

export const dualActionContainer = sprinkles({
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
});

const dualActionBase = sprinkles({padding: 0, border: 'none', background: 'transparent'});

export const dualActionLeft = style([
    dualActionBase,
    sprinkles({
        display: 'block',
        flexGrow: 1,
        paddingX: 16,
    }),
]);

export const dualActionDivider = style([
    sprinkles({display: 'flex'}),
    {
        margin: '16px 0',
        borderLeft: `1px solid ${vars.colors.divider}`,
    },
]);

export const dualActionRight = style([
    dualActionBase,
    sprinkles({
        paddingX: 16,
        display: 'flex',
        alignItems: 'center',
        flexGrow: 0,
        width: 'auto',
        height: '100%',
    }),
    {
        lineHeight: 0,
    },
]);
