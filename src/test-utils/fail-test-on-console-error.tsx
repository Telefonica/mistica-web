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
