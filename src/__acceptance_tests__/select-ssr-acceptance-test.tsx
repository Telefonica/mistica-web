import {openSSRPage} from '../test-utils';

test('ssr select', async () => {
    await openSSRPage({name: 'select', device: 'MOBILE_IOS'});
});

// This test covers this fix: https://github.com/Telefonica/mistica-web/pull/1421
// The test has nothing to do with the Select component, it could use any other component as long as it
// renders with different colors in dark/light mode
test('ssr select dark mode', async () => {
    await openSSRPage({name: 'select', device: 'MOBILE_IOS', prefersColorScheme: 'dark'});
});
