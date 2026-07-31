import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const disabled = style({
    opacity: 0.5,
});

export const row = style({
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

export const touchableBackgroundBrand = style({
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

export const rowContentPadding = style({
    paddingLeft: vars.spacing.boxedDefaultPadding.left,
    paddingRight: vars.spacing.boxedDefaultPadding.right,
});

export const content = style([
    sprinkles({
        width: '100%',
        paddingTop: 16,
    }),
    {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
    },
]);

export const innerContent = style({
    display: 'flex',
    minHeight: 56,
    paddingBottom: 16,
    gridColumn: 2,
    minWidth: 0,
});

export const assetContainer = style([sprinkles({paddingRight: 16}), {gridColumn: 1, paddingBottom: 16}]);

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

export const rowDivider = style({
    gridColumn: '2 / -1',
    selectors: {
        [`${row}:last-child &`]: {
            display: 'none',
        },
    },
});

export const rowDividerDualAction = style({
    paddingRight: vars.spacing.boxedDefaultPadding.right,
    selectors: {
        [`${row}:last-child &`]: {
            display: 'none',
        },
    },
});

export const rightContent = style({display: 'flex', marginLeft: 16});

export const detailRight = style({paddingLeft: 8});

export const detail = style([center, {textAlign: 'right'}]);

export const dualActionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
});

export const dualActionBody = style({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
});

const dualActionBase = sprinkles({padding: 0, border: 'none', background: 'transparent'});

export const dualActionLeft = style([
    dualActionBase,
    sprinkles({
        display: 'block',
        flexGrow: 1,
    }),
    {
        paddingLeft: vars.spacing.boxedDefaultPadding.left,
        paddingRight: 16,
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

const dualActionRightBase = style([
    dualActionBase,
    sprinkles({display: 'flex', alignItems: 'center', flexGrow: 0, width: 'auto'}),
    {paddingLeft: 16, paddingRight: vars.spacing.boxedDefaultPadding.right, lineHeight: 0},
]);

export const dualActionRight = style([dualActionRightBase, sprinkles({height: '100%'})]);

export const dualActionRightIconButton = style([dualActionRightBase, {paddingTop: 16, paddingBottom: 16}]);

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
