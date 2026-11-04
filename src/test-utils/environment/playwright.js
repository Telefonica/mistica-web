const {TestEnvironment} = require('jest-environment-node');
const {chromium} = require('playwright');

module.exports = class PlaywrightEnvironment extends TestEnvironment {
    async setup() {
        await super.setup();
        this.global.browser = await chromium.connect(process.env.MISTICA_PLAYWRIGHT_ENDPOINT);
        const page = await this.global.browser.newPage();
        this.global.browserUserAgent = await page.evaluate(() => navigator.userAgent);
        await page.close();
    }

    async teardown() {
        await this.global.browser?.close();
        await super.teardown();
    }
};
