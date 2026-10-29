import {openStoryPage, screen, waitFor} from '../test-utils';
import {getGlobalPage} from '@telefonica/acceptance-testing';
import {AxePuppeteer} from '@axe-core/puppeteer';
import assert from 'assert';

import type {ElementHandle} from '../test-utils';

const getBounds = async (element: ElementHandle) => {
    const bounds = await element.boundingBox();
    assert(bounds, 'Element has no bounding box');
    return {...bounds, left: bounds.x, right: bounds.x + bounds.width};
};

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
    {type: 'incoming', boxed: true, inset: 16, edge: 'left'},
    {type: 'outgoing', boxed: true, inset: 16, edge: 'right'},
    {type: 'outgoing', boxed: false, inset: 0, edge: 'right'},
] as const)(
    'Short error messages stay within the mobile viewport: $type boxed=$boxed',
    async ({type, boxed, inset, edge}) => {
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
        const errorBounds = await getBounds(error);
        const bubbleBounds = await getBounds(bubble);
        const leftInset = await error.evaluate((element) =>
            parseFloat(getComputedStyle(element).paddingLeft)
        );
        const minimumErrorWidth = 184;
        expect(errorBounds.width).toBeGreaterThanOrEqual(minimumErrorWidth);
        expect(leftInset).toBe(inset);
        const rightInset = await error.evaluate((element) =>
            parseFloat(getComputedStyle(element).paddingRight)
        );
        expect(rightInset).toBe(inset);
        expect(errorBounds.y - (bubbleBounds.y + bubbleBounds.height)).toBeCloseTo(4, 0);
        expect(errorBounds[edge]).toBeCloseTo(bubbleBounds[edge], 0);
        expect(
            await error.evaluate(
                () => document.documentElement.scrollWidth > document.documentElement.clientWidth
            )
        ).toBe(false);
        expect(await error.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(false);
    }
);

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
    const bounds = await getBounds(message);
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
    const textBounds = await getBounds(text);
    const timestampBounds = await getBounds(timestamp);
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
    const bubbleBounds = await getBounds(bubble);
    const avatarBounds = await getBounds(avatar);
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
        const bubbleBounds = await getBounds(bubble);
        const actionBounds = await action.evaluate((element) => {
            const bounds = (element.parentElement as HTMLElement).getBoundingClientRect();
            return {x: bounds.x, y: bounds.y, width: bounds.width};
        });
        expect(actionBounds.x + actionBounds.width).toBeCloseTo(bubbleBounds.x + bubbleBounds.width, 0);
        expect(actionBounds.y).toBeGreaterThanOrEqual(bubbleBounds.y + bubbleBounds.height);
    }
);

test.each(['incoming', 'outgoing'])('Message renders oversized avatars at 40px: %s', async (type) => {
    await openStoryPage({id: story, device: 'MOBILE_IOS', args: {type, avatarSize: 190}});
    const avatar = await screen.findByTestId('Avatar');
    const bounds = await getBounds(avatar);
    expect(bounds.width).toBe(40);
    expect(bounds.height).toBe(40);
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
        const errorBounds = await getBounds(error);
        const bubbleBounds = await getBounds(bubble);
        const minimumErrorWidth = 184;
        expect(errorBounds.width).toBeLessThan(minimumErrorWidth);
        expect(errorBounds.x + errorBounds.width).toBeCloseTo(bubbleBounds.x + bubbleBounds.width, 0);
        const helper = await screen.findByText('Error text');
        const insets = await helper.evaluate((element) => {
            const alert = element.closest('[role="alert"]') as HTMLElement;
            const icon = alert.querySelector('svg') as SVGElement;
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
            const alert = element.closest('[role="alert"]') as HTMLElement;
            const icon = alert.querySelector('svg') as SVGElement;
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
    const bubbleBounds = await getBounds(bubble);
    const actionBounds = await action.evaluate((element) => {
        const bounds = (element.parentElement as HTMLElement).getBoundingClientRect();
        return {y: bounds.y, height: bounds.height};
    });
    const errorBounds = await getBounds(error);
    const footerSlotHeight = 40;
    expect(actionBounds.y).toBeGreaterThanOrEqual(bubbleBounds.y + bubbleBounds.height + footerSlotHeight);
    expect(errorBounds.y).toBeGreaterThanOrEqual(actionBounds.y + actionBounds.height);
});

test.each([
    {type: 'incoming', boxed: true, leading: 'asset', trailing: 'bubble', expectedGap: 8},
    {type: 'outgoing', boxed: true, leading: 'bubble', trailing: 'asset', expectedGap: 8},
    {type: 'incoming', boxed: false, leading: 'asset', trailing: 'bubble', expectedGap: 12},
    {type: 'outgoing', boxed: false, leading: 'bubble', trailing: 'asset', expectedGap: 12},
] as const)(
    'Message asset spacing matches its boxed variant: %o',
    async ({type, boxed, leading, trailing, expectedGap}) => {
        await openStoryPage({id: story, device: 'MOBILE_IOS', args: {type, boxed, assetType: 'avatar'}});

        const asset = await getBounds(await screen.findByTestId('Avatar'));
        const bubble = await getBounds(await screen.findByTestId('MessageBubble'));
        const bounds = {asset, bubble};
        const actualGap = bounds[trailing].left - bounds[leading].right;

        expect(actualGap).toBeCloseTo(expectedGap, 0);
    }
);

test.each([true, false])('Oversized content stays inside the message (boxed: %s)', async (boxed) => {
    await openStoryPage({id: 'components-message--content-overflow', device: 'MOBILE_IOS', args: {boxed}});
    const image = await screen.findByRole('img', {name: 'Portrait'});
    const bounds = await image.evaluate((node) => {
        const message = node.closest('[data-testid="Message"]') as HTMLElement;
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
        const bubbleBounds = await getBounds(bubble);
        const errorBounds = await getBounds(error);
        const messageBounds = await getBounds(message);
        expect(errorBounds.width).toBeCloseTo(messageBounds.width, 0);
        expect(errorBounds.width).toBeGreaterThan(bubbleBounds.width);
        expect(errorBounds.y - bubbleBounds.y - bubbleBounds.height).toBeCloseTo(4, 0);
    });
});

test.each([
    {type: 'incoming', edge: 'left'},
    {type: 'outgoing', edge: 'right'},
] as const)('Error preserves legibility with a narrow maxWidth: $type', async ({type, edge}) => {
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
        const error = await getBounds(await screen.findByRole('alert'));
        const message = await getBounds(await screen.findByTestId('Message'));
        const minimumErrorWidth = 184;
        expect(error.width).toBeCloseTo(minimumErrorWidth, 0);
        expect(message.width).toBeLessThanOrEqual(100);
        expect(error[edge]).toBeCloseTo(message[edge], 0);
    });
});

