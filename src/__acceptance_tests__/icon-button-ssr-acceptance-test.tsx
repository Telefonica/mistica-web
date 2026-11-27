import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr IconButton', async () => {
    await openSSRPage({name: 'icon-button'});
});
