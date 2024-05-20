const getInitialConfig = require('@telefonica/acceptance-testing/jest-puppeteer-config');

const getConfig = async () => {
    const config = await getInitialConfig();

    if (process.env.CI) {
        config.launch.args = [
            '--lang=es_ES',
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
            '--disable-gpu',
            '--metrics-recording-only',
            '--no-first-run',
            '--safebrowsing-disable-auto-update',
            '--enable-automation',
            '--password-store=basic',
            '--use-mock-keychain',
            '--headless',
            '--hide-scrollbars',
            // Disable sandbox mode
            '--no-sandbox',
            // Avoids font rendering differences between headless/headfull
            '--font-render-hinting=none',
            '--force-color-profile=sRGB',
            '--disable-font-subpixel-positioning',
            // Expose port 9222 for remote debugging
            '--remote-debugging-port=9222',
            '--remote-debugging-address=0.0.0.0',
            '--ignore-certificate-errors',
        ];
    }
    console.log(JSON.stringify(config, null, 2));
    return config;
};

module.exports = getConfig;
