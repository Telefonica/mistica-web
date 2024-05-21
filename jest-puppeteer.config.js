const getConfig = require('@telefonica/acceptance-testing/jest-puppeteer-config');

module.exports = async () => {
    const config = await getConfig();
    config.launch.env = {
        ...process.env,
        TZ: 'UTC',
        LANG: 'es_ES',
        LANGUAGE: 'es_ES',
    };
    return config;
};
