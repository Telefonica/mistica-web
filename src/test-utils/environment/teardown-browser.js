const {teardown} = require('jest-dev-server');

module.exports = async () => {
    await global.misticaBrowserServer?.close();
    global.misticaBrowserServer = undefined;
    if (global.misticaTestServers) {
        await teardown(global.misticaTestServers);
        global.misticaTestServers = undefined;
    }
};
