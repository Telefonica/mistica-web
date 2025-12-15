import path from 'path';
import fs from 'fs';
import os from 'os';
import {openPage, serverHostName, screen, getGlobalPage, PageApi} from '@telefonica/acceptance-testing';
import {MOVISTAR_NEW_SKIN} from '../skins/constants';
import {kebabCase} from 'lodash';

import type {TestViewport} from '@telefonica/acceptance-testing';

export type {ElementHandle} from '@telefonica/acceptance-testing';

export {screen, PageApi};

export type StoryArgs = {[key: string]: string | number | boolean};

const MOBILE_DEVICE_IOS_SMALL = 'MOBILE_IOS_SMALL';
const MOBILE_DEVICE_IOS_INSET = 'MOBILE_IOS_INSET';
const MOBILE_DEVICE_IOS = 'MOBILE_IOS';
const MOBILE_DEVICE_ANDROID = 'MOBILE_ANDROID';
const TABLET_DEVICE = 'TABLET';
const DESKTOP_DEVICE = 'DESKTOP';
const LARGE_DESKTOP_DEVICE = 'LARGE_DESKTOP';

export type Device =
    | typeof MOBILE_DEVICE_IOS_SMALL
    | typeof MOBILE_DEVICE_IOS_INSET
    | typeof MOBILE_DEVICE_IOS
    | typeof MOBILE_DEVICE_ANDROID
    | typeof TABLET_DEVICE
    | typeof DESKTOP_DEVICE
    | typeof LARGE_DESKTOP_DEVICE;

type DeviceCollection = Record<
    Device,
    {
        platform?: string;
        userAgent?: string;
        viewport: TestViewport;
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
    [MOBILE_DEVICE_IOS_INSET]: {
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
            safeAreaInset: {
                // smallest iPhone's bottom inset height on vertical position (iPhone 13 mini)
                bottom: '34px',
            },
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
            isMobile: true,
            hasTouch: true,
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
    [LARGE_DESKTOP_DEVICE]: {
        platform: undefined,
        viewport: {
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
            isMobile: false,
            hasTouch: false,
            isLandscape: false,
        },
    },
};

const buildStoryPath = (id: string, skin?: string, platform?: string, args?: StoryArgs) => {
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

    return `/iframe.html?${params.toString()}`;
};

export const openStoryPage = ({
    id,
    device = TABLET_DEVICE,
    viewport,
    skin = 'Movistar-new',
    args,
    isDarkMode,
}: {
    id: string;
    device?: Device;
    viewport?: TestViewport;
    skin?:
        | 'Movistar'
        | 'Movistar-new'
        | 'Vivo'
        | 'Vivo-new'
        | 'O2'
        | 'O2-new'
        | 'Telefonica'
        | 'Blau'
        | 'Tu'
        | 'Esimflag';
    args?: StoryArgs;
    isDarkMode?: boolean;
}): Promise<PageApi> =>
    openPage({
        path: buildStoryPath(id, skin, DEVICES[device].platform, args),
        userAgent: DEVICES[device].userAgent,
        viewport: viewport ?? DEVICES[device].viewport,
        isDarkMode,
    });

const hydrateSSRPage = async (page: PageApi): Promise<void> => {
    await page.evaluate(() => {
        // @ts-expect-error this executes in the browser, see ssr.tsx
        window.hydrate();
    });
};

const checkHydrationMismatch = async (page: PageApi): Promise<void> => {
    const {testPath, currentTestName} = expect.getState();
    const tmpdir = os.tmpdir();
    const snapshotId = kebabCase(`${path.basename(testPath)}-${currentTestName}`);
    const baselineImagePath = path.join(tmpdir, `${snapshotId}-snap.png`);
    await page.screenshot({path: baselineImagePath});

    await hydrateSSRPage(page);
    const hydrateImage = await page.screenshot();

    try {
        expect(hydrateImage).toMatchImageSnapshot({
            // use the saved ssr snapshot as the baseline
            customSnapshotsDir: tmpdir,
            customSnapshotIdentifier: snapshotId,
            customDiffDir: path.join(
                __dirname,
                '..',
                '__acceptance_tests__',
                '__image_snapshots__',
                '__diff_output__'
            ),
        });
    } catch (error: any) {
        Error.captureStackTrace(error, checkHydrationMismatch);
        throw error;
    } finally {
        fs.unlinkSync(baselineImagePath);
    }
};

/**
 * Renders a page with a React component in the server and opens it in the browser, where it's hydrated client side.
 * `name` is the name (without extension) of a file in the __ssr_pages__ folder. This file exports the component to be rendered.
 */
export const openSSRPage = async ({
    name,
    device = TABLET_DEVICE,
    skin = MOVISTAR_NEW_SKIN,
    checkHidrationVisualMismatch = true,
    prefersColorScheme,
}: {
    name: string;
    device?: Device;
    skin?: string;
    checkHidrationVisualMismatch?: boolean;
    prefersColorScheme?: 'light' | 'dark';
}): Promise<PageApi> => {
    const globalPage = getGlobalPage();
    const port = (global as any)['__SSR_SERVER__'].address().port;

    // Capture browser console.error and console.warn calls that React could trigger when calling hydrate()
    globalPage.on('console', async (msg) => {
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

    const page = await openPage({
        url: `http://${serverHostName}:${port}/${name}?skin=${skin}`,
        userAgent: DEVICES[device].userAgent,
        viewport: DEVICES[device].viewport,
    });

    if (prefersColorScheme) {
        await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: prefersColorScheme}]);
    }

    if (checkHidrationVisualMismatch) {
        await checkHydrationMismatch(page);
    } else {
        await hydrateSSRPage(page);
    }

    return page;
};

export const setRootFontSize = (px: number): Promise<void> =>
    page.$eval('html', (e, px) => e.setAttribute('style', `font-size: ${px}px;`), px);

export const waitFor = <T,>(
    expectation: () => Promise<T> | T,
    timeout = 10000,
    interval = 50
): Promise<T> => {
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
        const rejectOrRerun = (error: unknown) => {
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
            } catch (error: any) {
                rejectOrRerun(error);
            }
        };
        setTimeout(runExpectation, 0);
    });
};

// about SSIM: https://github.com/americanexpress/jest-image-snapshot#%EF%B8%8F-api
// We use this config for screenshot tests that tend to be flaky in CI because of subtle differences in the rendering
export const ssimScreenshotConfig = {
    comparisonMethod: 'ssim',
    failureThreshold: 0.001,
    failureThresholdType: 'percent',
} as const;
