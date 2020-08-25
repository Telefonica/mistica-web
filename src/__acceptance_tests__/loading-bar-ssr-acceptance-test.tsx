import {openSSRPage} from '../test-utils';

test('ssr loading bar', async () => {
    await openSSRPage({name: 'loading-bar'});
});
