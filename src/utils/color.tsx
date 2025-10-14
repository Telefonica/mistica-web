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
 * @param color hex color or css variable with rgb components (skinVars.rawColors)
 * @param alpha the alpha value to apply
 * @returns The same color with the alpha channel applied
 */
export const applyAlpha = (color: string, alpha: number): string => {
    try {
        if (color.startsWith('var(')) {
            // it's a css variable with rgb components. See skin-contract rawColors
            return `rgba(${color}, ${alpha})`;
        } else if (color.startsWith('#')) {
            // it's a hex color
            return `rgba(${fromHexToRgb(color).join(',')}, ${alpha})`;
        } else if (color.startsWith('rgb(')) {
            // it's an rgb color
            return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
        } else if (color.startsWith('rgba(')) {
            // it's already an rgba color
            return color.replace(/, [\d.]+\)$/, `, ${alpha})`);
        } else {
            // it's a different color format (color name, hsl, etc). We try to use css relative color syntax
            // Note that this won't work in old browsers https://caniuse.com/css-relative-colors
            return `rgb(from ${color} r g b / ${Math.round(alpha * 100)}%)`;
        }
    } catch (e) {
        return color;
    }
};
