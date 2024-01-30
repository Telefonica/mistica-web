import {openSSRPage} from '../test-utils';

test('ssr MainNavigationBar', async () => {
    await openSSRPage({name: 'main-navigation-bar', device: 'MOBILE_IOS'});
});

test('ssr MainNavigationBar large', async () => {
    await openSSRPage({name: 'main-navigation-bar-large', device: 'MOBILE_IOS'});
}, 300000);
