import {isRunningAcceptanceTest} from './platform';

const BASE_FONT_SIZE = 16; // browser's default font-size in pixels

export const pxToRem = (px: number | string): string =>
    `${(parseFloat(px as string) / BASE_FONT_SIZE).toFixed(3)}rem`;

export const safeAreaInsetLeft = isRunningAcceptanceTest()
    ? `max(env(safe-area-inset-left), var(--acceptance-test-override-safe-area-inset-left, 0px))`
    : `env(safe-area-inset-left)`;
export const safeAreaInsetTop = isRunningAcceptanceTest()
    ? `max(env(safe-area-inset-top), var(--acceptance-test-override-safe-area-inset--top, 0px))`
    : `env(safe-area-inset-top)`;
export const safeAreaInsetBottom = isRunningAcceptanceTest()
    ? `max(env(safe-area-inset-bottom), var(--acceptance-test-override-safe-area-inset--bottom, 0px))`
    : `env(safe-area-inset-bottom)`;
export const safeAreaInsetRight = isRunningAcceptanceTest()
    ? `max(env(safe-area-inset-right), var(--acceptance-test-override-safe-area-inset--right, 0px))`
    : `env(safe-area-inset-right)`;
