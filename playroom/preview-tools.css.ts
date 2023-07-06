import {globalStyle, style} from '@vanilla-extract/css';
import {mq, skinVars} from '../src';
import {sprinkles} from '../src/sprinkles.css';

export const controls = style([
    sprinkles({
        position: 'fixed',
        top: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 16,
    }),
    {
        gap: 16,
        borderBottom: `1px solid ${skinVars.colors.divider}`,
        zIndex: 2,
        background: 'white',
    },
]);

globalStyle(`${controls} *`, {outline: 'none'});

export const flexSpacer = sprinkles({flex: 1});

export const desktopControls = style({
    borderBottom: `1px solid ${skinVars.colors.divider}`,
    height: 57,
    paddingRight: 16,
});

export const tabs = style({
    flexBasis: '73%',
    whiteSpace: 'nowrap',
});

export const checkbox = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
    }),
    {
        gap: '8px',
    },
]);

export const floattingButton = style([
    sprinkles({
        position: 'fixed',
    }),
    {
        zIndex: 1,
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',

        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    transform: 'rotateZ(45deg)',
                },
            },
        },
    },
]);

globalStyle(`${floattingButton} *`, {outline: 'none'});

export const floattingButtonBackground = sprinkles({
    borderRadius: '50%',
    display: 'inline-block',
    width: 40,
    height: 40,
});
