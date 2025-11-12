import {createVar, style, styleVariants} from '@vanilla-extract/css';
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

const minButtonArea = {
    pointer: '48px',
    touchable: '48px',
};

const interactiveAreaSize = createVar();

const minimumInteractiveArea = style({
    vars: {
        [interactiveAreaSize]: minButtonArea.pointer,
    },
    '@media': {
        [mq.touchableOnly]: {
            vars: {
                [interactiveAreaSize]: minButtonArea.touchable,
            },
        },
    },

    position: 'relative',
    '::after': {
        content: '',
        position: 'absolute',
        /**
         * min() is not supported in old browsers (https://caniuse.com/css-math-functions).
         * We don't force the minimum touchable area in that case.
         */
        top: [0, `min(0px, calc((100% - ${interactiveAreaSize}) / 2))`],
        bottom: [0, `min(0px, calc((100% - ${interactiveAreaSize}) / 2))`],
        left: [0, `min(0px, calc((100% - ${interactiveAreaSize}) / 2))`],
        right: [0, `min(0px, calc((100% - ${interactiveAreaSize}) / 2))`],
    },
});

const containerBase = style([
    sprinkles({
        border: 'regular',
        minHeight: 40,
        minWidth: 72,
    }),
    {
        borderRadius: vars.borderRadii.chip,
        verticalAlign: 'middle',
        cursor: 'default',
        borderColor: vars.colors.control,
    },
    minimumInteractiveArea,
]);

export const containerSmall = style({
    minHeight: 32,
    minWidth: 56,
});

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
    navigationActive: [
        chipActive,
        containerBase,
        sprinkles({
            color: vars.colors.textButtonPrimary,
            background: vars.colors.buttonPrimaryBackground,
        }),
        {
            borderColor: vars.colors.buttonPrimaryBackground,
            cursor: 'pointer',
        },
    ],
    navigationActiveInverse: [
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
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
    }),
    {
        backgroundColor: 'transparent',
        transition: 'background-color 0.1s ease-in-out',
        borderRadius: vars.borderRadii.chip,
        selectors: {
            [`${interactive}:active &`]: {
                backgroundColor: vars.colors.backgroundContainerPressed,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${interactive}:hover &`]: {
                        backgroundColor: vars.colors.backgroundContainerHover,
                    },
                    [`${interactive}:active &`]: {
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
export const iconNavigation = style([
    sprinkles({paddingRight: 4}),
    {color: vars.colors.textPrimaryInverse, paddingRight: 4},
]);

export const iconNavigationInverse = style([
    sprinkles({paddingRight: 4}),
    {color: vars.colors.controlActivated, paddingRight: 4},
]);

export const iconActive = style([
    sprinkles({paddingRight: 4}),
    {color: vars.colors.controlActivated, paddingRight: 4},
]);

export const leftPadding = styleVariants({
    default: [sprinkles({paddingLeft: 20})],
    small: [sprinkles({paddingLeft: 12})],
    withIcon: [sprinkles({paddingLeft: 16})],
    withIconSmall: [sprinkles({paddingLeft: 8})],
});

export const rightPadding = styleVariants({
    default: [sprinkles({paddingRight: 20})],
    small: [sprinkles({paddingRight: 12})],
    withIcon: [sprinkles({paddingRight: 16})],
    withIconSmall: [sprinkles({paddingRight: 8})],
});
