import {openSSRPage} from '../test-utils';

test('ssr form', async () => {
    await openSSRPage({name: 'form'});
});
