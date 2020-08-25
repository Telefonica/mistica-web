import {openSSRPage} from '../test-utils';

test('ssr header', async () => {
    await openSSRPage({name: 'header'});
});
