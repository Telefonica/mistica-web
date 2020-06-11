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
            const cssColorVar = color;
            return `rgba(${cssColorVar.slice(0, -1)}_RAW, ${alpha})`;
        } else {
            // it's a hex color
            const hexColor = color;
            return `rgba(${fromHexToRgb(hexColor).join(',')}, ${alpha})`;
        }
    } catch (e) {
        return color;
    }
};
