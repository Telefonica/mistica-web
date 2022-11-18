export const fromHexToRgb = (hexColor: string): [number, number, number] => {
    if (hexColor.length === 4) {
        return [
            parseInt(hexColor.substr(-3, 1).repeat(2), 16),
            parseInt(hexColor.substr(-2, 1).repeat(2), 16),
            parseInt(hexColor.substr(-1, 1).repeat(2), 16),
        ];
    }
    if (hexColor.length === 7) {
        return [
            parseInt(hexColor.substr(-6, 2), 16),
            parseInt(hexColor.substr(-4, 2), 16),
            parseInt(hexColor.substr(-2, 2), 16),
        ];
    }
    throw Error('Bad color');
};

/**
 * @param color hex color or css variable with rgb components
 * @param alpha the alpha value to apply
 * @returns The same color with the alpha channel applied
 */
export const applyAlpha = (color: string, alpha: number): string => {
    try {
        if (color.startsWith('var(')) {
            // it's a css variable with rgb components. See skin-contract rawColors
            return `rgba(${color}, ${alpha})`;
        } else {
            // it's a hex color
            return `rgba(${fromHexToRgb(color).join(',')}, ${alpha})`;
        }
    } catch (e) {
        return color;
    }
};
