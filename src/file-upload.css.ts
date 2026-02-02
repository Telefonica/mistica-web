import {style, keyframes} from '@vanilla-extract/css';
import {vars as skinVars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const fileItem = style([
    sprinkles({
        display: 'flex',
        border: 'regular',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        paddingY: 8,
        paddingX: 12,
    }),
    {
        marginBottom: 8,
        backgroundColor: skinVars.colors.backgroundContainer,
    },
]);

export const dropZoneContainer = style([
    sprinkles({
        borderRadius: 16,
        paddingY: 40,
        paddingX: 32,
    }),
    {
        backgroundColor: skinVars.colors.backgroundContainer,
        border: `1px dashed ${skinVars.colors.inputBorder}`,
        textAlign: 'center',
        transition: 'border 200ms ease, background-color 200ms ease',

        selectors: {
            '&:hover': {
                backgroundColor: '#E6F5FD', // TODO: missing token
            },
        },
    },
]);

export const dropZoneActive = style({
    border: `1px solid ${skinVars.colors.borderSelected}`,
    backgroundColor: '#CEEBFB', // TODO: missing token
});

const scaleAnimation = keyframes({
    '0%': {
        transform: 'scale(1)',
    },
    '100%': {
        transform: 'scale(1.08)',
    },
});

export const assetScaleActive = style({
    animation: `${scaleAnimation} 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
});

export const centeredContent = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }),
    {
        gap: '16px',
    },
]);
