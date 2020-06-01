// @flow
const getMediaQuerySize = (mediaFeature, mediaQuery, defaultSize) => {
    const regExp = new RegExp(`\\(${mediaFeature}: (\\d+)px\\)`);
    const [, size = defaultSize] = mediaQuery.match(regExp) || [];
    return +size;
};

window.matchMedia =
    window.matchMedia ||
    jest.fn(query => {
        const minWidth = getMediaQuerySize('min-width', query, 0);
        const maxWidth = getMediaQuerySize('max-width', query, Infinity);

        return {
            matches: global.window.innerWidth >= minWidth && global.window.innerWidth <= maxWidth,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            media: query,
            onchange: null,
        };
    });