test.each([
    {type: 'incoming', leading: 'slot', trailing: 'action'},
    {type: 'outgoing', leading: 'action', trailing: 'slot'},
] as const)(
    'Side slot uses at most 40 percent and keeps the action gap: $type',
    async ({type, leading, trailing}) => {
        await openStoryPage({id: 'components-message--side-slot-sizing', device: 'MOBILE_IOS', args: {type}});
        const slot = await screen.findByRole('img', {name: 'Side attachment'});
        const slotBounds = await getBounds(slot);
        const message = await getBounds(await screen.findByTestId('Message'));
        const action = await screen.findByRole('button', {name: 'Copy'});
        const actionBounds = await action.evaluate((node) => {
            const rect = (node.parentElement as HTMLElement).getBoundingClientRect();
            return {left: rect.left, right: rect.right};
        });
        const maximumSideSlotRatio = 0.4;
        expect(slotBounds.width).toBeLessThanOrEqual(message.width * maximumSideSlotRatio);
        const actionGap = 4;
        const bounds = {action: actionBounds, slot: slotBounds};
        const gap = bounds[trailing].left - bounds[leading].right;
        expect(gap).toBeCloseTo(actionGap, 0);
    }
);

test.each([
    {type: 'incoming', boxed: true, error: false, footerWidth: 160, expectedWidth: 160},
    {type: 'outgoing', boxed: true, error: false, footerWidth: 160, expectedWidth: 160},
    {type: 'incoming', boxed: false, error: true, footerWidth: 160, expectedWidth: 160},
    {type: 'outgoing', boxed: true, error: true, footerWidth: 160, expectedWidth: 160},
    {type: 'incoming', boxed: true, error: false, footerWidth: 400, expectedWidth: 240},
    {type: 'outgoing', boxed: false, error: true, footerWidth: 400, expectedWidth: 240},
])('Bubble grows to fit the footer within maxWidth: %o', async ({expectedWidth, ...args}) => {
    await openStoryPage({id: 'components-message--footer-sizing', device: 'MOBILE_IOS', args});
    await waitFor(async () => {
        const bubble = await getBounds(await screen.findByTestId('MessageBubble'));
        const footer = await getBounds(await screen.findByRole('img', {name: 'Attachment'}));
        expect(bubble.width).toBeCloseTo(expectedWidth, 0);
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
        const bubble = await getBounds(await screen.findByTestId('MessageBubble'));
        const copy = await screen.findByRole('button', {name: 'Copy'});
        const reminder = await screen.findByRole('button', {name: 'Reminder'});
        const bounds = async (button: typeof copy) =>
            button.evaluate((node) => {
                const rect = (node.parentElement as HTMLElement).getBoundingClientRect();
                return {left: rect.left, right: rect.right, top: rect.top};
            });
        const first = await bounds(copy);
        const last = await bounds(reminder);
        expect(first.top).toBe(last.top);
        expect(bubble.width).toBeCloseTo(last.right - first.left, 0);
        expect(bubble.x).toBeCloseTo(first.left, 0);
    });
});
