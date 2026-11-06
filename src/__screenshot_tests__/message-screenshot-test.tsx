import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

test('Message error examples on Blau alternative', async () => {
    await openStoryPage({
        id: 'components-message--error-examples',
        device: 'MOBILE_IOS',
        skin: 'Blau',
        args: {variantOutside: 'alternative'},
    });
    await expectScreenshot(await screen.findByTestId('messages'));
});

for (const testCase of ['MOBILE_IOS', 'DESKTOP'] as const) {
    const device = testCase as Device;
    test(`Message conversation - ${testCase}`, async () => {
        await openStoryPage({id: 'components-message--conversation', device});
        const messages = await screen.findByTestId('messages');
        await expectScreenshot(messages);
    });
}

for (const testCase of ['default', 'brand', 'alternative', 'negative', 'media']) {
    const variantOutside = testCase;
    test(`Message over ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-message--default',
            device: 'MOBILE_IOS',
            args: {variantOutside},
        });
        await expectScreenshot(await screen.findByTestId('messages'));
    });
}

for (const testCase of ['incoming', 'outgoing']) {
    const type = testCase;
    test(`Message ${testCase} with actions and slots`, async () => {
        await openStoryPage({
            id: 'components-message--default',
            device: 'MOBILE_IOS',
            args: {type, sideSlot: true, footerSlot: true, actions: true, actionsPosition: 'side'},
        });
        await expectScreenshot(await screen.findByTestId('messages'));
    });
}

test('Message dark mode', async () => {
    await openStoryPage({id: 'components-message--conversation', device: 'MOBILE_IOS', isDarkMode: true});
    await expectScreenshot(await screen.findByTestId('messages'));
});

test('Message slots and actions', async () => {
    await openStoryPage({id: 'components-message--slots-and-actions', device: 'MOBILE_IOS'});
    await expectScreenshot(await screen.findByTestId('messages'));
});

for (const testCase of ['side', 'footer']) {
    const actionsPosition = testCase;
    test(`Message error with content and ${testCase} actions`, async () => {
        await openStoryPage({
            id: 'components-message--error-with-slots',
            device: 'MOBILE_IOS',
            args: {
                type: 'outgoing',
                error: true,
                footerSlot: true,
                actions: true,
                actionsPosition,
            },
        });
        await expectScreenshot(await screen.findByTestId('messages'));
    });
}

for (const testCase of ['default', 'alternative']) {
    const variantOutside = testCase;
    test(`Message unboxed over ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-message--default',
            device: 'MOBILE_IOS',
            args: {boxed: false, variantOutside},
        });
        await expectScreenshot(await screen.findByTestId('messages'));
    });
}

for (const testCase of [
    {maxWidth: '100px', actions: false},
    {maxWidth: '240px', actions: true},
]) {
    const {maxWidth, actions} = testCase;
    test(`Message error readability with maxWidth ${testCase.maxWidth}`, async () => {
        await openStoryPage({
            id: 'components-message--default',
            device: 'MOBILE_IOS',
            args: {
                type: 'outgoing',
                assetType: 'none',
                senderName: '',
                contentText: 'Ok',
                maxWidth,
                error: true,
                errorMessage: 'This message could not be sent please try again',
                actions,
                actionsCount: 2,
                actionsPosition: 'side',
            },
        });
        await expectScreenshot(await screen.findByTestId('messages'));
    });
}

for (const testCase of [true, false]) {
    const footerSlot = testCase;
    test(`Message short bubble with footerSlot ${testCase} and actions`, async () => {
        await openStoryPage({
            id: 'components-message--footer-sizing',
            device: 'MOBILE_IOS',
            args: {footerSlot, error: true},
        });
        await expectScreenshot(await screen.findByTestId('messages'));
    });
}
