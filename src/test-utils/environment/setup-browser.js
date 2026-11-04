const {chromium} = require('playwright');
const {setup, teardown} = require('jest-dev-server');

module.exports = async (_globalConfig, projectConfig) => {
    if (projectConfig.displayName.name === 'acceptance') {
        global.misticaTestServers = await setup({
            command: process.env.CI ? 'yarn serve-static-storybook' : 'yarn storybook-for-acceptance-tests',
            port: 6006,
            launchTimeout: 120000,
            usedPortAction: process.env.CI ? 'error' : 'ignore',
        });
    }
    if (!global.misticaBrowserServer) {
        try {
            global.misticaBrowserServer = await chromium.launchServer({
                headless: process.env.HEADLESS !== 'false',
                args: ['--font-render-hinting=none', '--disable-lcd-text', '--disable-smooth-scrolling'],
            });
        } catch (error) {
            await teardown(global.misticaTestServers || []);
            global.misticaTestServers = undefined;
            throw error;
        }
        process.env.MISTICA_PLAYWRIGHT_ENDPOINT = global.misticaBrowserServer.wsEndpoint();
    }
};
