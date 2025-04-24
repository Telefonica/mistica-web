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
        selectors: {
            '&[disabled]': {
                opacity: 0.5,
                textDecoration: 'none !important',
            },
        },
    },
]);

const underlineAlways = style({
    textDecoration: 'underline !important',
    '@media': {
        [mq.supportsHover]: {
            selectors: {
                '&:hover:not([disabled])': {
                    // important is needed to override styles in touchable.css.ts
                    textDecorationThickness: '0.125em !important',
                },
            },
        },
    },
});

const underlineOnHover = style({
    textDecoration: 'none !important',
    '@media': {
        [mq.supportsHover]: {
            selectors: {
                '&:hover:not([disabled])': {
                    textDecoration: 'underline !important',
                    textDecorationThickness: '0.0625em !important',
                },
            },
        },
    },
});

export const linkStyles = {
    underlineAlways,
    underlineOnHover,
};

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
    ],
    inverseDark: [
        base,
        sprinkles({
            color: vars.colors.textLink,
        }),
    ],
});
