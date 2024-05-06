import {openSSRPage} from '../test-utils';

test('ssr success feedback screen', async () => {
    // The SuccessFeedbackScreen renders the background using a Portal. The Portal node is
    // created in runtime so visual result of the SSR vs client side result will be different.
    await openSSRPage({name: 'feedback-screen-success', checkHidrationVisualMismatch: false});
});

test('ssr error feedback screen', async () => {
    await openSSRPage({name: 'feedback-screen-error', checkHidrationVisualMismatch: true});
});

test('ssr info feedback screen', async () => {
    await openSSRPage({name: 'feedback-screen-info', checkHidrationVisualMismatch: true});
});
