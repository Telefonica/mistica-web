import type {DensityValue} from '../../src/density/definitions.ts';

export type {Density, DensityValue} from '../../src/density/definitions.ts';

export type GradientDescription = {
    angle: number;
    colors: Array<{
        value: string;
        stop: number; // value from 0 to 1
    }>;
};

export type SolidColorDescription = {
    value: string;
    type?: undefined;
};

export type GradientColorDescription = {
    type: 'linear-gradient';
    value: GradientDescription;
};

export type ColorDescription = SolidColorDescription | GradientColorDescription;

export type Breakpoint = 'mobile' | 'desktop';

export type BreakpointValue<T> = Record<Breakpoint, T>;

/**
 * A scalar, a density value, a breakpoint value, or a breakpoint value whose entries are density values.
 */
export type TokenValue<T> = T | DensityValue<T> | BreakpointValue<T | DensityValue<T>>;

export type RadiusDescription = {
    value: TokenValue<string>;
};

export type TextTokenValue = string | DensityValue<string> | TokenValue<number>;

type SpacingSide = 'top' | 'right' | 'bottom' | 'left';

export type SpacingValue = TokenValue<number> | Partial<Record<SpacingSide, TokenValue<number>>>;

export type DesignTokens = {
    global: {palette: Record<string, {value: string}>};
    light: Record<string, ColorDescription>;
    dark: Record<string, ColorDescription>;
    radius: Record<string, RadiusDescription>;
    text: Record<string, Record<string, {value: TextTokenValue}>>;
    themeVariant: Record<string, {value: string}>;
    componentProperties?: {showBoxedBorder?: {value: boolean}};
    spacing: {
        responsiveLayoutMargin: {value: BreakpointValue<number>};
        [spacingName: string]: {value: SpacingValue};
    };
};
