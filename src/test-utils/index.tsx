import {
    openPage,
    serverHostName,
    screen,
    getGlobalPage,
    PageApi,
    Viewport,
} from '@telefonica/acceptance-testing';
import {MOVISTAR_SKIN} from '../skins/constants';

export type {ElementHandle} from '@telefonica/acceptance-testing';
export {screen, PageApi};

export type StoryArgs = {[key: string]: string | number | boolean};

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
    skin = 'Movistar',
    args,
    isDarkMode,
}: {
    id: string;
    device?: Device;
    skin?: 'Movistar' | 'Vivo' | 'O2' | 'O2-classic' | 'Blau';
    args?: StoryArgs;
    isDarkMode?: boolean;
}): Promise<PageApi> =>
    openPage({
        path: buildStoryPath(id, skin, DEVICES[device].platform, args),
        userAgent: DEVICES[device].userAgent,
        viewport: DEVICES[device].viewport,
        isDarkMode,
    });

/**
 * Renders a page with a React component in the server and opens it in the browser, where it's hydrated client side.
 * `name` is the name (without extension) of a file in the __ssr_pages__ folder. This file exports the component to be rendered.
 */
export const openSSRPage = ({
    name,
    device = TABLET_DEVICE,
    skin = MOVISTAR_SKIN,
}: {
    name: string;
    device?: Device;
    skin?: string;
}): Promise<PageApi> => {
    const page = getGlobalPage();
    const port = (global as any)['__SSR_SERVER__'].address().port;

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

    return openPage({
        url: `http://${serverHostName}:${port}/${name}?skin=${skin}`,
        userAgent: DEVICES[device].userAgent,
        viewport: DEVICES[device].viewport,
    });
};

export const setRootFontSize = (px: number): Promise<void> =>
    page.$eval('html', (e, px) => e.setAttribute('style', `font-size: ${px}px;`), px);
