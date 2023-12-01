import {openSSRPage} from '../test-utils';

test('ssr carousel mobile', async () => {
    await openSSRPage({name: 'carousel', device: 'MOBILE_IOS'});
});

test('ssr carousel tablet', async () => {
    // TODO: fix hydration missmatches and enable the check
    await openSSRPage({name: 'carousel', device: 'TABLET', checkHidrationVisualMissmatch: false});
});

test('ssr carousel desktop', async () => {
    // TODO: fix hydration missmatches and enable the check
    await openSSRPage({name: 'carousel', device: 'DESKTOP', checkHidrationVisualMissmatch: false});
});
