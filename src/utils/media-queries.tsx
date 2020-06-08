// @flow

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
});
