import {getDocument, queries} from 'pptr-testing-library';
import jimp from 'jimp';
import {MOVISTAR_SKIN} from '../skins/constants';

import type {Page, ElementHandle, ClickOptions, ScreenshotOptions, Browser, Viewport} from 'puppeteer';

type StoryArgs = {[key: string]: string | number | boolean};

// TODO find a way to define global vars
const globalBrowser: Browser = (global as any).browser;
const globalPage: Page = (global as any).page;

const HOST = ((): string => {
    if (globalBrowser) {
        const url = new URL(globalBrowser.wsEndpoint());
        const isUsingDockerizedChromium = url.port === '9223';
        if (isUsingDockerizedChromium) {
            return process.platform === 'linux' ? '172.17.0.1' : 'host.docker.internal';
        }
    }
    return 'localhost';
})();

const MOBILE_DEVICE_IOS_SMALL = 'MOBILE_IOS_SMALL';
const MOBILE_DEVICE_IOS = 'MOBILE_IOS';
const MOBILE_DEVICE_ANDROID = 'MOBILE_ANDROID';
const TABLET_DEVICE = 'TABLET';
const DESKTOP_DEVICE = 'DESKTOP';

export type Device =
    | typeof MOBILE_DEVICE_IOS_SMALL
    | typeof MOBILE_DEVICE_IOS
    | typeof MOBILE_DEVICE_ANDROID
    | typeof TABLET_DEVICE
    | typeof DESKTOP_DEVICE;

type DeviceCollection = Record<
    Device,
    {
        platform?: string;
        userAgent?: string;
        viewport: Viewport;
    }
>;

const DEVICES: DeviceCollection = {
    [MOBILE_DEVICE_IOS_SMALL]: {
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        platform: 'ios',
        viewport: {
            width: 320,
            height: 480,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    [MOBILE_DEVICE_IOS]: {
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
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
        userAgent:
            'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Mobile Safari/537.36',
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
        userAgent: '',
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

    let buf1 = (await element.screenshot({fullPage})) as Buffer;
    await new Promise((r) => setTimeout(r, STEP_TIME));
    let buf2 = (await element.screenshot({fullPage})) as Buffer;

    // buffers are different if compare != 0
    while (buf1.compare(buf2)) {
        if (Date.now() - t0 > maxWait) {
            throw Error('Paint end timeout');
        }
        buf1 = buf2;
        await new Promise((r) => setTimeout(r, STEP_TIME));
        buf2 = (await element.screenshot({fullPage})) as Buffer;
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

const buildStoryUrl = (id: string, skin?: string, platform?: string, args?: StoryArgs) => {
    const params = new URLSearchParams();

    params.set('id', id);

    params.set('viewMode', 'story');

    if (skin) {
        params.set('skin', skin);
    }

    if (platform) {
        params.set('platform', platform);
    }

    if (args) {
        params.set(
            'args',
            Object.entries(args)
                .map(([key, value]) => `${key}:${value}`)
                .join(';')
        );
    }

    return `http://${HOST}:6006/iframe.html?${params.toString()}`;
};

export type PageApi = {
    clear: (selector: ElementHandle) => Promise<void>;

    // Following methods are inherited from Puppeteer.Page:

    // These are overridden:
    type: (selector: ElementHandle, text: string, options?: {delay: number}) => Promise<void>;
    click: (selector: ElementHandle, options?: ClickOptions) => Promise<void>;
    select: (selector: ElementHandle, ...values: string[]) => Promise<string[]>;

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
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
        return watermarkIfNeeded(elementHandle.screenshot(options) as Promise<Buffer>);
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

    api.type = async (elementHandle, text, options) => elementHandle.type(text, options);
    api.click = async (elementHandle, options) => elementHandle.click(options);
    api.select = async (elementHandle, ...values) => elementHandle.select(...values);
    api.screenshot = async (options?: ScreenshotOptions) => {
        await waitForPaintEnd(page);
        return watermarkIfNeeded(page.screenshot(options) as Promise<Buffer>);
    };
    api.clear = async (elementHandle) => {
        await api.click(elementHandle, {clickCount: 3});
        await elementHandle.press('Delete');
    };

    return api;
};

const openPage = async ({url, device, userAgent}: {url: string; device: Device; userAgent?: string}) => {
    const currentUserAgent = userAgent || DEVICES[device].userAgent || (await globalBrowser.userAgent());
    const page = globalPage;
    await page.bringToFront();
    await page.setViewport(DEVICES[device].viewport);
    await page.setUserAgent(`${currentUserAgent} acceptance-test`);
    await page.goto(url);

    return createPageApi(page);
};

export const openStoryPage = ({
    id,
    device = TABLET_DEVICE,
    skin = 'Movistar',
    userAgent,
    args,
}: {
    id: string;
    device?: Device;
    skin?: 'Movistar' | 'Vivo' | 'O2' | 'O2-classic';
    userAgent?: string;
    args?: StoryArgs;
}): Promise<PageApi> => {
    const url = buildStoryUrl(id, skin, DEVICES[device].platform, args);
    console.log(url);
    return openPage({url, device, userAgent});
};

/**
 * Renders a page with a React component in the server and opens it in the browser, where it's hydrated client side.
 * `name` is the name (without extension) of a file in the __ssr_pages__ folder. This file exports the component to be rendered.
 */
export const openSSRPage = async ({
    name,
    device = TABLET_DEVICE,
    skin = MOVISTAR_SKIN,
    userAgent = DEVICES[device].userAgent,
}: {
    name: string;
    device?: Device;
    skin?: string;
    userAgent?: string;
}): Promise<PageApi> => {
    const page = globalPage;
    const port = (global as any).__SSR_SERVER__.address().port;

    // Capture browser console.error and console.warn calls that React could trigger when calling hydrate()
    page.on('console', async (msg) => {
        const type = msg.type();
        const args = [...(await Promise.all(msg.args().map((h: any) => h.jsonValue())))];
        if (args.length === 0) {
            args.push(msg.text());
        }
        if (type === 'error') {
            console.error(...args);
        }
        if (type === 'warning') {
            console.warn(...args);
        }
    });

    const url = `http://${HOST}:${port}/${name}?skin=${skin}`;
    return openPage({url, device, userAgent});
};

export const screen: Queries = buildQueryMethods();

export const setRootFontSize = (px: number): Promise<void> =>
    page.$eval('html', (e, px) => e.setAttribute('style', `font-size: ${px}px;`), px);
