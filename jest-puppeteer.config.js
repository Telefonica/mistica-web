const config = require('@telefonica/acceptance-testing/jest-puppeteer-config');

if (process.env.CI) {
    config.launch.executablePath = undefined;
    config.launch.args = [];
    config.connect = 'http://localhost:9222';
}

console.log(JSON.stringify(config, null, 2));

module.exports = config;
