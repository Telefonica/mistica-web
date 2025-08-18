import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import {pxToRem} from './utils/css';

export const disabled = style({
    opacity: 0.5,
});

export const row = sprinkles({
    width: '100%',
});

export const boxed = style({});

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

export const rowContent = style([
    sprinkles({
        width: '100%',
        border: 'none',
        background: 'transparent',
        padding: 0,
        display: 'block',
        height: '100%',
        position: 'relative',
    }),
    {
        selectors: {
            [`${boxed} &:active`]: {
                // needed because we can't use overflow: hidden on the boxed container for the focus ring to be visible
                borderRadius: `calc(${vars.borderRadii.container} - 1px)`,
            },
            [`${boxed} &:hover`]: {
                // needed because we can't use overflow: hidden on the boxed container for the focus ring to be visible
                borderRadius: `calc(${vars.borderRadii.container} - 1px)`,
            },
        },
    },
]);

// Position the ScreenReaderOnly text in a natural place inside the row, this makes VoiceOver "focus" appear in a good position
export const screenReaderOnly = style({
    position: 'absolute',
    top: 16,
    left: 16,
    fontSize: pxToRem(16),
});

export const rowContentPadding = sprinkles({
    paddingX: 16,
});

export const content = sprinkles({
    display: 'flex',
    width: '100%',
    minHeight: 72,
    paddingY: 16,
});

export const assetContainer = sprinkles({
    paddingRight: 16,
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
    {
        selectors: {
            [`${boxed} &:active`]: {
                // needed because we can't use overflow: hidden on the boxed container for the focus ring to be visible
                borderRadius: `calc(${vars.borderRadii.container} - 1px)`,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            },
            [`${boxed} &:hover`]: {
                // needed because we can't use overflow: hidden on the boxed container for the focus ring to be visible
                borderRadius: `calc(${vars.borderRadii.container} - 1px)`,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            },
        },
    },
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
