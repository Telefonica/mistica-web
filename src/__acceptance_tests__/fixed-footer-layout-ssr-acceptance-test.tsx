import {openSSRPage} from '../test-utils';

test('ssr select', async () => {
    await openSSRPage({name: 'fixed-footer-layout'});
});
