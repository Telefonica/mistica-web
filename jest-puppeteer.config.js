const config = require('@telefonica/acceptance-testing/jest-puppeteer-config');

if (process.env.CI) {
    config.launch.executablePath = undefined;
    config.launch.args = [];
    config.connect = {
        browserUrl: 'http://localhost:9222',
        ignoreHTTPSErrors: true,
        headless: true,
        slowMo: 0,
    };
}

console.log(JSON.stringify(config, null, 2));

module.exports = config;
