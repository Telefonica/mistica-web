export const mediaQueriesConfig = {
    tabletMinWidth: 768,
    desktopMinWidth: 1024,
    largeDesktopMinWidth: 1368,
    desktopOrTabletMinHeight: process.env.PLAYROOM ? 0 : 550,
};

export const mobile =
    `only screen and (max-width: ${mediaQueriesConfig.tabletMinWidth - 1}px), ` +
    `(max-height: ${mediaQueriesConfig.desktopOrTabletMinHeight - 1}px)`;
export const tablet =
    `only screen ` +
    `and (min-height: ${mediaQueriesConfig.desktopOrTabletMinHeight}px) ` +
    `and (min-width: ${mediaQueriesConfig.tabletMinWidth}px) ` +
    `and (max-width: ${mediaQueriesConfig.desktopMinWidth - 1}px)`;
export const desktop =
    `only screen ` +
    `and (min-height: ${mediaQueriesConfig.desktopOrTabletMinHeight}px) ` +
    `and (min-width: ${mediaQueriesConfig.desktopMinWidth}px) ` +
    `and (max-width: ${mediaQueriesConfig.largeDesktopMinWidth - 1}px)`;
export const largeDesktop =
    `only screen ` +
    `and (min-height: ${mediaQueriesConfig.desktopOrTabletMinHeight}px) ` +
    `and (min-width: ${mediaQueriesConfig.largeDesktopMinWidth}px)`;

export const tabletOrBigger =
    `only screen ` +
    `and (min-height: ${mediaQueriesConfig.desktopOrTabletMinHeight}px) ` +
    `and (min-width: ${mediaQueriesConfig.tabletMinWidth}px)`;

export const tabletOrSmaller =
    `only screen and (max-width: ${mediaQueriesConfig.desktopMinWidth - 1}px), ` +
    `(max-height: ${mediaQueriesConfig.desktopOrTabletMinHeight - 1}px)`;

export const desktopOrBigger =
    `only screen ` +
    `and (min-height: ${mediaQueriesConfig.desktopOrTabletMinHeight}px) ` +
    `and (min-width: ${mediaQueriesConfig.desktopMinWidth}px)`;

// Only apply hover effect to user agents using fine pointer devices (a mouse, for example)
// Also enabled for (pointer: none) for acceptance tests, where (pointer: fine) doesn't match.
// WARNING: you may be tempted to use @media (hover: hover) instead, but that doesn't work as expected in some android browsers.
// See: https://hover-pointer-media-query.glitch.me/ and https://github.com/mui-org/material-ui/issues/15736
export const supportsHover = '@media (pointer: fine), (pointer: none)';

/**
 * Scopes the styles to touchable devices.
 * See: https://stackoverflow.com/questions/12469875/how-to-code-css-media-queries-targeting-all-mobile-devices-and-tablets/42835826#42835826
 */
export const touchableOnly = '@media (pointer: coarse), @media (hover: none)';
