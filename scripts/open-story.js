const fs = require('fs');
const os = require('os');
const path = require('path');
const {execSync} = require('child_process');
const puppeteer = require('puppeteer');

const CDP_URL = 'http://localhost:9223';
const CDP_HOST = CDP_URL.replace(/^https?:\/\//, '');
const DOCKER_COMPOSE_FILE = path.join(
    __dirname,
    '..',
    'node_modules',
    '@telefonica',
    'acceptance-testing',
    'docker-compose.yaml'
);
const STORYBOOK_PORT = 6006;
const STORYBOOK_HOST = process.platform === 'linux' ? '172.17.0.1' : 'host.docker.internal';

const IOS_USER_AGENT =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
const ANDROID_USER_AGENT =
    'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36';

const DEVICES = {
    MOBILE_IOS_SMALL: {
        platform: 'ios',
        userAgent: IOS_USER_AGENT,
        viewport: {width: 320, height: 480, deviceScaleFactor: 2, isMobile: true, hasTouch: true},
    },
    MOBILE_IOS: {
        platform: 'ios',
        userAgent: IOS_USER_AGENT,
        viewport: {width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true},
    },
    MOBILE_ANDROID: {
        platform: 'android',
        userAgent: ANDROID_USER_AGENT,
        viewport: {width: 411, height: 823, deviceScaleFactor: 2, isMobile: true, hasTouch: true},
    },
    TABLET: {
        userAgent: '',
        viewport: {width: 800, height: 600, deviceScaleFactor: 1, isMobile: true, hasTouch: true},
    },
    DESKTOP: {
        viewport: {width: 1280, height: 800, deviceScaleFactor: 1, isMobile: false, hasTouch: false},
    },
    LARGE_DESKTOP: {
        viewport: {width: 1600, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false},
    },
    EXTRA_LARGE_DESKTOP: {
        viewport: {width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false, hasTouch: false},
    },
};

const STABILITY_STYLES = `
    *, *:after, *:before {
        transition-delay: 0s !important;
        transition-duration: 0s !important;
        animation-delay: -0.0001s !important;
        animation-duration: 0s !important;
        animation-play-state: paused !important;
        caret-color: transparent !important;
        font-variant-ligatures: none !important;
    }
    *::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
    }
`;

const LOCAL_BROWSER_ARGS = [
    '--no-sandbox',
    '--font-render-hinting=none',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--disable-features=site-per-process',
    '--disable-hang-monitor',
    '--disable-popup-blocking',
    '--disable-prompt-on-repost',
    '--disable-sync',
    '--disable-translate',
    '--disable-smooth-scrolling',
];

const INSTALLED_BROWSERS = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
];

