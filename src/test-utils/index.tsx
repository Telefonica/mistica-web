import {getDocument, queries} from 'pptr-testing-library';
import jimp from 'jimp';

import type {Page, ElementHandle, ClickOptions, ScreenshotOptions, Browser} from 'puppeteer';
import type {Viewport} from 'puppeteer/DeviceDescriptors';
import type {Skin} from '../colors';

// TODO find a way to define global vars
const globalBrowser: Browser = (global as any).browser;
const globalPage: Page = (global as any).page;

const STORYBOOK_URL = ((): string => {
    if (globalBrowser) {
        const url = new URL(globalBrowser.wsEndpoint());
        const isUsingDockerizedChromium = url.port === '9223';
        if (isUsingDockerizedChromium) {
            return process.platform === 'linux'
                ? 'http://172.17.0.1:6006/iframe.html'
                : 'http://host.docker.internal:6006/iframe.html';
        }
    }
    return 'http://localhost:6006/iframe.html';
})();

const MOBILE_DEVICE_IOS: 'MOBILE_IOS' = 'MOBILE_IOS';
const MOBILE_DEVICE_ANDROID: 'MOBILE_ANDROID' = 'MOBILE_ANDROID';
const TABLET_DEVICE: 'TABLET' = 'TABLET';
const DESKTOP_DEVICE: 'DESKTOP' = 'DESKTOP';

export type Device =
    | typeof MOBILE_DEVICE_IOS
    | typeof MOBILE_DEVICE_ANDROID
    | typeof TABLET_DEVICE
    | typeof DESKTOP_DEVICE;

type DeviceCollection = Record<
    Device,
    {
        platform?: string;
        viewport: Viewport;
    }
>;

