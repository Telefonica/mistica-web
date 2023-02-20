import {style, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import {baseTouchable} from './touchable.css';

const base = style([
    sprinkles({
        width: 'auto',
        display: 'inline',
        cursor: 'pointer',
    }),
    {
        lineHeight: 'inherit',
        wordBreak: 'break-word',
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    // baseTouchable class is needed to win specificity over just a baseTouchable, which has textDecoration: 'none'
                    [`${baseTouchable}&:hover:not([disabled])`]: {
                        textDecoration: 'underline',
                    },
                },
            },
        },
        selectors: {
            '&[disabled]': {
                opacity: 0.5,
                textDecoration: 'none',
            },
        },
    },
]);

export const variants = styleVariants({
    default: [
        base,
        sprinkles({
            color: vars.colors.textLink,
        }),
    ],
    inverseLight: [
        base,
        sprinkles({
            color: vars.colors.textLinkInverse,
        }),
        {
            selectors: {
                [`${baseTouchable}&`]: {
                    textDecoration: 'underline',
                },
            },
            '@media': {
                [mq.supportsHover]: {
                    selectors: {
                        [`${baseTouchable}&:hover:not([disabled])`]: {
                            textDecorationThickness: 2,
                        },
                    },
                },
            },
        },
    ],
    inverseDark: [
        base,
        sprinkles({
            color: vars.colors.textLink,
        }),
        {
            '@media': {
                [mq.supportsHover]: {
                    selectors: {
                        '&:hover:not([disabled])': {
                            textDecorationThickness: 1,
                        },
                    },
                },
            },
        },
    ],
});
