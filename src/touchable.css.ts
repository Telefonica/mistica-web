import {style} from '@vanilla-extract/css';

export const touchable = style({
    color: 'inherit',
    verticalAlign: 'bottom', // required to remove bottom gap when rendered as inline-block div
    fontFamily: 'inherit',
    overflow: 'visible',
    appearance: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'block',
    userSelect: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    textAlign: 'inherit',
    textDecoration: 'none',
    fontSize: 'inherit',
    WebkitTapHighlightColor: 'transparent',
    width: '100%',
    ':active': {
        textDecoration: 'none',
    },
    ':hover': {
        textDecoration: 'none',
    },

    selectors: {
        '&::-moz-focus-inner': {
            padding: 0,
            border: 'none',
        },
        '&[disabled]': {
            cursor: 'default',
        },
    },
});

export const notTouchable = style({
    cursor: 'auto',
});
