import {openSSRPage} from '../test-utils';

test('ssr carousel mobile', async () => {
    await openSSRPage({name: 'carousel', device: 'MOBILE_IOS'});
});

test('ssr carousel tablet', async () => {
    // TODO WEB-1672: fix hydration mismatches and enable the check
    await openSSRPage({name: 'carousel', device: 'TABLET', checkHidrationVisualMismatch: false});
});

test('ssr carousel desktop', async () => {
    // TODO WEB-1672: fix hydration mismatches and enable the check
    await openSSRPage({name: 'carousel', device: 'DESKTOP', checkHidrationVisualMismatch: false});
});
