import {style, keyframes} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const disabled = style({
    opacity: 0.5,
});

const dropZoneBase = style([
    sprinkles({
        borderRadius: skinVars.borderRadii.container,
        paddingY: 32,
        paddingX: 24,
    }),
    {
        textAlign: 'center',
        transition: 'border 200ms ease, background-color 200ms ease',
        '@media': {
            [mq.tabletOrSmaller]: {
                paddingTop: 24,
                paddingBottom: 24,
                paddingLeft: 16,
                paddingRight: 16,
            },
        },
    },
]);

export const dropZoneContainer = style([
    dropZoneBase,
    {
        border: `1px dashed ${skinVars.colors.inputBorder}`,
        selectors: {
            [`&:hover:not(${disabled})`]: {
                border: `1px solid ${skinVars.colors.borderSelected}`,
                backgroundColor: skinVars.colors.backgroundDropZoneHover,
            },
        },
    },
]);

export const dropZoneContainerBrand = style([
    dropZoneBase,
    {
        border: `1px dashed ${skinVars.colors.inputBorderBrand}`,
        selectors: {
            [`&:hover:not(${disabled})`]: {
                border: `1px solid ${skinVars.colors.inputBorderBrand}`,
                backgroundColor: skinVars.colors.backgroundDropZoneBrandHover,
            },
        },
    },
]);

export const dropZoneActive = style({
    border: `1px solid ${skinVars.colors.borderSelected}`,
    backgroundColor: skinVars.colors.backgroundDropZoneDragover,
});

export const dropZoneActiveBrand = style({
    border: `1px solid ${skinVars.colors.inputBorderBrand}`,
    backgroundColor: skinVars.colors.backgroundDropZoneBrandDragover,
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

export const centeredButton = style([
    sprinkles({
        display: 'flex',
        justifyContent: 'center',
    }),
]);
