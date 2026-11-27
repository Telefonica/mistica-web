import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr stepper', async () => {
    await openSSRPage({name: 'stepper'});
});
