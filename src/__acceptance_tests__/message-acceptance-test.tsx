import {openStoryPage, screen} from '../test-utils';

const story = 'components-message--default';

test('Message wraps within its maximum width on mobile with side actions', async () => {
    await openStoryPage({
        id: story,
        device: 'MOBILE_IOS',
        args: {text: 'A very long message '.repeat(30), actions: 'side', side: true},
    });
    const container = await screen.findByTestId('messages');
    const message = await screen.findByTestId('Message');
    const bounds = await message.boundingBox();
    if (!bounds) {
        throw new Error('Message bounds not found');
    }
    const availableWidth = await container.evaluate(
        (element) =>
            element.clientWidth -
            parseFloat(getComputedStyle(element).paddingLeft) -
            parseFloat(getComputedStyle(element).paddingRight)
    );
    expect(bounds.width).toBeLessThanOrEqual(availableWidth * 0.8 + 1);
    const hasOverflow = await message.evaluate((element) => element.scrollWidth > element.clientWidth + 1);
    expect(hasOverflow).toBe(false);
});

test('Message uses an inline timestamp for short text', async () => {
    await openStoryPage({id: story, device: 'MOBILE_IOS', args: {text: 'Hi', senderName: '', asset: false}});
    const text = await screen.findByText('Hi');
    const timestamp = await screen.findByText('13:32');
    const textBounds = await text.boundingBox();
    const timestampBounds = await timestamp.boundingBox();
    if (!textBounds || !timestampBounds) {
        throw new Error('Message text or timestamp bounds not found');
    }
    expect(timestampBounds.x).toBeGreaterThan(textBounds.x + textBounds.width);
    expect(Math.abs(timestampBounds.y - textBounds.y)).toBeLessThan(8);
});

test('Message retry replaces the error with its delivered timestamp', async () => {
    await openStoryPage({id: 'components-message--conversation', device: 'MOBILE_IOS'});
    await (
        await screen.findByRole('button', {name: 'Tú: Tuesday, please. No enviado. Toca para reintentar.'})
    ).click();
    await screen.findByText('16:50');
    const messages = await screen.findByTestId('messages');
    expect(await messages.evaluate((element) => element.querySelector('[role=alert]'))).toBeNull();
});

test('Outgoing assets align with the bubble when a footer is present', async () => {
    await openStoryPage({
        id: story,
        device: 'MOBILE_IOS',
        args: {type: 'outgoing', footer: true, actions: 'side'},
    });
    const bubble = await screen.findByTestId('MessageBubble');
    const avatar = await screen.findByTestId('Avatar');
    const bubbleBounds = await bubble.boundingBox();
    const avatarBounds = await avatar.boundingBox();
    if (!bubbleBounds || !avatarBounds) {
        throw new Error('Message bubble or avatar bounds not found');
    }
    expect(avatarBounds.y + avatarBounds.height).toBeCloseTo(bubbleBounds.y + bubbleBounds.height, 0);
});
