import {style, styleVariants, globalStyle} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

const containerBase = style([
    sprinkles({
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'regular',
    }),
    {
        borderRadius: vars.borderRadii.indicator,
        verticalAlign: 'middle',
        minHeight: 32,
        minWidth: 56,
        cursor: 'default',
        borderColor: vars.colors.control,

        '@media': {
            [mq.tabletOrSmaller]: {
                minHeight: 40,
                minWidth: 72,
            },
        },
    },
]);

const chipActive = style({});

export const chipVariants = styleVariants({
    default: [
        containerBase,
        sprinkles({
            background: vars.colors.backgroundContainer,
            color: vars.colors.textPrimary,
        }),
    ],
    overAlternative: [
        containerBase,
        sprinkles({
            background: vars.colors.backgroundContainerAlternative,
            color: vars.colors.textPrimary,
        }),
    ],
    active: [
        chipActive,
        containerBase,
        sprinkles({
            color: vars.colors.textActivated,
            background: vars.colors.brandLow,
        }),
        {
            borderColor: vars.colors.controlActivated,
            cursor: 'pointer',
        },
    ],
});

const interactive = style({
    userSelect: 'none',
    '@media': {
        [mq.supportsHover]: {
            selectors: {
                [`&:hover:not(${chipActive})`]: {
                    color: vars.colors.textActivated,
                    backgroundColor: vars.colors.brandLow,
                    cursor: 'pointer',
                },
            },
        },
    },
});

export const button = sprinkles({
    border: 'none',
    background: 'transparent',
    padding: 0,
});

export const chipInteractiveVariants = styleVariants({
    light: [
        interactive,
        {
            '@media': {
                [mq.supportsHover]: {
                    selectors: {
                        [`&:hover:not(${chipActive})`]: {
                            borderColor: vars.colors.brandLow,
                        },
                    },
                },
            },
        },
    ],
    dark: [
        interactive,
        {
            '@media': {
                [mq.supportsHover]: {
                    selectors: {
                        [`&:hover:not(${chipActive})`]: {
                            borderColor: vars.colors.background,
                        },
                    },
                },
            },
        },
    ],
});

export const icon = style({color: vars.colors.neutralMedium});
export const iconActive = style({color: vars.colors.controlActivated});

globalStyle(`${interactive}:hover:not(${chipActive}) > ${icon}`, {
    '@media': {
        [mq.supportsHover]: {
            color: vars.colors.controlActivated,
        },
    },
});

globalStyle(`${interactive}:hover:not(${chipActive}) > ${iconActive}`, {
    '@media': {
        [mq.supportsHover]: {
            color: vars.colors.controlActivated,
        },
    },
});
