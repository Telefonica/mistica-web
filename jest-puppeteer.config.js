const getInitialConfig = require('@telefonica/acceptance-testing/jest-puppeteer-config');

const getConfig = async () => {
    const config = await getInitialConfig();

    if (process.env.CI) {
        config.launch.args = [
            // https://peter.sh/experiments/chromium-command-line-switches/
            '--no-sandbox', // probably not needed in ubuntu
            '--font-render-hinting=none', // this flag is important because we use it when launching dockerized chromium too
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
    }
    console.log(JSON.stringify(config, null, 2));
    return config;
};

module.exports = getConfig;
