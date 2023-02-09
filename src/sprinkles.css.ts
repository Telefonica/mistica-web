import {defineProperties, createSprinkles} from '@vanilla-extract/sprinkles';
import {vars} from './skins/skin-contract.css';

type ColorKeys = keyof typeof vars.colors;
type ColorValues = (typeof vars.colors)[ColorKeys];

const colors: Array<ColorValues | 'transparent' | 'inherit'> = [
    ...Object.values(vars.colors),
    'transparent',
    'inherit',
];

const colorProperties = defineProperties({
    properties: {
        color: colors,
        background: [...colors, 'transparent'],
    },
});

const sizes = [0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80] as const;

const commonProperties = defineProperties({
    properties: {
        position: ['relative', 'absolute', 'fixed', 'static'],
        display: ['none', 'flex', 'inline-flex', 'block', 'inline', 'inline-block'],
        flexDirection: ['row', 'column'],
        justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
        alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
        flexShrink: [0, 1],
        flexGrow: [0, 1],
        flex: [1],
        paddingTop: sizes,
        paddingBottom: sizes,
        paddingLeft: sizes,
        paddingRight: sizes,
        width: ['100%', 'auto', ...sizes],
        height: ['100%', ...sizes],
        minWidth: ['100%', ...sizes],
        minHeight: sizes,
        maxWidth: ['100%'],
        maxHeight: ['100%'],
        border: {
            regular: `1px solid ${vars.colors.border}`,
            none: 'none',
        },
        borderRadius: ['50%', 2, 4, 8, 16, 20],
        cursor: ['pointer'],
        overflow: ['hidden', 'visible'],
        top: sizes,
        left: sizes,
        right: sizes,
        bottom: sizes,
        objectFit: ['cover'],
    } as const,
    shorthands: {
        padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
        paddingX: ['paddingLeft', 'paddingRight'],
        paddingY: ['paddingTop', 'paddingBottom'],
    },
});

export const sprinkles = createSprinkles(commonProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
