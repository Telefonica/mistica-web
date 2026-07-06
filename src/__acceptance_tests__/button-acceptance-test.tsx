import {openStoryPage, screen, waitFor} from '../test-utils';

import type {ElementHandle} from '../test-utils';

const DISABLED_HOVER_SETTLE_MS = 150;

const getButtonLinkBackgroundColor = async (button: ElementHandle): Promise<string> =>
    button.evaluate((element) => {
        const visual = element.firstElementChild;

        if (!(visual instanceof HTMLElement)) {
            throw new Error('ButtonLink visual element not found');
        }

        return getComputedStyle(visual).backgroundColor;
    });

test('Small disabled ButtonLink does not apply hover styles', async () => {
    const page = await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'DESKTOP',
        args: {small: true, disabled: true, action: 'onPress'},
    });
    await page.waitForSelector('button[disabled]');

    const button = await screen.findByRole('button', {name: 'Example'});
    const backgroundColor = await getButtonLinkBackgroundColor(button);

    await button.hover();
    await page.waitForTimeout(DISABLED_HOVER_SETTLE_MS);

    expect(await getButtonLinkBackgroundColor(button)).toBe(backgroundColor);
});

test('Small ButtonLink keeps hover styles when enabled', async () => {
    const page = await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'DESKTOP',
        args: {small: true, action: 'onPress'},
    });
    await page.waitForSelector('button');

    const button = await screen.findByRole('button', {name: 'Example'});
    const backgroundColor = await getButtonLinkBackgroundColor(button);

    await button.hover();

    await waitFor(async () => {
        expect(await getButtonLinkBackgroundColor(button)).not.toBe(backgroundColor);
    });
});
