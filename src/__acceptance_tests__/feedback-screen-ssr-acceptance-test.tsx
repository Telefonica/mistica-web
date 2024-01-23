import {openSSRPage} from '../test-utils';

test('ssr success feedback screen', async () => {
    await openSSRPage({name: 'feedback-screen-success', checkHidrationVisualMismatch: true});
});

test('ssr error feedback screen', async () => {
    await openSSRPage({name: 'feedback-screen-error', checkHidrationVisualMismatch: true});
});

test('ssr info feedback screen', async () => {
    await openSSRPage({name: 'feedback-screen-info', checkHidrationVisualMismatch: true});
});
