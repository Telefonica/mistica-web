const configPromise = require('@telefonica/acceptance-testing/jest-puppeteer-config');
module.exports = (async () => {
    const config = await configPromise;
    config.launch.env = {
        TZ: 'UTC',
        LANG: 'es_ES',
        LANGUAGE: 'es_ES',
        DISPLAY: process.env.DISPLAY,
        XDG_CACHE_HOME: '/tmp/.xdg-cache',
        XDG_RUNTIME_DIR: '/run/user/1000',
    };
    console.log('config', config);
    return config;
})();