const CACHED_BROWSER_EXECUTABLES = [
    'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    'chrome',
    'chrome.exe',
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cachedBrowsers = () => {
    const root = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome');
    if (!fs.existsSync(root)) {
        return [];
    }

    return fs
        .readdirSync(root)
        .sort()
        .reverse()
        .flatMap((build) =>
            fs
                .readdirSync(path.join(root, build))
                .flatMap((folder) =>
                    CACHED_BROWSER_EXECUTABLES.map((executable) => path.join(root, build, folder, executable))
                )
        );
};

const localBrowserPaths = () =>
    [process.env.BROWSE_BROWSER, ...cachedBrowsers(), ...INSTALLED_BROWSERS].filter(
        (candidate) => candidate && fs.existsSync(candidate)
    );

const launchLocalBrowser = async ({viewport, slowMo, log}) => {
    const candidates = [undefined, ...localBrowserPaths()];

    for (const executablePath of candidates) {
        const name = executablePath ?? 'the Chromium of puppeteer';

        try {
            const browser = await puppeteer.launch({
                headless: false,
                slowMo,
                ignoreHTTPSErrors: true,
                executablePath,
                defaultViewport: null,
                args: [...LOCAL_BROWSER_ARGS, `--window-size=${viewport.width},${viewport.height + 90}`],
                env: {...process.env, TZ: 'UTC', LANG: 'es_ES', LANGUAGE: 'es_ES'},
            });

            log(`Local browser: ${name}`);
            return browser;
        } catch (error) {
            log(`Cannot start ${name}: ${error.message.split('\n')[0]}`);
        }
    }

    return null;
};

const isContainerReady = async () => {
    try {
        const response = await fetch(`${CDP_URL}/json/version`, {signal: AbortSignal.timeout(2000)});
        return response.ok;
    } catch (error) {
        return false;
    }
};

const ensureContainer = async ({log = console.log} = {}) => {
    if (await isContainerReady()) {
        return;
    }

    log('Starting the dockerized Chromium…');
    execSync(`docker compose -f ${DOCKER_COMPOSE_FILE} up -d`, {stdio: 'inherit'});

    for (let attempt = 0; attempt < 60; attempt++) {
        if (await isContainerReady()) {
            return;
        }
        await wait(1000);
    }

    throw new Error(`The dockerized Chromium did not answer at ${CDP_URL}`);
};

const isStorybookReady = async () => {
    try {
        const response = await fetch(`http://localhost:${STORYBOOK_PORT}/index.json`, {
            signal: AbortSignal.timeout(3000),
        });
        return response.ok;
    } catch (error) {
        return false;
    }
};

const buildStoryUrl = (storyId, {skin, platform, args, host = STORYBOOK_HOST}) => {
    const params = new URLSearchParams();
    params.set('id', storyId);
    params.set('viewMode', 'story');

    if (skin) {
        params.set('skin', skin);
    }

    if (platform) {
        params.set('platform', platform);
    }

    if (args && Object.keys(args).length > 0) {
        params.set(
            'args',
            Object.entries(args)
                .map(([key, value]) => `${key}:${value}`)
                .join(';')
        );
    }

    return `http://${host}:${STORYBOOK_PORT}/iframe.html?${params.toString()}`;
};

const devtoolsUrl = async (page) => {
    const client = await page.target().createCDPSession();
    const {targetInfo} = await client.send('Target.getTargetInfo');
    await client.detach();

    return `${CDP_URL}/devtools/inspector.html?ws=${CDP_HOST}/devtools/page/${targetInfo.targetId}`;
};

const openStory = async (storyId, options = {}) => {
    const {
        device = 'DESKTOP',
        args,
        skin = 'Movistar',
        darkMode = false,
        viewport,
        acceptanceMode = true,
        headed = false,
        slowMo = headed ? 50 : 0,
        log = console.log,
    } = options;

    const deviceConfig = DEVICES[device];
    if (!deviceConfig) {
        throw new Error(`Unknown device "${device}". Use one of ${Object.keys(DEVICES).join(', ')}`);
    }

    if (!(await isStorybookReady())) {
        throw new Error(
            `Storybook does not answer on port ${STORYBOOK_PORT}. Run "yarn storybook" in another terminal.`
        );
    }

    const targetViewport = viewport ?? deviceConfig.viewport;
    const localBrowser = headed ? await launchLocalBrowser({viewport: targetViewport, slowMo, log}) : null;

    if (headed && !localBrowser) {
        log('No local browser started. Falling back to the dockerized Chromium.');
    }

    const connectToContainer = async () => {
        await ensureContainer({log});
        const {webSocketDebuggerUrl} = await fetch(`${CDP_URL}/json/version`).then((response) =>
            response.json()
        );
        return puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl, slowMo});
    };

    const browser = localBrowser ?? (await connectToContainer());
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    const messages = [];
    const pageErrors = [];
    const failedRequests = [];

    page.on('console', (message) => {
        messages.push({type: message.type(), text: message.text()});
    });
    page.on('pageerror', (error) => {
        pageErrors.push({message: error.message, stack: error.stack});
    });
    page.on('requestfailed', (request) => {
        failedRequests.push({url: request.url(), reason: request.failure()?.errorText});
    });

    await page.setViewport(targetViewport);

    const currentUserAgent = await browser.userAgent();
    await page.setUserAgent(
        `${deviceConfig.userAgent ?? currentUserAgent}${acceptanceMode ? ' acceptance-test' : ''}`
    );
    await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: darkMode ? 'dark' : 'light'}]);

    if (acceptanceMode) {
        await page.evaluateOnNewDocument((stabilityStyles) => {
            const style = document.createElement('style');
            style.innerHTML = stabilityStyles;
            window.addEventListener('DOMContentLoaded', () => {
                document.head.appendChild(style);
            });
        }, STABILITY_STYLES);
    }

    const url = buildStoryUrl(storyId, {
        skin,
        platform: deviceConfig.platform,
        args,
        host: localBrowser ? 'localhost' : STORYBOOK_HOST,
    });
    log(`Opening ${url}`);
    await page.goto(url, {waitUntil: 'networkidle0'});
    await page.waitForFunction('document.fonts.status === "loaded"');

    const close = async () => {
        if (localBrowser) {
            await localBrowser.close();
            return;
        }

        await page.close();
        await context.close();
        browser.disconnect();
    };

    return {
        browser,
        context,
        page,
        headed: Boolean(localBrowser),
        errors: {messages, pageErrors, failedRequests},
        close,
    };
};

const measure = (page, selector) =>
    page.evaluate((currentSelector) => {
        const element = document.querySelector(currentSelector);
        if (!element) {
            return null;
        }

        const rect = element.getBoundingClientRect();
        const computedStyle = getComputedStyle(element);

        return {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            padding: computedStyle.padding,
            margin: computedStyle.margin,
            border: computedStyle.border,
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
            font: computedStyle.font,
            zIndex: computedStyle.zIndex,
        };
    }, selector);

const findByText = async (page, text) => {
    const handle = await page.evaluateHandle((currentText) => {
        const isVisible = (element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== 'hidden';
        };

        const candidates = Array.from(document.querySelectorAll('body *')).filter(
            (element) =>
                element.children.length === 0 &&
                element.textContent.trim().includes(currentText) &&
                isVisible(element)
        );

        const target = candidates[0];
        if (!target) {
            return null;
        }

        return target.closest('a, button, [role="button"], [role="link"], [tabindex]') ?? target;
    }, text);

    return handle.asElement();
};

module.exports = {
    CDP_URL,
    DEVICES,
    STORYBOOK_PORT,
    buildStoryUrl,
    devtoolsUrl,
    ensureContainer,
    findByText,
    measure,
    openStory,
    wait,
};
