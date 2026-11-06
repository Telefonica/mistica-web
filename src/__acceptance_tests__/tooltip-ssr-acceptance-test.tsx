import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr tooltip', async () => {
    await openSSRPage({name: 'tooltip'});
});
