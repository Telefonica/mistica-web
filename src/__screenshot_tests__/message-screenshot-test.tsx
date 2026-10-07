import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

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
        args: {type, side: true, footer: true, actions: 'side'},
    });
    expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
});

test('Message dark mode', async () => {
    await openStoryPage({id: 'components-message--conversation', device: 'MOBILE_IOS', isDarkMode: true});
    expect(await (await screen.findByTestId('messages')).screenshot()).toMatchImageSnapshot();
});
