import {openSSRPage} from '../test-utils';

test('ssr success feedback screen', async () => {
    // TODO: fix hydration mismatches and enable the check
    await openSSRPage({name: 'feedback-screen-success', checkHidrationVisualMismatch: true});
});

test('ssr error feedback screen', async () => {
    // TODO WEB-1673: fix hydration mismatches and enable the check
    await openSSRPage({name: 'feedback-screen-error', checkHidrationVisualMismatch: false});
});

test('ssr info feedback screen', async () => {
    // TODO WEB-1673: fix hydration mismatches and enable the check
    await openSSRPage({name: 'feedback-screen-info', checkHidrationVisualMismatch: false});
});
