import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr timer', async () => {
    await openSSRPage({name: 'timer'});
});
