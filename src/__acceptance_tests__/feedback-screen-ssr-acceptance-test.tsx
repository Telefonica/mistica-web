import {openSSRPage} from '../test-utils';

test('ssr success feedback screen', async () => {
    // TODO: fix hydration missmatches and enable the check
    await openSSRPage({name: 'feedback-screen-success', checkHidrationVisualMissmatch: false});
});

test('ssr error feedback screen', async () => {
    // TODO: fix hydration missmatches and enable the check
    await openSSRPage({name: 'feedback-screen-error', checkHidrationVisualMissmatch: false});
});

test('ssr info feedback screen', async () => {
    // TODO: fix hydration missmatches and enable the check
    await openSSRPage({name: 'feedback-screen-info', checkHidrationVisualMissmatch: false});
});
