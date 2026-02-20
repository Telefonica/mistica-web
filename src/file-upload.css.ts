import {style, keyframes} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import {browserDefaultFocusOutline} from './text-field-components.css';

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
        position: 'relative',
        textAlign: 'center',
        transition: 'border 200ms ease, background-color 200ms ease',
        selectors: {
            [`&:not(.${disabled})`]: {
                cursor: 'pointer',
            },
        },
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
        '@media': {
            [mq.supportsHover]: {
                [`&:hover:not(.${disabled})`]: {
                    border: `1px solid ${skinVars.colors.borderSelected}`,
                    backgroundColor: skinVars.colors.backgroundDropZoneHover,
                },
            },
        },
    },
]);

export const dropZoneContainerBrand = style([
    dropZoneBase,
    {
        border: `1px dashed ${skinVars.colors.inputBorderBrand}`,
        '@media': {
            [mq.supportsHover]: {
                [`&:hover:not(.${disabled})`]: {
                    border: `1px solid ${skinVars.colors.inputBorderBrand}`,
                    backgroundColor: skinVars.colors.backgroundDropZoneBrandHover,
                },
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

export const dropZoneButton = style({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    border: 0,
    background: 'transparent',
    cursor: 'inherit',
    outline: 'none',
    selectors: {
        '&:focus-visible': {
            outline: browserDefaultFocusOutline,
        },
    },
});

export const centeredButton = style([
    sprinkles({
        display: 'flex',
        justifyContent: 'center',
    }),
]);
