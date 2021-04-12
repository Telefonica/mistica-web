import './src/test-utils/fail-test-on-console-error';

const getMediaQuerySize = (mediaFeature: string, mediaQuery: string, defaultSize: number): number => {
    const regExp = new RegExp(`\\(${mediaFeature}: (\\d+)px\\)`);
    const [, size = defaultSize] = mediaQuery.match(regExp) || [];
    return +size;
};

window.matchMedia =
    window.matchMedia ||
    jest.fn((query) => {
        const minWidth = getMediaQuerySize('min-width', query, 0);
        const maxWidth = getMediaQuerySize('max-width', query, Infinity);

        const matches = query.includes('(prefers-color-scheme: dark)')
            ? false
            : global.window.innerWidth >= minWidth && global.window.innerWidth <= maxWidth;

        return {
            matches,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            media: query,
            onchange: null,
        };
    });
