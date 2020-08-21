import {openSSRPage} from '../test-utils';

test('ssr spinner', async () => {
    await openSSRPage({name: 'spinner'});
});
