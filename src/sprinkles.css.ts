import {defineProperties, createSprinkles} from '@vanilla-extract/sprinkles';
import {vars} from './skins/skin-contract.css';

type ColorKeys = keyof typeof vars.colors;
type ColorValues = typeof vars.colors[ColorKeys];

const colors: Array<ColorValues | 'transparent'> = [...Object.values(vars.colors), 'transparent'];

const colorProperties = defineProperties({
    properties: {
        color: colors,
        background: colors,
        backgroundColor: colors,
    },
});

const sizes = [0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80] as const;

const commonProperties = defineProperties({
    properties: {
        position: ['relative', 'absolute', 'fixed', 'static'],
        display: ['none', 'flex', 'inline-flex', 'block', 'inline', 'inline-block'],
        flexDirection: ['row', 'column'],
        justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
        alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
        flexShrink: [0],
        flexGrow: [0, 1],
        flex: [1],
        paddingTop: sizes,
        paddingBottom: sizes,
        paddingLeft: sizes,
        paddingRight: sizes,
        width: sizes,
        height: sizes,
        minWidth: sizes,
        minHeight: sizes,
        border: {
            regular: `1px solid ${vars.colors.border}`,
        },
        borderRadius: ['50%', 2, 4, 8, 16],
        cursor: ['pointer'],
        overflow: ['hidden'],
        top: sizes,
        left: sizes,
        right: sizes,
        bottom: sizes,
    },
    shorthands: {
        padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
        paddingX: ['paddingLeft', 'paddingRight'],
        paddingY: ['paddingTop', 'paddingBottom'],
    },
});

export const sprinkles = createSprinkles(commonProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
