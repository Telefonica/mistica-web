import {openSSRPage} from '../test-utils';

test('ssr carousel mobile', async () => {
    await openSSRPage({name: 'carousel', device: 'MOBILE_IOS'});
});

test('ssr carousel tablet', async () => {
    await openSSRPage({name: 'carousel', device: 'TABLET'});
});

test('ssr carousel desktop', async () => {
    await openSSRPage({name: 'carousel', device: 'DESKTOP'});
});
