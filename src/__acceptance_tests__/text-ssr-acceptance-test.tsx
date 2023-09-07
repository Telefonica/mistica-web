import {openSSRPage} from '../test-utils';

test('ssr text', async () => {
    await openSSRPage({name: 'text'});
});
