export const createMediaQueries = ({
    desktopOrTabletMinHeight,
    tabletMinWidth,
    desktopMinWidth,
    largeDesktopMinWidth,
}: {
    tabletMinWidth: number;
    desktopMinWidth: number;
    largeDesktopMinWidth: number;
    desktopOrTabletMinHeight: number;
}): {
    mobile: string;
    tablet: string;
    desktop: string;
    largeDesktop: string;
    tabletOrBigger: string;
    tabletOrSmaller: string;
    desktopOrBigger: string;
    supportsHover: string;
} => ({
    mobile:
        `@media only screen and (max-width: ${tabletMinWidth - 1}px), ` +
        `(max-height: ${desktopOrTabletMinHeight - 1}px)`,
    tablet:
        `@media only screen ` +
        `and (min-height: ${desktopOrTabletMinHeight}px) ` +
        `and (min-width: ${tabletMinWidth}px) ` +
        `and (max-width: ${desktopMinWidth - 1}px)`,
    desktop:
        `@media only screen ` +
        `and (min-height: ${desktopOrTabletMinHeight}px) ` +
        `and (min-width: ${desktopMinWidth}px) ` +
        `and (max-width: ${largeDesktopMinWidth - 1}px)`,
    largeDesktop:
        `@media only screen ` +
        `and (min-height: ${desktopOrTabletMinHeight}px) ` +
        `and (min-width: ${largeDesktopMinWidth}px)`,

    tabletOrBigger:
        `@media only screen ` +
        `and (min-height: ${desktopOrTabletMinHeight}px) ` +
        `and (min-width: ${tabletMinWidth}px)`,

    tabletOrSmaller:
        `@media only screen and (max-width: ${desktopMinWidth - 1}px), ` +
        `(max-height: ${desktopOrTabletMinHeight - 1}px)`,

    desktopOrBigger:
        `@media only screen ` +
        `and (min-height: ${desktopOrTabletMinHeight}px) ` +
        `and (min-width: ${desktopMinWidth}px)`,

    // Only apply hover effect to user agents using fine pointer devices (a mouse, for example)
    // Also enabled for (pointer: none) for acceptance tests, where (pointer: fine) doesn't match.
    // WARNING: you may be tempted to use @media (hover: hover) instead, but that doesn't work as expected in some android browsers.
    // See: https://hover-pointer-media-query.glitch.me/ and https://github.com/mui-org/material-ui/issues/15736
    supportsHover: '@media (pointer: fine), (pointer: none)',
});

/**
 * Scopes the styles to touchable devices.
 * See: https://stackoverflow.com/questions/12469875/how-to-code-css-media-queries-targeting-all-mobile-devices-and-tablets/42835826#42835826
 */
export const TOUCHABLE_ONLY = '@media (pointer: coarse), @media (hover: none)';
