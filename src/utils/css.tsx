const BASE_FONT_SIZE = 16; // browser's default font-size in pixels

export const pxToRem = (px: number | string): string =>
    `${(parseFloat(px as string) / BASE_FONT_SIZE).toFixed(3)}rem`;
