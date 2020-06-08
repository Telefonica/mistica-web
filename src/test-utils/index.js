/* eslint-disable testing-library/prefer-screen-queries */
// @flow
import {getDocument, queries} from 'pptr-testing-library';
import jimp from 'jimp';

import type {Page, ElementHandle, ClickOptions} from 'puppeteer';
import type {Viewport} from 'puppeteer/DeviceDescriptors';

const STORYBOOK_URL = ((): string => {
    if (global.browser) {
        const url = new URL(global.browser.wsEndpoint());
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

type Device =
    | typeof MOBILE_DEVICE_IOS
    | typeof MOBILE_DEVICE_ANDROID
    | typeof TABLET_DEVICE
    | typeof DESKTOP_DEVICE;

const DEVICES: {
    [name: Device]: {
        platform?: string,
        viewport: Viewport,
    },
    ...
} = {
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
    maxWait?: number,
    fullPage?: boolean,
};

const waitForPaintEnd = async (element, {maxWait = 10000, fullPage = true}: WaitForPaintEndOptions = {}) => {
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

const watermarkIfNeeded = async (bufferPromise: Promise<Buffer>): Promise<Buffer> => {
    if (process.env.HEADLESS || process.env.CI) {
        return bufferPromise;
    }
    const image = await jimp.read(await bufferPromise);
    image.color([
        {apply: 'desaturate', params: [100]},
        {apply: 'tint', params: [50]},
    ]);
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

const buildStoryUrl = (section: string, name: string, brand: ?string, platform: ?string) => {
    const params = new URLSearchParams();
    params.set('selectedKind', section);
    params.set('selectedStory', name);
    if (brand) {
        params.set('brand', brand);
    }
    if (platform) {
        params.set('platform', platform);
    }
    return `${STORYBOOK_URL}?${params.toString()}`;
};

type PageApi = {
    // Following methods are inherited from Puppeteer.Page, some are overridden

    // These are overridden:
    type: (
        selector: ElementHandle | Promise<ElementHandle>,
        text: string,
        options?: {delay: number}
    ) => Promise<void>,
    click: (selector: ElementHandle | Promise<ElementHandle>, options?: ClickOptions) => Promise<void>,
    // We need to use this convoluted $Call because $PropertyType does not work with Interfaces, and Page is
    // declared as an Interface, not an Object type

    // These are from prototype chain (inherited from Puppeteer.Page)
    screenshot: $Call<<T, P: {+screenshot: T, ...}>(P) => T, Page>,
    url: $Call<<T, P: {+url: T, ...}>(P) => T, Page>,
    title: $Call<<T, P: {+title: T, ...}>(P) => T, Page>,
    close: $Call<<T, P: {+close: T, ...}>(P) => T, Page>,
    goBack: $Call<<T, P: {+goBack: T, ...}>(P) => T, Page>,
};

const wait = <T>(
    expectation: () => Promise<T> | T,
    timeout?: number = 4500,
    interval?: number = 50
): Promise<T> => {
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
        const rejectOrRerun = (error) => {
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

const bindToDoc = (fn) => async (m: string) => {
    const doc = await getDocument(global.page);
    const body = await doc.$('body');
    const elementHandle = await wait(() => fn(body, m));

    const screenshot = async (options) => {
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
    getByText: Query,
    getAllByText: AllQuery,
    getByTestId: Query,
    getAllByTestId: AllQuery,
    getByTitle: Query,
    getAllByTitle: AllQuery,
    getByRole: Query,
    getAllByRole: AllQuery,
    getBySelector: Query,
    getByPlaceholderText: Query,
    getAllByPlaceholderText: AllQuery,
    getByLabelText: Query,
    getAllByLabelText: AllQuery,
    getByAltText: Query,
    getAllByAltText: AllQuery,
};

const buildQueryMethods = (): Queries => {
    return {
        getByText: bindToDoc(queries.getByText),
        getAllByText: bindToDoc(queries.getAllByText),

        getByTestId: bindToDoc(queries.getByTestId),
        getAllByTestId: bindToDoc(queries.getAllByTestId),

        getByTitle: bindToDoc(queries.getByTitle),
        getAllByTitle: bindToDoc(queries.getAllByTitle),

        getByRole: bindToDoc(queries.getByRole),
        getAllByRole: bindToDoc(queries.getAllByRole),

        getBySelector: (selector) =>
            wait(
                async () =>
                    await global.page.waitForSelector(selector).catch(() => {
                        throw Error(`No element found for selector ${selector} in the page`);
                    })
            ),

        getByPlaceholderText: bindToDoc(queries.getByPlaceholderText),
        getAllByPlaceholderText: bindToDoc(queries.getAllByPlaceholderText),
        getByLabelText: bindToDoc(queries.getByLabelText),
        getAllByLabelText: bindToDoc(queries.getAllByLabelText),
        getByAltText: bindToDoc(queries.getByAltText),
        getAllByAltText: bindToDoc(queries.getAllByAltText),
    };
};

const createPageApi = (page: Page): PageApi => {
    // $FlowFixMe I know, flow. This is a bit hacky
    const api: PageApi = Object.create(page);

    api.type = async (selector, text, options) => (await selector).type(text, options);
    api.click = async (selector, options) => (await selector).click(options);
    api.screenshot = async (options) => {
        await waitForPaintEnd(page);
        return watermarkIfNeeded(page.screenshot(options));
    };

    return api;
};

type Skin = 'Movistar' | 'O2' | 'Vivo';

export const openStoryPage = async ({
    section,
    name,
    device = TABLET_DEVICE,
    brand = 'Movistar',
}: {
    section: string,
    name: string,
    device?: Device,
    brand?: Skin,
}): Promise<PageApi> => {
    const page: Page = global.page;
    const browser = global.browser;
    await page.bringToFront();
    await page.setViewport(DEVICES[device].viewport);
    await page.setUserAgent(`${await browser.userAgent()} acceptance-test`);
    await page.goto(buildStoryUrl(section, name, brand, DEVICES[device].platform));

    return createPageApi(page);
};

export const screen: Queries = buildQueryMethods();
