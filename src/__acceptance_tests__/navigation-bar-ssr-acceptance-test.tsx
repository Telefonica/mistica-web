import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr MainNavigationBar', async () => {
    await openSSRPage({name: 'main-navigation-bar', device: 'MOBILE_IOS'});
});

test('ssr MainNavigationBar large', async () => {
    test.setTimeout(300000);

    await openSSRPage({name: 'main-navigation-bar-large', device: 'MOBILE_IOS'});
});
