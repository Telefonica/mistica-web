import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const touchable = style([
    sprinkles({
        display: 'block',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        color: 'inherit',
        backgroundColor: 'transparent',
        padding: 0,
    }),
    {
        verticalAlign: 'bottom', // required to remove bottom gap when rendered as inline-block div
        fontFamily: 'inherit',
        overflow: 'visible',
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

export const notTouchable = style({
    cursor: 'auto',
});
