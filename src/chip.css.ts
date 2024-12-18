import {style, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const chipWrapper = sprinkles({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const wrappedContent = sprinkles({
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
});

const containerBase = style([
    sprinkles({
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

export const interactive = style({
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    cursor: 'pointer',
});

export const button = style({
    border: 'none',
    background: 'transparent',
    padding: 0,
});

export const interactiveChipOverlay = style([
    sprinkles({
        height: '100%',
        width: '100%',
        position: 'absolute',
    }),
    {
        backgroundColor: 'transparent',
        transition: 'background-color 0.1s ease-in-out',
        selectors: {
            [`${button}:active &`]: {
                backgroundColor: vars.colors.backgroundContainerPressed,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${interactive}:hover &`]: {
                        backgroundColor: vars.colors.backgroundContainerHover,
                    },
                    [`${button}:active &`]: {
                        backgroundColor: vars.colors.backgroundContainerPressed,
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const icon = style([
    sprinkles({paddingRight: 4}),
    {color: vars.colors.neutralMedium, paddingRight: 4},
]);

export const iconActive = style([
    sprinkles({paddingRight: 4}),
    {color: vars.colors.controlActivated, paddingRight: 4},
]);

export const leftPadding = styleVariants({
    default: [sprinkles({paddingLeft: {mobile: 20, desktop: 12}})],
    withIcon: [sprinkles({paddingLeft: {mobile: 16, desktop: 8}})],
});

export const rightPadding = styleVariants({
    default: [sprinkles({paddingRight: {mobile: 20, desktop: 12}})],
    withIcon: [sprinkles({paddingRight: {mobile: 16, desktop: 8}})],
});
