import {style, styleVariants, createVar} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as colorsVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

const SWITCH_ANIMATION = '.25s cubic-bezier(.5, 1.35, .77, 1)';

const top = createVar();
const left = createVar();
const transformOrigin = createVar();
const minWidth = createVar();
const maxHeight = createVar();

export const vars = {
    top,
    left,
    transformOrigin,
    minWidth,
    maxHeight,
};

const checkboxBase = sprinkles({
    display: 'inline-block',
    cursor: 'pointer',
});

export const checkboxVariants = styleVariants({
    default: [checkboxBase, {cursor: 'pointer', padding: 4}],
    ios: [checkboxBase, {cursor: 'pointer', padding: 0}],
    disabled: [checkboxBase, {cursor: 'default', opacity: 0.5, padding: 4}],
    disabledIos: [checkboxBase, {cursor: 'default', opacity: 0.5, padding: 0}],
});

const switchCheckboxContainerBase = style([
    sprinkles({position: 'relative'}),
    {
        userSelect: 'none',
    },
]);

export const switchCheckboxContainerVariants = styleVariants({
    default: [switchCheckboxContainerBase, {width: 34}],
    ios: [switchCheckboxContainerBase, {width: 51}],
});

export const switchCheckboxLabel = style([
    sprinkles({display: 'block', overflow: 'hidden'}),
    {
        borderRadius: 40,
    },
]);

const barBase = style([
    sprinkles({
        display: 'block',
    }),
    {
        pointerEvents: 'none',
        transition: `background ${SWITCH_ANIMATION}`,
    },
]);

const liquidGlassBarBase = style([
    barBase,
    {
        height: 31,
        borderRadius: 40,
        position: 'relative',
        overflow: 'hidden',
        selectors: {
            '&::before': {
                content: '',
                position: 'absolute',
                left: 2,
                right: 2,
                top: 1,
                height: 10,
                borderRadius: 999,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0))',
                pointerEvents: 'none',
            },
            '&::after': {
                content: '',
                position: 'absolute',
                left: 2,
                right: 2,
                bottom: 1,
                height: 9,
                borderRadius: 999,
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.08))',
                pointerEvents: 'none',
            },
        },
    },
]);

export const barVariants = styleVariants({
    default: [barBase, {background: colorsVars.colors.control, height: 14}],
    // Hardcoded color because the native switch in iOS doesn't allow modification of this color
    ios: [barBase, {background: '#E9E9EA', height: 31}],
    iosDark: [barBase, {background: '#39393D', height: 31}],
    checked: [barBase, {background: colorsVars.colors.toggleAndroidBackgroundActive, height: 14}],
    checkedIos: [barBase, {background: colorsVars.colors.controlActivated, height: 31}],
    liquidGlass: [liquidGlassBarBase, {backgroundColor: '#C4C4C6', border: '1px solid rgba(0, 0, 0, 0.08)'}],
    checkedLiquidGlass: [
        liquidGlassBarBase,
        {backgroundColor: '#0A7AFF', boxShadow: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.2)'},
    ],
});

export const overBrandBarVariants = styleVariants({
    default: [barBase, {background: colorsVars.colors.controlBrand, height: 14}],
    // Hardcoded color because the native switch in iOS doesn't allow modification of this color
    ios: [barBase, {background: '#E9E9EA', height: 31}],
    iosDark: [barBase, {background: '#39393D', height: 31}],
    checked: [barBase, {background: colorsVars.colors.toggleAndroidBackgroundActive, height: 14}],
    checkedIos: [barBase, {background: colorsVars.colors.controlActivatedBrand, height: 31}],
    liquidGlass: [liquidGlassBarBase, {backgroundColor: '#C4C4C6', border: '1px solid rgba(0, 0, 0, 0.08)'}],
    checkedLiquidGlass: [
        liquidGlassBarBase,
        {backgroundColor: '#0A7AFF', boxShadow: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.2)'},
    ],
});

export const overNegativeBarVariants = styleVariants({
    default: [barBase, {background: colorsVars.colors.controlNegative, height: 14}],
    // Hardcoded color because the native switch in iOS doesn't allow modification of this color
    ios: [barBase, {background: '#E9E9EA', height: 31}],
    iosDark: [barBase, {background: '#39393D', height: 31}],
    checked: [barBase, {background: colorsVars.colors.toggleAndroidBackgroundActive, height: 14}],
    checkedIos: [barBase, {background: colorsVars.colors.controlActivatedNegative, height: 31}],
    liquidGlass: [liquidGlassBarBase, {backgroundColor: '#C4C4C6', border: '1px solid rgba(0, 0, 0, 0.08)'}],
    checkedLiquidGlass: [
        liquidGlassBarBase,
        {backgroundColor: '#0A7AFF', boxShadow: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.2)'},
    ],
});

