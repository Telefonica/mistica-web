import {openSSRPage} from '../test-utils';

test('ssr loading bar', async () => {
    // don't check hydration missmatch because loading bar is only rendered client side inside a portal
    await openSSRPage({name: 'loading-bar', checkHidrationVisualMissmatch: false});
});
