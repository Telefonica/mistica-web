const BASE_FONT_SIZE = 16; // browser's default font-size in pixels

export const pxToRem = (px: number | string): string =>
    `${(parseFloat(px as string) / BASE_FONT_SIZE).toFixed(3)}rem`;

export const safeAreaInsetLeft = `max(env(safe-area-inset-left), var(--acceptance-test-override-safe-area-inset-left, 0px))`;
export const safeAreaInsetTop = `max(env(safe-area-inset-top), var(--acceptance-test-override-safe-area-inset--top, 0px))`;
export const safeAreaInsetBottom = `max(env(safe-area-inset-bottom), var(--acceptance-test-override-safe-area-inset--bottom, 0px))`;
export const safeAreaInsetRight = `max(env(safe-area-inset-right), var(--acceptance-test-override-safe-area-inset--right, 0px))`;
