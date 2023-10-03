import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const base = style([
    sprinkles({
        cursor: 'pointer',
    }),
    {
        margin: 0,
        verticalAlign: 'bottom', // required to remove bottom gap when rendered as inline-block div
        fontFamily: 'inherit',
        appearance: 'none',
        userSelect: 'none',
        textAlign: 'inherit',
        textDecoration: 'none',
        fontSize: 'inherit',
        WebkitTapHighlightColor: 'transparent',
        ':active': {
            textDecoration: 'none',
        },
        ':hover': {
            textDecoration: 'none',
        },

        selectors: {
            '&[disabled]': {
                cursor: 'default',
            },
        },
    },
]);

export const touchable = style([
    base,
    sprinkles({
        display: 'block',
        border: 'none',
        width: '100%',
        color: 'inherit',
        background: 'transparent',
        padding: 0,
        overflow: 'visible',
    }),
]);

export const notTouchable = style({
    cursor: 'auto',
});
