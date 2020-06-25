const fromHexToRgb = (hexColor: string): [number, number, number] => {
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

export const applyAlpha = (color: string, alpha: number): string => {
    try {
        if (color.startsWith('var(')) {
            // it's a css variable
            return `rgba(${color.slice(0, -1)}_RAW, ${alpha})`;
        } else {
            // it's a hex color
            return `rgba(${fromHexToRgb(color).join(',')}, ${alpha})`;
        }
    } catch (e) {
        return color;
    }
};

/* Added to try to minimize the impact on users of color changes on app versions that still have the old colors. To be removed on APPS-6332 */

const brandAndVersionMatches = ((typeof self !== 'undefined' && self.navigator.userAgent) || '').match(
    /MovistarES\/([^\s]+)(?:\s|$)/
);
const [major, minor] = (brandAndVersionMatches ? brandAndVersionMatches[1] : '11.9').split('.');
export const isOldColorsApp: boolean = +major < 11 || (+major === 11 && +minor < 9);
