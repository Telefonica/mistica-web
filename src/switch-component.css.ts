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

export const barVariants = styleVariants({
    default: [barBase, {background: colorsVars.colors.control, height: 14}],
    // Hardcoded color because the native switch in iOS doesn't allow modification of this color
    ios: [barBase, {background: '#E9E9EA', height: 31}],
    iosDark: [barBase, {background: '#39393D', height: 31}],
    checked: [barBase, {background: colorsVars.colors.toggleAndroidBackgroundActive, height: 14}],
    checkedIos: [barBase, {background: colorsVars.colors.controlActivated, height: 31}],
});

export const inverseBarVariants = styleVariants({
    default: [barBase, {background: colorsVars.colors.controlInverse, height: 14}],
    // Hardcoded color because the native switch in iOS doesn't allow modification of this color
    ios: [barBase, {background: '#E9E9EA', height: 31}],
    iosDark: [barBase, {background: '#39393D', height: 31}],
    checked: [barBase, {background: colorsVars.colors.toggleAndroidBackgroundActive, height: 14}],
    checkedIos: [barBase, {background: colorsVars.colors.controlActivatedInverse, height: 31}],
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
});

export const inverseBallVariants = styleVariants({
    default: [
        ballVariantsBase.default,
        {right: 21, backgroundColor: colorsVars.colors.toggleAndroidInactive},
    ],
    ios: [ballVariantsBase.ios, {right: 26, backgroundColor: colorsVars.colors.iosControlKnob}],
    checked: [
        ballVariantsBase.default,
        {right: 1, backgroundColor: colorsVars.colors.controlActivatedInverse},
    ],
    checkedIos: [ballVariantsBase.ios, {right: 6, backgroundColor: colorsVars.colors.controlKnobInverse}],
});
