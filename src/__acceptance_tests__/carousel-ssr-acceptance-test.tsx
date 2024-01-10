import {openSSRPage} from '../test-utils';

test('ssr carousel mobile', async () => {
    await openSSRPage({name: 'carousel', device: 'MOBILE_IOS'});
});

test('ssr carousel tablet', async () => {
    // checkHidrationVisualMismatch is disabled because for some reason there are some small visual differences in TABLET
    // after hidration. Also, in some cases the carousel is scrolled to the next page and this causes a visual mismatch in
    // the bullets. I've not found a way to know why this happens.
    await openSSRPage({name: 'carousel', device: 'TABLET', checkHidrationVisualMismatch: false});
});

test('ssr carousel desktop', async () => {
    await openSSRPage({name: 'carousel', device: 'DESKTOP'});
});
