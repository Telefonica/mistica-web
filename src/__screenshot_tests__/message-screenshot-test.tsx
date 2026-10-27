import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

test('Message error examples on Blau alternative', async () => {
    await openStoryPage({
        id: 'components-message--error-examples',
        device: 'MOBILE_IOS',
        skin: 'Blau',
    });
    expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
});

test.each(['MOBILE_IOS', 'DESKTOP'] as const)('Message conversation - %s', async (device: Device) => {
    await openStoryPage({id: 'components-message--conversation', device});
    const messages = await screen.findByTestId('messages');
    expect(await messages.screenshot()).toMatchImageSnapshot();
});

test.each(['default', 'brand', 'alternative', 'negative', 'media'])(
    'Message over %s',
    async (variantOutside) => {
        await openStoryPage({
            id: 'components-message--default',
            device: 'MOBILE_IOS',
            args: {variantOutside},
        });
        expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
    }
);

test.each(['incoming', 'outgoing'])('Message %s with actions and slots', async (type) => {
    await openStoryPage({
        id: 'components-message--default',
        device: 'MOBILE_IOS',
        args: {type, side: true, footerSlot: true, actions: true, actionsPosition: 'side'},
    });
    expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
});

test('Message dark mode', async () => {
    await openStoryPage({id: 'components-message--conversation', device: 'MOBILE_IOS', isDarkMode: true});
    expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
});

test('Message slots and actions', async () => {
    await openStoryPage({id: 'components-message--slots-and-actions', device: 'MOBILE_IOS'});
    expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
});

test.each(['side', 'footer'])('Message error with content and %s actions', async (actionsPosition) => {
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
    expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
});

test.each(['default', 'alternative'])('Message unboxed over %s', async (variantOutside) => {
    await openStoryPage({
        id: 'components-message--default',
        device: 'MOBILE_IOS',
        args: {boxed: false, variantOutside},
    });
    expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
});

test.each([
    {maxWidth: '100px', actions: false},
    {maxWidth: '240px', actions: true},
])('Message error readability with maxWidth $maxWidth', async ({maxWidth, actions}) => {
    await openStoryPage({
        id: 'components-message--default',
        device: 'MOBILE_IOS',
        args: {
            type: 'outgoing',
            asset: false,
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
    expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
});
