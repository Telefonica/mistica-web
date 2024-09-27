import {style, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

const base = style([
    sprinkles({
        width: 'auto',
        display: 'inline',
        cursor: 'pointer',
    }),
    {
        userSelect: 'text',
        lineHeight: 'inherit',
        wordBreak: 'break-word',
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        // important is needed to override styles in touchable.css.ts
                        textDecoration: 'underline !important',
                    },
                },
            },
        },
        selectors: {
            '&[disabled]': {
                opacity: 0.5,
                textDecoration: 'none !important',
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
            textDecoration: 'underline !important',
            '@media': {
                [mq.supportsHover]: {
                    selectors: {
                        '&:hover:not([disabled])': {
                            textDecorationThickness: '2px !important',
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

export const touchable = sprinkles({
    display: 'block',
    border: 'none',
    width: '100%',
    background: 'transparent',
    padding: 0,
    overflow: 'visible',
});
