import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr callout', async () => {
    await openSSRPage({name: 'callout'});
});
