const BASE_FONT_SIZE = 16; // browser's default font-size in pixels

export const pxToRem = (px: number | string): string =>
    `${(parseFloat(px as string) / BASE_FONT_SIZE).toFixed(3)}rem`;

const getVarName = (variable: string) => {
    const matches = variable.match(/^var\((.*)\)$/);

    if (matches) {
        return matches[1];
    }

    return variable;
};

export const applyCssVars = (vars: Record<string, string>): Record<string, string> => {
    const styles: Record<string, string> = {};
    for (const varName in vars) {
        styles[getVarName(varName)] = vars[varName];
    }
    return styles;
};
