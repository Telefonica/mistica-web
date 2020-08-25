import {openSSRPage} from '../test-utils';

test('ssr button', async () => {
    await openSSRPage({name: 'button'});
});