const DEVICES: DeviceCollection = {
    [MOBILE_DEVICE_IOS]: {
        platform: 'ios',
        viewport: {
            width: 375,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    [MOBILE_DEVICE_ANDROID]: {
        platform: 'android',
        viewport: {
            width: 411,
            height: 731,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    [TABLET_DEVICE]: {
        // Use default platform
        platform: undefined,
        viewport: {
            width: 800,
            height: 600,
            deviceScaleFactor: 1,
            isMobile: false,
            hasTouch: false,
            isLandscape: false,
        },
    },
    [DESKTOP_DEVICE]: {
        // Use default platform
        platform: undefined,
        viewport: {
            width: 1280,
            height: 800,
            deviceScaleFactor: 1,
            isMobile: false,
            hasTouch: false,
            isLandscape: false,
        },
    },
};

const STEP_TIME = 250;

type WaitForPaintEndOptions = {
    maxWait?: number;
    fullPage?: boolean;
};

const waitForPaintEnd = async (
    element: ElementHandle | Page,
    {maxWait = 10000, fullPage = true}: WaitForPaintEndOptions = {}
) => {
    const t0 = Date.now();

    let buf1 = await element.screenshot({fullPage});
    await new Promise((r) => setTimeout(r, STEP_TIME));
    let buf2 = await element.screenshot({fullPage});

    // buffers are different if compare != 0
    while (buf1.compare(buf2)) {
        if (Date.now() - t0 > maxWait) {
            throw Error('Paint end timeout');
        }
        buf1 = buf2;
        await new Promise((r) => setTimeout(r, STEP_TIME));
        buf2 = await element.screenshot({fullPage});
    }
};

const watermarkIfNeeded = async (bufferPromise: Promise<Buffer | string>): Promise<Buffer | string> => {
    if (process.env.HEADLESS || process.env.CI) {
        return bufferPromise;
    }
    const image = await jimp.read(Buffer.from(await bufferPromise));
    image.color([{apply: 'tint', params: [50]}]);
    await jimp.loadFont(jimp.FONT_SANS_32_BLACK).then((font) => {
        image.print(
            font,
            0,
            0,
            {
                text: 'Screenshot not valid for CI. Please, regenerate in headless mode',
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: jimp.VERTICAL_ALIGN_MIDDLE,
            },
            image.bitmap.width,
            image.bitmap.height
        );
    });
    return image.getBufferAsync(jimp.MIME_PNG);
};

const buildStoryUrl = (section: string, name: string, skin?: string, platform?: string) => {
    const params = new URLSearchParams();
    params.set('selectedKind', section);
    params.set('selectedStory', name);
    if (skin) {
        params.set('skin', skin);
    }
    if (platform) {
        params.set('platform', platform);
    }
    return `${STORYBOOK_URL}?${params.toString()}`;
};

export type PageApi = {
    // Following methods are inherited from Puppeteer.Page, some are overridden

    // These are overridden:
    type: (selector: ElementHandle, text: string, options?: {delay: number}) => Promise<void>;
    click: (selector: ElementHandle, options?: ClickOptions) => Promise<void>;

    // These are from prototype chain (inherited from Puppeteer.Page)
    screenshot: (options?: ScreenshotOptions) => ReturnType<Page['screenshot']>;
};

const wait = <T extends any>(
    expectation: () => Promise<T> | T,
    timeout = 4500,
    interval = 50
): Promise<T> => {
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
        const rejectOrRerun = (error: Error) => {
            if (Date.now() - startTime >= timeout) {
                reject(error);
                return;
            }
            // eslint-disable-next-line no-use-before-define
            setTimeout(runExpectation, interval);
        };
        const runExpectation = () => {
            try {
                Promise.resolve(expectation())
                    .then((r) => resolve(r))
                    .catch(rejectOrRerun);
            } catch (error) {
                rejectOrRerun(error);
            }
        };
        setTimeout(runExpectation, 0);
    });
};

const bindToDoc = (fn: (e: ElementHandle | null, method: string) => ElementHandle) => async (m: string) => {
    const doc = await getDocument(globalPage);
    const body = await doc.$('body');
    const elementHandle = await wait(() => fn(body, m));

    const screenshot = async (options: ScreenshotOptions) => {
        await waitForPaintEnd(elementHandle, {fullPage: false});
        return watermarkIfNeeded(elementHandle.screenshot(options));
    };

    const newElementHandle = Object.create(elementHandle);
    newElementHandle.screenshot = screenshot;
    return newElementHandle;
};

type Query = (m: string) => Promise<ElementHandle>;
type AllQuery = (m: string) => Promise<Array<ElementHandle>>;

type Queries = {
    findByText: Query;
    findAllByText: AllQuery;
    findByTestId: Query;
    findAllByTestId: AllQuery;
    findByTitle: Query;
    findAllByTitle: AllQuery;
    findByRole: Query;
    findAllByRole: AllQuery;
    findByPlaceholderText: Query;
    findAllByPlaceholderText: AllQuery;
    findByLabelText: Query;
    findAllByLabelText: AllQuery;
    findByAltText: Query;
    findAllByAltText: AllQuery;
};

const buildQueryMethods = () =>
    Object.fromEntries(
        Object.entries(queries).map(([queryName, queryFn]) => [
            queryName.replace('get', 'find'),
            bindToDoc(queryFn),
        ])
    ) as Queries;

const createPageApi = (page: Page): PageApi => {
    const api: PageApi = Object.create(page);

    api.type = async (selector, text, options) => selector.type(text, options);
    api.click = async (selector, options) => selector.click(options);
    api.screenshot = async (options?: ScreenshotOptions) => {
        await waitForPaintEnd(page);
        return watermarkIfNeeded(page.screenshot(options));
    };

    return api;
};

const openPage = async ({url, device}: {url: string; device: Device}) => {
    const page = globalPage;
    const browser = globalBrowser;
    await page.bringToFront();
    await page.setViewport(DEVICES[device].viewport);
    await page.setUserAgent(`${await browser.userAgent()} acceptance-test`);
    await page.goto(url);

    return createPageApi(page);
};

export const openStoryPage = ({
    section,
    name,
    device = TABLET_DEVICE,
    skin = 'Movistar',
}: {
    section: string;
    name: string;
    device?: Device;
    skin?: Skin;
}): Promise<PageApi> => {
    const url = buildStoryUrl(section, name, skin, DEVICES[device].platform);
    return openPage({url, device});
};

/**
 * Renders a page with a React component in the server and opens it in the browser, where it's hydrated client side.
 * `name` is the name (without extension) of a file in the __ssr_pages__ folder. This file exports the component to be rendered.
 */
export const openSSRPage = async ({
    name,
    device = TABLET_DEVICE,
    skin = 'Movistar',
}: {
    name: string;
    device?: Device;
    skin?: Skin;
}): Promise<PageApi> => {
    const page = globalPage;
    const port = (global as any).__SSR_SERVER__.address().port;

    // Capture browser console.error and console.warn calls that React could trigger when calling hydrate()
    page.on('console', async (msg) => {
        const type = msg.type();
        const args = await Promise.all(msg.args().map((h) => h.jsonValue()));
        if (type === 'error') {
            console.error(...args);
        }
        if (type === 'warning') {
            console.warn(...args);
        }
    });

    await page.coverage.startJSCoverage();

    const url = `http://localhost:${port}/${name}?skin=${skin}`;

    const pageApi = await openPage({url, device});

    const jsCoverage = await page.coverage.stopJSCoverage();
    let totalBytes = 0;
    let usedBytes = 0;
    for (const entry of jsCoverage) {
        totalBytes += entry.text.length;
        for (const range of entry.ranges) {
            usedBytes += range.end - range.start - 1;
        }
    }
    console.log(`Bytes used: ${(usedBytes / totalBytes) * 100}%`);

    return pageApi;
};

export const screen: Queries = buildQueryMethods();
