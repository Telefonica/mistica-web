/**
 * @param {string} mediaFeature
 * @param {string} mediaQuery
 * @param {number} defaultSize
 * @returns {number}
 */
const getMediaQuerySize = (mediaFeature, mediaQuery, defaultSize) => {
    const regExp = new RegExp(`\\(${mediaFeature}: (\\d+)px\\)`);
    const [, size = defaultSize] = mediaQuery.match(regExp) || [];
    return +size;
};

window.matchMedia =
    window.matchMedia ||
    jest.fn((query) => {
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

let errorOrWarnCalled = false;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
        errorOrWarnCalled = true;
        originalConsoleError(...args);
    });

    jest.spyOn(global.console, 'warn').mockImplementation((...args) => {
        // There is a known issue in JSS that makes this warning to trigger when rendering in Node
        if (args[0].includes('[JSS] Rule is not linked. Missing sheet option "link: true"')) {
            return;
        }
        errorOrWarnCalled = true;
        originalConsoleWarn(...args);
    });
});

afterEach(() => {
    if (errorOrWarnCalled) {
        throw new Error('Console warnings and errors are not allowed in tests.');
    }
});
