import {openSSRPage} from '../test-utils';

test('ssr select', async () => {
    await openSSRPage({name: 'select', device: 'MOBILE_IOS'});
});
