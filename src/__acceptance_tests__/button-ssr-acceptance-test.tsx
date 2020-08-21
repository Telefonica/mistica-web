import {openSSRPage} from '../test-utils';

test('ssr', async () => {
    await openSSRPage({name: 'button'});
});
