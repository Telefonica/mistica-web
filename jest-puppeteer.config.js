const configPromise = require('@telefonica/acceptance-testing/jest-puppeteer-config');

module.exports = (async () => {
    const config = await configPromise;

    config.launch.env = {
        // ...process.env,
        // TZ: 'UTC',
        // LANG: 'es_ES',
        // LANGUAGE: 'es_ES',
        // DBUS_SESSION_BUS_ADDRESS: 'autolaunch:',
        // DISPLAY: ':0', // https://github.com/puppeteer/puppeteer/issues/8148
    };
    // config.launch.dumpio = true;
    // config.launch.headless = 'new';
    console.log(config);
    return config;
})();
