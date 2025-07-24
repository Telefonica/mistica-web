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
        } else {
            // it's a hex color
            return `rgba(${fromHexToRgb(color).join(',')}, ${alpha})`;
        }
    } catch (e) {
        return color;
    }
};

/**
 * Given a color returns the RGB components of the color.
 *
 * Accepts as color:
 * - Hex value: '#ff0000', '#f00'
 * - Color name: 'red'
 * - RGB value: 'rgb(255, 0, 0)', 'rgba(255, 0, 0, 1)' (opacity is ignored)
 *
 * Should work with CSS variables but it won't be reactive
 */
export const getRGBComponents = (() => {
    // Cache to avoid multiple DOM manipulations for the same color.
    // Should we limit the cache size?
    const cache = new Map();

    return (color: string): [number, number, number] | null => {
        const cacheKey = color;

        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        const temp = document.createElement('div');
        temp.style.display = 'none';
        temp.style.position = 'absolute';
        temp.style.color = color;
        document.body.appendChild(temp);

        const computedColor = getComputedStyle(temp).color;
        document.body.removeChild(temp);

        const match = computedColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) {
            cache.set(cacheKey, null);
            return null;
        }

        const rgb: [number, number, number] = [
            parseInt(match[1], 10),
            parseInt(match[2], 10),
            parseInt(match[3], 10),
        ];

        cache.set(cacheKey, rgb);
        return rgb;
    };
})();
