import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr popover', async () => {
    await openSSRPage({name: 'popover'});
});
