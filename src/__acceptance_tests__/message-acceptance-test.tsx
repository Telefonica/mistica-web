import {openStoryPage, screen} from '../test-utils';
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
            text: 'Error',
            senderName: '',
            asset: false,
            error: true,
            errorMessage: 'No se ha enviado. Inténtalo de nuevo.',
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
        args: {text: 'A very long message '.repeat(30), actions: true, actionsPosition: 'side', side: true},
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
    const inlineTimestampGap = 8;
    expect(timestampBounds.x - (textBounds.x + textBounds.width)).toBeCloseTo(inlineTimestampGap, 0);
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
        args: {type: 'outgoing', footer: true, actions: true, actionsPosition: 'side'},
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
            args: {type: 'outgoing', boxed, footer: true, actions: true, actionsPosition: 'footer'},
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

test('Short error helper grows beyond its minimum width without wrapping unnecessarily', async () => {
    const errorMessage = 'Error message with longer text';
    await openStoryPage({
        id: 'components-message--error-examples',
        device: 'MOBILE_IOS',
        args: {shortErrorMessage: errorMessage},
    });
    const helper = await screen.findByText(errorMessage);
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

test.each([true, false])(
    'Children inherit message typography and allow overrides (boxed: %s)',
    async (boxed) => {
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
        expect(await typography('Plain children')).toEqual(defaultTypography);
        expect(await typography('Inherited text')).toEqual(defaultTypography);
        const customTypography = await typography('Custom text');
        const referenceTypography = await typography('Custom reference');
        expect(customTypography.fontSize).toBe(referenceTypography.fontSize);
        expect(customTypography.fontWeight).toBe(referenceTypography.fontWeight);
        expect(customTypography.fontWeight).not.toBe(defaultTypography.fontWeight);
    }
);
