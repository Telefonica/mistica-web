import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr tabs', async () => {
    await openSSRPage({name: 'tabs'});
});
