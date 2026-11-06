import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr header', async () => {
    await openSSRPage({name: 'header'});
});
