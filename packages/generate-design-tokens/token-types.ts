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

export type RadiusDescription = {
    value: string;
};

export type TextTokenValue = string | number | {mobile: number; desktop: number};

export type SpacingValue = number | string | {mobile: number; desktop: number};

export type DesignTokens = {
    global: {palette: Record<string, {value: string}>};
    light: Record<string, ColorDescription>;
    dark: Record<string, ColorDescription>;
    radius: Record<string, RadiusDescription>;
    text: Record<string, Record<string, {value: TextTokenValue}>>;
    themeVariant: Record<string, {value: string}>;
    spacing: {
        responsiveLayoutMargin: {value: {mobile: number; desktop: number}};
        [spacingName: string]: {value: SpacingValue};
    };
};
