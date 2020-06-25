import {configureToMatchImageSnapshot} from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.0005,
    failureThresholdType: 'percent',
});

const argv = process.execArgv.join();
const isDebug = argv.includes('inspect') || argv.includes('debug');
jest.setTimeout(isDebug ? 3600000 : 30000);

expect.extend({toMatchImageSnapshot});
