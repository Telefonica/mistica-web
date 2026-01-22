import {style, keyframes} from '@vanilla-extract/css';
import {vars as skinVars} from './skins/skin-contract.css';

export const fileItem = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    border: '1px solid var(--color-border-secondary)',
    borderRadius: '4px',
    marginBottom: '8px',
    backgroundColor: 'var(--color-background-secondary)',

    selectors: {
        '&:hover': {
            backgroundColor: 'var(--color-background-hover)',
        },
    },
});

export const dropZoneContainer = style({
    border: `3px dashed ${skinVars.colors.borderHigh}`,
    borderRadius: '16px',
    padding: '40px 32px',
    textAlign: 'center',
    transition: 'border 200ms ease, background-color 200ms ease',

    selectors: {
        '&:hover': {
            backgroundColor: '#CEEBFB',
        },
    },
});

export const dropZoneActive = style({
    border: `3px solid ${skinVars.colors.borderHigh}`,
    backgroundColor: '#CEEBFB',
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

export const centeredContent = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
});
