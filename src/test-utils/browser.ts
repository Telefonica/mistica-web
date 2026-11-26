import type {Locator, Page, BrowserContext, BrowserContextOptions} from 'playwright';

export type TestViewport = NonNullable<BrowserContextOptions['viewport']> &
    Pick<BrowserContextOptions, 'deviceScaleFactor' | 'isMobile' | 'hasTouch'> & {
        safeAreaInset?: Partial<Record<'top' | 'right' | 'bottom' | 'left', number | string>>;
    };

export type PageApi = Page;

let context: BrowserContext | undefined;
let currentBrowser: import('playwright').Browser;
let currentPage: Page;
let browserUserAgent: string;

export const initializeBrowser = async (browser: import('playwright').Browser): Promise<void> => {
    currentBrowser = browser;
    const page = await browser.newPage();
    browserUserAgent = await page.evaluate(() => navigator.userAgent);
    await page.close();
};
let pageErrors: Array<Error> = [];

export const getGlobalPage = (): Page => currentPage;

export const closeBrowserContext = async (): Promise<void> => {
    await context?.close();
    context = undefined;
    const errors = pageErrors;
    pageErrors = [];
    if (errors.length) {
        throw new Error(errors.map((error) => error.stack || error.message).join('\n'));
    }
};

type RoleOptions = NonNullable<Parameters<Page['getByRole']>[1]> & {
    current?: boolean | string;
};

const queries = (root: () => Page | Locator) => {
    const find = async (locator: Locator): Promise<Locator> => {
        await locator.waitFor({state: 'attached'});
        return locator;
    };
    const findAll = async (locator: Locator): Promise<Array<Locator>> => {
        await locator.first().waitFor({state: 'attached'});
        return locator.all();
    };
    const byRole = (role: string, {current, ...options}: RoleOptions = {}) => {
        const locator = root().getByRole(role as Parameters<Page['getByRole']>[0], {exact: true, ...options});
        if (current === undefined) {
            return locator;
        }
        return locator.and(
            root().locator(
                current === false
                    ? ':not([aria-current]), [aria-current="false"]'
                    : current === true
                      ? '[aria-current]:not([aria-current="false"])'
                      : `[aria-current="${current}"]`
            )
        );
    };
    return {
        findByRole: (role: string, options?: RoleOptions) => find(byRole(role, options)),
        findAllByRole: (role: string, options?: RoleOptions) => findAll(byRole(role, options)),
        findByTestId: (id: string) => find(root().getByTestId(id)),
        findAllByTestId: (id: string) => findAll(root().getByTestId(id)),
        findByLabelText: (text: string | RegExp) => find(root().getByLabel(text, {exact: true})),
        findByText: (text: string | RegExp, options?: {exact?: boolean}) =>
            find(root().getByText(text, {exact: true, ...options})),
        findAllByText: (text: string | RegExp) => findAll(root().getByText(text, {exact: true})),
    };
};

export const screen = queries(getGlobalPage);
export const within = (element: Locator): ReturnType<typeof queries> => queries(() => element);

export const openPage = async ({
    url,
    path,
    userAgent,
    viewport = {width: 800, height: 600},
    isDarkMode,
    waitUntil = 'load',
    onConsole,
}: {
    url?: string;
    path?: string;
    userAgent?: string;
    viewport?: TestViewport;
    isDarkMode?: boolean;
    waitUntil?: NonNullable<Parameters<Page['goto']>[1]>['waitUntil'];
    onConsole?: (message: import('playwright').ConsoleMessage) => void;
}): Promise<PageApi> => {
    await context?.close();
    const {width, height, deviceScaleFactor, isMobile, hasTouch, safeAreaInset} = viewport;
    context = await currentBrowser.newContext({
        viewport: {width, height},
        deviceScaleFactor,
        isMobile,
        hasTouch,
        userAgent: `${userAgent || browserUserAgent} acceptance-test`,
        colorScheme: isDarkMode ? 'dark' : 'light',
        locale: 'es-ES',
        timezoneId: 'UTC',
    });
    currentPage = await context.newPage();
    const page = currentPage;
    page.setDefaultTimeout(10000);
    page.on('pageerror', (error) => pageErrors.push(error));
    if (onConsole) {
        page.on('console', onConsole);
    }
    await page.addInitScript((insets) => {
        window.addEventListener('DOMContentLoaded', () => {
            const style = document.createElement('style');
            style.textContent = `
                *, *:after, *:before {
                    transition-delay: 0s !important;
                    transition-duration: 0s !important;
                    animation-delay: -0.0001s !important;
                    animation-duration: 0s !important;
                    animation-play-state: paused !important;
                    caret-color: transparent !important;
                    font-variant-ligatures: none !important;
                }
                *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
                :root { ${Object.entries(insets || {})
                    .map(
                        ([position, value]) =>
                            `--acceptance-test-override-safe-area-inset-${position}: ${value};`
                    )
                    .join('\n')} }
            `;
            document.head.appendChild(style);
        });
    }, safeAreaInset);
    await page.goto(url || `http://localhost:6006${path}`, {waitUntil});
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const screenshot = page.screenshot.bind(page);
    page.screenshot = (options) => screenshot({caret: 'initial', ...options});
    return page;
};
