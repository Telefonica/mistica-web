import './fail-test-on-console-error';
import {createServer} from './ssr';

beforeAll(() => {
    (global as any)['__SSR_SERVER__'] = createServer();
    (global as any)['__SSR_SERVER__'].listen(0); // use any free port
});

afterAll(() => {
    (global as any)['__SSR_SERVER__'].close();
});