const containerBase = style({
    WebkitTapHighlightColor: 'transparent',
});

const MIN_TOUCHABLE_AREA = 48;

export const interactiveArea = style({
    '@media': {
        [mq.touchableOnly]: {
            /** In touchable devices, we force a minimum touchable area of 48px (without affecting content layout) */
            position: 'relative',
            '::after': {
                content: '',
                position: 'absolute',
                /**
                 * min() is not supported in old browsers (https://caniuse.com/css-math-functions).
                 * We don't force the minimum touchable area in that case.
                 */
                top: [0, `min(0px, calc((100% - ${MIN_TOUCHABLE_AREA}px) / 2))`],
                bottom: [0, `min(0px, calc((100% - ${MIN_TOUCHABLE_AREA}px) / 2))`],
                left: [0, `min(0px, calc((100% - ${MIN_TOUCHABLE_AREA}px) / 2))`],
                right: [0, `min(0px, calc((100% - ${MIN_TOUCHABLE_AREA}px) / 2))`],
            },
        },
    },
});

export const container = style([
    containerBase,
    {
        cursor: 'pointer',
    },
]);
export const containerDisabled = style([
    containerBase,
    {
        cursor: 'default',
    },
]);

export const disabled = style({
    cursor: 'default',
    opacity: 0.5,
});

const ballBase = style([
    sprinkles({
        position: 'absolute',
        bottom: 0,
        display: 'block',
        borderRadius: '50%',
    }),
    {margin: -4, transition: `all ${SWITCH_ANIMATION}`},
]);

const liquidGlassBallBase = style([
    ballBase,
    {
        top: 6,
        width: 27,
        height: 27,
        boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)',
        border: '0.5px solid rgba(0, 0, 0, 0.08)',
        position: 'absolute',
        overflow: 'hidden',
        selectors: {
            '&::before': {
                content: '',
                position: 'absolute',
                left: 3,
                right: 3,
                top: 2,
                height: 7,
                borderRadius: 999,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0))',
                pointerEvents: 'none',
            },
        },
    },
]);

const ballVariantsBase = styleVariants({
    default: [ballBase, {top: 1, width: 20, height: 20, boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'}],
    ios: [ballBase, {top: 6, width: 27, height: 27, boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)'}],
});

export const ballVariants = styleVariants({
    default: [
        ballVariantsBase.default,
        {right: 21, backgroundColor: colorsVars.colors.toggleAndroidInactive},
    ],
    ios: [ballVariantsBase.ios, {right: 26, backgroundColor: colorsVars.colors.iosControlKnob}],
    checked: [ballVariantsBase.default, {right: 1, backgroundColor: colorsVars.colors.controlActivated}],
    checkedIos: [ballVariantsBase.ios, {right: 6, backgroundColor: colorsVars.colors.iosControlKnob}],
    liquidGlass: [liquidGlassBallBase, {right: 26, backgroundColor: colorsVars.colors.iosControlKnob}],
    checkedLiquidGlass: [liquidGlassBallBase, {right: 6, backgroundColor: colorsVars.colors.iosControlKnob}],
});

export const overBrandBallVariants = styleVariants({
    default: [
        ballVariantsBase.default,
        {right: 21, backgroundColor: colorsVars.colors.toggleAndroidInactive},
    ],
    ios: [ballVariantsBase.ios, {right: 26, backgroundColor: colorsVars.colors.iosControlKnob}],
    checked: [ballVariantsBase.default, {right: 1, backgroundColor: colorsVars.colors.controlActivatedBrand}],
    checkedIos: [ballVariantsBase.ios, {right: 6, backgroundColor: colorsVars.colors.controlKnobBrand}],
    liquidGlass: [liquidGlassBallBase, {right: 26, backgroundColor: colorsVars.colors.iosControlKnob}],
    checkedLiquidGlass: [liquidGlassBallBase, {right: 6, backgroundColor: colorsVars.colors.iosControlKnob}],
});

export const overNegativeBallVariants = styleVariants({
    default: [
        ballVariantsBase.default,
        {right: 21, backgroundColor: colorsVars.colors.toggleAndroidInactive},
    ],
    ios: [ballVariantsBase.ios, {right: 26, backgroundColor: colorsVars.colors.iosControlKnob}],
    checked: [
        ballVariantsBase.default,
        {right: 1, backgroundColor: colorsVars.colors.controlActivatedNegative},
    ],
    checkedIos: [ballVariantsBase.ios, {right: 6, backgroundColor: colorsVars.colors.controlKnobNegative}],
    liquidGlass: [liquidGlassBallBase, {right: 26, backgroundColor: colorsVars.colors.iosControlKnob}],
    checkedLiquidGlass: [liquidGlassBallBase, {right: 6, backgroundColor: colorsVars.colors.iosControlKnob}],
});
