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

const ulVerticalGap = 8;
const ulVerticalGapDesktop = 16;

export const ul = style({
    display: 'block',
    margin: 0,
    padding: 0,

    selectors: {
        'li &': {
            paddingTop: ulVerticalGap,
            '@media': {
                [mq.desktopOrBigger]: {
                    paddingTop: ulVerticalGapDesktop,
                },
            },
        },
    },
});

export const liWithCustomIcon = style({
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: 8,
    paddingBottom: ulVerticalGap,
    '@media': {
        [mq.desktopOrBigger]: {
            paddingLeft: 16,
            paddingBottom: ulVerticalGapDesktop,
        },
    },
    ':last-child': {
        paddingBottom: 0,
    },
});

export const liWithoutMarker = style({
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: 'calc(16px + 1em)',
    paddingBottom: ulVerticalGap,
    '@media': {
        [mq.desktopOrBigger]: {
            paddingLeft: 'calc(32px + 1em)',
            paddingBottom: ulVerticalGapDesktop,
        },
    },
    ':last-child': {
        paddingBottom: 0,
    },
});

export const li = style({
    marginLeft: 24,
    paddingBottom: ulVerticalGap,
    '@media': {
        [mq.desktopOrBigger]: {
            marginLeft: 32,
            paddingLeft: 8,
            paddingBottom: ulVerticalGapDesktop,
        },
    },
    ':last-child': {
        paddingBottom: 0,
    },

    selectors: {
        'ul > &': {
            listStyleType: 'disc',
        },
        'ol > &': {
            listStyleType: 'decimal',
        },
        'ul ul > &': {
            listStyleType: 'circle',
        },
        'ul ul ul > &': {
            listStyleType: 'square',
        },
        'ol ol > &': {
            listStyleType: 'lower-alpha',
        },
        'ol ol ol > &': {
            listStyleType: 'lower-roman',
        },
    },
});

export const liContent = style({
    selectors: {
        [`${liWithCustomIcon} &`]: {
            flex: 1,
        },
    },
});
