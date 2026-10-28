import {openStoryPage, screen, waitFor} from '../test-utils';
import {getGlobalPage} from '@telefonica/acceptance-testing';
import {AxePuppeteer} from '@axe-core/puppeteer';

const story = 'components-message--default';

test.each(['Movistar', 'O2', 'Vivo', 'Vivo-evolution', 'Blau'] as const)(
    'Message conversation has accessible contrast in %s',
    async (skin) => {
        await openStoryPage({id: 'components-message--conversation', device: 'MOBILE_IOS', skin});
        const result = await new AxePuppeteer(getGlobalPage()).withRules(['color-contrast']).analyze();
        expect(result.violations).toEqual([]);
    }
);

test.each([
    {type: 'incoming', boxed: true},
    {type: 'outgoing', boxed: true},
    {type: 'outgoing', boxed: false},
])('Short error messages stay within the mobile viewport: %o', async ({type, boxed}) => {
    await openStoryPage({
        id: story,
        device: 'MOBILE_IOS',
        skin: 'Blau',
        args: {
            type,
            boxed,
            contentText: 'Error',
            senderName: '',
            assetType: 'none',
            error: true,
            errorMessage: 'Could not send please try again',
            variantOutside: 'alternative',
        },
    });
    const error = await screen.findByRole('alert');
    const bubble = await screen.findByTestId('MessageBubble');
    const errorBounds = await error.boundingBox();
    const bubbleBounds = await bubble.boundingBox();
    if (!errorBounds || !bubbleBounds) {
        throw new Error('Message error or bubble bounds not found');
    }
    const inset = await error.evaluate((element) => parseFloat(getComputedStyle(element).paddingLeft));
    const minimumErrorWidth = 184;
    expect(errorBounds.width).toBeGreaterThanOrEqual(minimumErrorWidth);
    expect(inset).toBe(boxed ? 16 : 0);
    const rightInset = await error.evaluate((element) => parseFloat(getComputedStyle(element).paddingRight));
    expect(rightInset).toBe(boxed ? 16 : 0);
    expect(errorBounds.y - (bubbleBounds.y + bubbleBounds.height)).toBeCloseTo(4, 0);
    if (type === 'outgoing') {
        expect(errorBounds.x + errorBounds.width).toBeCloseTo(bubbleBounds.x + bubbleBounds.width, 0);
    } else {
        expect(errorBounds.x).toBeCloseTo(bubbleBounds.x, 0);
    }
    expect(
        await error.evaluate(
            () => document.documentElement.scrollWidth > document.documentElement.clientWidth
        )
    ).toBe(false);
    expect(await error.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(false);
});

test('Message wraps within its maximum width on mobile with side actions', async () => {
    await openStoryPage({
        id: story,
        device: 'MOBILE_IOS',
        args: {
            contentText: 'A very long message '.repeat(30),
            actions: true,
            actionsPosition: 'side',
            sideSlot: true,
        },
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

test.each(['brand', 'negative', 'media'])(
    'Unboxed sender uses the content color over %s',
    async (variantOutside) => {
        await openStoryPage({
            id: story,
            device: 'MOBILE_IOS',
            args: {
                boxed: false,
                variantOutside,
                senderName: 'Adriana',
                senderNameLabel: '',
                contentText: 'Hello',
                timestampLabel: '',
            },
        });
        const sender = await screen.findByText('Adriana');
        const content = await screen.findByText('Hello');
        const timestamp = await screen.findByText('13:32');
        const contentColor = await content.evaluate((node) => getComputedStyle(node).color);
        expect(await sender.evaluate((node) => getComputedStyle(node).color)).toBe(contentColor);
        expect(await timestamp.evaluate((node) => getComputedStyle(node).color)).toBe(contentColor);
    }
);

test('Message uses an inline timestamp for short text', async () => {
    await openStoryPage({
        id: story,
        device: 'MOBILE_IOS',
        args: {contentText: 'Hi', senderName: '', timestampLabel: '', assetType: 'none'},
    });
    const text = await screen.findByText('Hi');
    const timestamp = await screen.findByText('13:32');
    const textBounds = await text.boundingBox();
    const timestampBounds = await timestamp.boundingBox();
    if (!textBounds || !timestampBounds) {
        throw new Error('Message text or timestamp bounds not found');
    }
    const inlineTimestampGap = 8;
    expect(timestampBounds.x - (textBounds.x + textBounds.width)).toBeCloseTo(inlineTimestampGap, 0);
    expect(Math.abs(timestampBounds.y - textBounds.y)).toBeLessThan(8);
});

test('Message retry replaces the error with its delivered timestamp', async () => {
    await openStoryPage({id: 'components-message--conversation', device: 'MOBILE_IOS'});
    await (await screen.findByRole('button', {name: 'Tú: Tuesday, please. Error text'})).click();
    await screen.findByText('16:50');
    const messages = await screen.findByTestId('messages');
    expect(await messages.evaluate((element) => element.querySelector('[role=alert]'))).toBeNull();
});

test('Outgoing assets align with the bubble when a footer is present', async () => {
    await openStoryPage({
        id: story,
        device: 'MOBILE_IOS',
        args: {type: 'outgoing', footerSlot: true, actions: true, actionsPosition: 'side'},
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

test.each([true, false])(
    'Outgoing footer actions align to the bubble right edge (boxed: %s)',
    async (boxed) => {
        await openStoryPage({
            id: story,
            device: 'MOBILE_IOS',
            args: {type: 'outgoing', boxed, footerSlot: true, actions: true, actionsPosition: 'footer'},
        });
        const bubble = await screen.findByTestId('MessageBubble');
        const action = await screen.findByRole('button', {name: 'Copy message'});
        const bubbleBounds = await bubble.boundingBox();
        const actionBounds = await action.evaluate((element) => {
            const bounds = element.parentElement?.getBoundingClientRect();
            return bounds ? {x: bounds.x, y: bounds.y, width: bounds.width} : null;
        });
        if (!bubbleBounds || !actionBounds) {
            throw new Error('Message bubble or footer action bounds not found');
        }
        expect(actionBounds.x + actionBounds.width).toBeCloseTo(bubbleBounds.x + bubbleBounds.width, 0);
        expect(actionBounds.y).toBeGreaterThanOrEqual(bubbleBounds.y + bubbleBounds.height);
    }
);

test.each(['incoming', 'outgoing'])('Message renders oversized avatars at 40px: %s', async (type) => {
    await openStoryPage({id: story, device: 'MOBILE_IOS', args: {type, avatarSize: 190}});
    const avatar = await screen.findByTestId('Avatar');
    const bounds = await avatar.boundingBox();
    expect(bounds?.width).toBe(40);
    expect(bounds?.height).toBe(40);
});

test.each(['MOBILE_IOS', 'DESKTOP'] as const)(
    'Short error text hugs its content without forcing the minimum width: %s',
    async (device) => {
        await openStoryPage({
            id: story,
            device,
            args: {
                type: 'outgoing',
                contentText: 'Tuesday please',
                senderName: '',
                assetType: 'none',
                error: true,
                errorMessage: 'Error text',
            },
        });
        const error = await screen.findByRole('alert');
        const bubble = await screen.findByTestId('MessageBubble');
        const errorBounds = await error.boundingBox();
        const bubbleBounds = await bubble.boundingBox();
        if (!errorBounds || !bubbleBounds) {
            throw new Error('Message error or bubble bounds not found');
        }
        const minimumErrorWidth = 184;
        expect(errorBounds.width).toBeLessThan(minimumErrorWidth);
        expect(errorBounds.x + errorBounds.width).toBeCloseTo(bubbleBounds.x + bubbleBounds.width, 0);
        const helper = await screen.findByText('Error text');
        const insets = await helper.evaluate((element) => {
            const alert = element.closest('[role="alert"]');
            const icon = alert?.querySelector('svg');
            if (!alert || !icon) {
                throw new Error('Message error or icon not found');
            }
            const range = document.createRange();
            range.selectNodeContents(element);
            return {
                left: icon.getBoundingClientRect().left - alert.getBoundingClientRect().left,
                right: alert.getBoundingClientRect().right - range.getBoundingClientRect().right,
            };
        });
        const errorInset = 16;
        expect(insets.left).toBeCloseTo(errorInset, 0);
        expect(insets.right).toBeCloseTo(errorInset, 0);
    }
);

test('Short error helper grows beyond its minimum width without wrapping unnecessarily', async () => {
    const errorMessage = 'Error message with longer text';
    await openStoryPage({
        id: 'components-message--error-examples',
        device: 'MOBILE_IOS',
        args: {shortErrorMessage: errorMessage},
    });
    const helper = await screen.findByText(errorMessage);
    await waitFor(async () => {
        const insets = await helper.evaluate((element) => {
            const alert = element.closest('[role="alert"]');
            const icon = alert?.querySelector('svg');
            if (!alert || !icon) {
                throw new Error('Message error or icon not found');
            }
            const range = document.createRange();
            range.selectNodeContents(element);
            return {
                left: icon.getBoundingClientRect().left - alert.getBoundingClientRect().left,
                right: alert.getBoundingClientRect().right - range.getBoundingClientRect().right,
            };
        });
        const errorInset = 16;
        expect(insets.left).toBeCloseTo(errorInset, 0);
        expect(insets.right).toBeCloseTo(errorInset, 0);
    });
    const isSingleLine = await helper.evaluate((element) => {
        const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
        return element.getBoundingClientRect().height <= lineHeight + 1;
    });
    expect(isSingleLine).toBe(true);
    expect(
        await helper.evaluate(
            () => document.documentElement.scrollWidth > document.documentElement.clientWidth
        )
    ).toBe(false);
});

test.each([true, false])('Content slots preserve their own typography (boxed: %s)', async (boxed) => {
    await openStoryPage({
        id: 'components-message--content-typography',
        device: 'MOBILE_IOS',
        args: {boxed, variantOutside: 'brand'},
    });
    const typography = async (text: string) => {
        const element = await screen.findByText(text);
        return element.evaluate((node) => {
            const style = getComputedStyle(node);
            return {
                fontSize: style.fontSize,
                lineHeight: style.lineHeight,
                fontWeight: style.fontWeight,
                fontFamily: style.fontFamily,
                color: style.color,
            };
        });
    };
    const defaultTypography = await typography('Default text');
    expect(await typography('Plain content')).toEqual(await typography('Plain reference'));
    expect(await typography('Inherited text')).toEqual(await typography('Inherited reference'));
    const customTypography = await typography('Custom text');
    const referenceTypography = await typography('Custom reference');
    expect(customTypography.fontSize).toBe(referenceTypography.fontSize);
    expect(customTypography.fontWeight).toBe(referenceTypography.fontWeight);
    expect(customTypography.fontWeight).not.toBe(defaultTypography.fontWeight);
});

test.each(['incoming', 'outgoing'])('Message keeps its bubble fill on hover and press: %s', async (type) => {
    await openStoryPage({
        id: story,
        device: 'DESKTOP',
        args: {type, variantOutside: 'negative', interaction: 'onPress'},
    });
    const bubble = await screen.findByTestId('MessageBubble');
    const background = await bubble.evaluate((element) => getComputedStyle(element).backgroundColor);
    await bubble.hover();
    expect(await bubble.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(background);
    expect(
        (await new AxePuppeteer(getGlobalPage()).withRules(['color-contrast']).analyze()).violations
    ).toEqual([]);
    await getGlobalPage().mouse.down();
    try {
        expect(await bubble.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(
            background
        );
        expect(
            (await new AxePuppeteer(getGlobalPage()).withRules(['color-contrast']).analyze()).violations
        ).toEqual([]);
    } finally {
        await getGlobalPage().mouse.move(0, 0);
        await getGlobalPage().mouse.up();
    }
});

test('Outgoing errors follow the footer slot and footer actions', async () => {
    await openStoryPage({id: 'components-message--error-with-slots', device: 'MOBILE_IOS'});
    const bubble = await screen.findByTestId('MessageBubble');
    const action = await screen.findByRole('button', {name: 'Copy message'});
    const error = await screen.findByRole('alert');
    const bubbleBounds = await bubble.boundingBox();
    const actionBounds = await action.evaluate((element) => {
        const bounds = element.parentElement?.getBoundingClientRect();
        return bounds ? {y: bounds.y, height: bounds.height} : undefined;
    });
    const errorBounds = await error.boundingBox();
    if (!bubbleBounds || !actionBounds || !errorBounds) {
        throw new Error('Message element bounds not found');
    }
    const footerSlotHeight = 40;
    expect(actionBounds.y).toBeGreaterThanOrEqual(bubbleBounds.y + bubbleBounds.height + footerSlotHeight);
    expect(errorBounds.y).toBeGreaterThanOrEqual(actionBounds.y + actionBounds.height);
});

test.each([
    {type: 'incoming', boxed: true},
    {type: 'outgoing', boxed: true},
    {type: 'incoming', boxed: false},
    {type: 'outgoing', boxed: false},
])('Message asset spacing matches its boxed variant: %o', async ({type, boxed}) => {
    await openStoryPage({id: story, device: 'MOBILE_IOS', args: {type, boxed, assetType: 'avatar'}});
    const asset = await (await screen.findByTestId('Avatar')).boundingBox();
    const bubble = await (await screen.findByTestId('MessageBubble')).boundingBox();
    if (!asset || !bubble) {
        throw new Error('Message asset or bubble bounds not found');
    }
    const boxedGap = 8;
    const unboxedGap = 12;
    const gap = type === 'incoming' ? bubble.x - asset.x - asset.width : asset.x - bubble.x - bubble.width;
    expect(gap).toBeCloseTo(boxed ? boxedGap : unboxedGap, 0);
});

test.each([true, false])('Oversized content stays inside the message (boxed: %s)', async (boxed) => {
    await openStoryPage({id: 'components-message--content-overflow', device: 'MOBILE_IOS', args: {boxed}});
    const image = await screen.findByRole('img', {name: 'Portrait'});
    const bounds = await image.evaluate((node) => {
        const message = node.closest('[data-testid="Message"]');
        if (!message) {
            throw new Error('Missing message container');
        }
        const imageRect = node.getBoundingClientRect();
        const messageRect = message.getBoundingClientRect();
        return {width: messageRect.width, imageRight: imageRect.right, right: messageRect.right};
    });
    expect(bounds.width).toBeLessThanOrEqual(200);
    expect(bounds.imageRight).toBeLessThanOrEqual(bounds.right);
});

test.each(['incoming', 'outgoing'])('Error uses the side actions width: %s', async (type) => {
    await openStoryPage({
        id: story,
        device: 'MOBILE_IOS',
        args: {
            type,
            assetType: 'none',
            senderName: '',
            error: true,
            errorMessage: 'An error message that needs the whole row width to remain readable',
            actions: true,
            actionsCount: 2,
            actionsPosition: 'side',
        },
    });
    const bubble = await screen.findByTestId('MessageBubble');
    const error = await screen.findByRole('alert');
    const message = await screen.findByTestId('Message');
    await waitFor(async () => {
        const bubbleBounds = await bubble.boundingBox();
        const errorBounds = await error.boundingBox();
        const messageBounds = await message.boundingBox();
        if (!bubbleBounds || !errorBounds || !messageBounds) throw new Error('Missing message bounds');
        expect(errorBounds.width).toBeCloseTo(messageBounds.width, 0);
        expect(errorBounds.width).toBeGreaterThan(bubbleBounds.width);
        expect(errorBounds.y - bubbleBounds.y - bubbleBounds.height).toBeCloseTo(4, 0);
    });
});

test.each(['incoming', 'outgoing'])('Error preserves legibility with a narrow maxWidth: %s', async (type) => {
    await openStoryPage({
        id: story,
        device: 'MOBILE_IOS',
        args: {
            type,
            contentText: 'Ok',
            maxWidth: '100px',
            assetType: 'none',
            senderName: '',
            error: true,
            errorMessage: 'This message could not be sent please try again',
        },
    });
    await waitFor(async () => {
        const error = await (await screen.findByRole('alert')).boundingBox();
        const message = await (await screen.findByTestId('Message')).boundingBox();
        if (!error || !message) throw new Error('Missing message bounds');
        const minimumErrorWidth = 184;
        expect(error.width).toBeCloseTo(minimumErrorWidth, 0);
        expect(message.width).toBeLessThanOrEqual(100);
        if (type === 'outgoing') expect(error.x + error.width).toBeCloseTo(message.x + message.width, 0);
        else expect(error.x).toBeCloseTo(message.x, 0);
    });
});

test.each(['incoming', 'outgoing'])(
    'Side slot uses at most 40 percent and keeps the action gap: %s',
    async (type) => {
        await openStoryPage({id: 'components-message--side-slot-sizing', device: 'MOBILE_IOS', args: {type}});
        const slot = await screen.findByRole('img', {name: 'Side attachment'});
        const slotBounds = await slot.boundingBox();
        const message = await (await screen.findByTestId('Message')).boundingBox();
        const action = await screen.findByRole('button', {name: 'Copy'});
        const actionBounds = await action.evaluate((node) => {
            const rect = node.parentElement?.getBoundingClientRect();
            return rect ? {left: rect.left, right: rect.right} : null;
        });
        if (!slotBounds || !message || !actionBounds) throw new Error('Missing slot bounds');
        const maximumSideSlotRatio = 0.4;
        expect(slotBounds.width).toBeLessThanOrEqual(message.width * maximumSideSlotRatio);
        const actionGap = 4;
        expect(
            type === 'incoming'
                ? actionBounds.left - slotBounds.x - slotBounds.width
                : slotBounds.x - actionBounds.right
        ).toBeCloseTo(actionGap, 0);
    }
);

test.each([
    {type: 'incoming', boxed: true, error: false, footerWidth: 160},
    {type: 'outgoing', boxed: true, error: false, footerWidth: 160},
    {type: 'incoming', boxed: false, error: true, footerWidth: 160},
    {type: 'outgoing', boxed: true, error: true, footerWidth: 160},
    {type: 'incoming', boxed: true, error: false, footerWidth: 400},
    {type: 'outgoing', boxed: false, error: true, footerWidth: 400},
])('Bubble grows to fit the footer within maxWidth: %o', async (args) => {
    await openStoryPage({id: 'components-message--footer-sizing', device: 'MOBILE_IOS', args});
    await waitFor(async () => {
        const bubble = await (await screen.findByTestId('MessageBubble')).boundingBox();
        const footer = await (await screen.findByRole('img', {name: 'Attachment'})).boundingBox();
        if (!bubble || !footer) throw new Error('Missing message bounds');
        const maxWidth = 240;
        expect(bubble.width).toBeCloseTo(Math.min(args.footerWidth, maxWidth), 0);
        expect(footer.width).toBeCloseTo(bubble.width, 0);
        expect(footer.x).toBeCloseTo(bubble.x, 0);
    });
});

test.each(['incoming', 'outgoing'])('Short bubble grows to fit both footer actions: %s', async (type) => {
    await openStoryPage({
        id: 'components-message--footer-sizing',
        device: 'MOBILE_IOS',
        args: {type, footerSlot: false, error: true},
    });
    await waitFor(async () => {
        const bubble = await (await screen.findByTestId('MessageBubble')).boundingBox();
        const copy = await screen.findByRole('button', {name: 'Copy'});
        const reminder = await screen.findByRole('button', {name: 'Reminder'});
        const bounds = async (button: typeof copy) =>
            button.evaluate((node) => {
                const rect = node.parentElement?.getBoundingClientRect();
                return rect ? {left: rect.left, right: rect.right, top: rect.top} : null;
            });
        const first = await bounds(copy);
        const last = await bounds(reminder);
        if (!bubble || !first || !last) throw new Error('Missing action bounds');
        expect(first.top).toBe(last.top);
        expect(bubble.width).toBeCloseTo(last.right - first.left, 0);
        expect(bubble.x).toBeCloseTo(first.left, 0);
    });
});
