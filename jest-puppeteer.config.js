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
    console.log(config);
    return config;
})();
