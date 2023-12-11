import {openSSRPage} from '../test-utils';

test('ssr popover', async () => {
    // don't check hydration mismatch because popovers are only rendered client side inside a portal
    await openSSRPage({name: 'popover', checkHidrationVisualMismatch: false});
});
