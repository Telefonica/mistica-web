const configPromise = require('@telefonica/acceptance-testing/jest-puppeteer-config');
module.exports = (async () => {
    const config = await configPromise;
    config.launch.env = {
        TZ: 'UTC',
        LANG: 'es_ES',
        LANGUAGE: 'es_ES',
    };
    return config;
})();
