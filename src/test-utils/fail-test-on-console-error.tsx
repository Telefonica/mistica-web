let errorOrWarnCalled = false;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
        errorOrWarnCalled = true;
        originalConsoleError(...args);
    });

    jest.spyOn(global.console, 'warn').mockImplementation((...args) => {
        errorOrWarnCalled = true;
        originalConsoleWarn(...args);
    });
});

afterEach(() => {
    if (errorOrWarnCalled) {
        errorOrWarnCalled = false;
        throw new Error('Console warnings and errors are not allowed in tests.');
    }
});
