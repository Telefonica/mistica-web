import './fail-test-on-console-error';
import {createServer} from './ssr';
import {configureToMatchImageSnapshot} from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0,
    failureThresholdType: 'percent',
});
expect.extend({toMatchImageSnapshot});

const argv = process.execArgv.join();
const isDebug = argv.includes('inspect') || argv.includes('debug');
jest.setTimeout(isDebug ? 3600000 : 30000);

beforeAll(() => {
    (global as any).__SSR_SERVER__ = createServer();
    (global as any).__SSR_SERVER__.listen(0); // use any free port
});

afterAll(() => {
    (global as any).__SSR_SERVER__.close();
});
