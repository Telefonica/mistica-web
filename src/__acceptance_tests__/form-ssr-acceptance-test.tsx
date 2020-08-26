import {openSSRPage} from '../test-utils';

test('ssr button on tablet', async () => {
    await openSSRPage({name: 'form', device: 'TABLET'});
});

test('ssr button on mobile ios', async () => {
    await openSSRPage({name: 'form', device: 'MOBILE_IOS'});
});
