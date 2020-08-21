import {openSSRPage} from '../test-utils';

test('ssr list', async () => {
    await openSSRPage({name: 'list'});
});
