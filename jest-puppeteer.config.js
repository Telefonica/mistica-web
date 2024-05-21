const configPromise = require('@telefonica/acceptance-testing/jest-puppeteer-config');

module.exports = (async () => {
    const config = await configPromise;

    config.launch.env = {
        ...process.env,
        TZ: 'UTC',
        LANG: 'es_ES',
        LANGUAGE: 'es_ES',
    };
    config.launch.dumpio = true;
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
        '--headless=new',
        '--hide-scrollbars',
        '--no-sandbox',
        '--disabled-setupid-sandbox',
        '--font-render-hinting=none',
        '--disable-font-subpixel-positioning',
        '--remote-debugging-port=9222', // https://github.com/puppeteer/puppeteer/issues/8546
        '--remote-debugging-address=0.0.0.0',
        '--ignore-certificate-errors',
    ];
    console.log(config);
    return config;
})();
