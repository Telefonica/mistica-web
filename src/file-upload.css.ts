import {style, keyframes, styleVariants, createVar} from '@vanilla-extract/css';
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

const dropZoneBorderVar = createVar();
const dropZoneBackgroundVar = createVar();
const dropZoneHoverBorderVar = createVar();
const dropZoneHoverBackgroundVar = createVar();
const dropZoneActiveBorderVar = createVar();
const dropZoneActiveBackgroundVar = createVar();

export const dropZoneContainerBase = style([
    dropZoneBase,
    {
        border: `1px dashed ${dropZoneBorderVar}`,
        backgroundColor: dropZoneBackgroundVar,
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`&:hover:not(.${disabled})`]: {
                        border: `1px solid ${dropZoneHoverBorderVar}`,
                        backgroundColor: dropZoneHoverBackgroundVar,
                    },
                },
            },
        },
    },
]);

export const dropZoneVariant = styleVariants({
    default: {
        vars: {
            [dropZoneBorderVar]: skinVars.colors.inputBorder,
            [dropZoneBackgroundVar]: 'transparent',
            [dropZoneHoverBorderVar]: skinVars.colors.borderSelected,
            [dropZoneHoverBackgroundVar]: skinVars.colors.backgroundDropZoneHover,
            [dropZoneActiveBorderVar]: skinVars.colors.borderSelected,
            [dropZoneActiveBackgroundVar]: skinVars.colors.backgroundDropZoneDragover,
        },
    },
    alternative: {
        vars: {
            [dropZoneBorderVar]: skinVars.colors.inputBorder,
            [dropZoneBackgroundVar]: skinVars.colors.backgroundContainer,
            [dropZoneHoverBorderVar]: skinVars.colors.borderSelected,
            [dropZoneHoverBackgroundVar]: skinVars.colors.backgroundDropZoneHover,
            [dropZoneActiveBorderVar]: skinVars.colors.borderSelected,
            [dropZoneActiveBackgroundVar]: skinVars.colors.backgroundDropZoneDragover,
        },
    },
    brand: {
        vars: {
            [dropZoneBorderVar]: skinVars.colors.inputBorderBrand,
            [dropZoneBackgroundVar]: 'transparent',
            [dropZoneHoverBorderVar]: skinVars.colors.controlActivatedBrand,
            [dropZoneHoverBackgroundVar]: skinVars.colors.backgroundDropZoneBrandHover,
            [dropZoneActiveBorderVar]: skinVars.colors.controlActivatedBrand,
            [dropZoneActiveBackgroundVar]: skinVars.colors.backgroundDropZoneBrandDragover,
        },
    },
    negative: {
        vars: {
            [dropZoneBorderVar]: skinVars.colors.inputBorderNegative,
            [dropZoneBackgroundVar]: 'transparent',
            [dropZoneHoverBorderVar]: skinVars.colors.controlActivatedNegative,
            [dropZoneHoverBackgroundVar]: skinVars.colors.backgroundDropZoneNegativeHover,
            [dropZoneActiveBorderVar]: skinVars.colors.controlActivatedNegative,
            [dropZoneActiveBackgroundVar]: skinVars.colors.backgroundDropZoneNegativeDragover,
        },
    },
    media: {
        vars: {
            [dropZoneBorderVar]: skinVars.colors.inputBorderNegative,
            [dropZoneBackgroundVar]: 'transparent',
            [dropZoneHoverBorderVar]: skinVars.colors.inputBorderNegative,
            [dropZoneHoverBackgroundVar]: skinVars.colors.backgroundDropZoneMediaHover,
            [dropZoneActiveBorderVar]: skinVars.colors.inputBorderNegative,
            [dropZoneActiveBackgroundVar]: skinVars.colors.backgroundDropZoneMediaDragover,
        },
    },
});

export const dropZoneActive = style({
    border: `1px solid ${dropZoneActiveBorderVar}`,
    backgroundColor: dropZoneActiveBackgroundVar,
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
