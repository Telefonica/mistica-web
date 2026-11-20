import {test, expect} from '../test-utils/component';
import {installWebviewBridge} from '../test-utils/webview';

import type {Basic, Hook, Rerender} from './snackbar.story';

for (const {title, props, button, action} of [
    {title: 'Snackbar', props: {buttonText: 'Action'}, button: 'Action', action: 'BUTTON'},
    {
        title: 'Snackbar with dismiss button',
        props: {buttonText: 'Action', withDismiss: true},
        button: 'Cerrar',
        action: 'DISMISS',
    },
    {
        title: 'Snackbar with dismiss button and custom label',
        props: {buttonText: 'Action', withDismiss: true, closeButtonLabel: 'custom close label'},
        button: 'custom close label',
        action: 'DISMISS',
    },
    {
        title: 'Snackbar with button aria-label',
        props: {buttonText: 'Action', buttonAccessibilityLabel: 'some a11y label'},
        button: 'some a11y label',
        action: 'BUTTON',
    },
])
    test(title, async ({mount, page}) => {
        const calls: Array<unknown> = [];
        await mount<typeof Basic>('snackbar/Basic', {
            message: 'Some message',
            duration: 'PERSISTENT',
            ...props,
            onClose: (result) => {
                calls.push(result);
            },
        });
        await expect(page.getByText('Some message')).toHaveCount(1);
        await expect(page.getByRole('button', {name: button})).toBeVisible();
        await page.getByRole('button', {name: button}).click();
        await expect.poll(() => calls).toEqual([{action}]);
    });
test('Snackbar auto dismisses', async ({mount, page}) => {
    const calls: Array<unknown> = [];
    await page.clock.install();
    await mount<typeof Basic>('snackbar/Basic', {
        message: 'Some message',
        onClose: (result) => {
            calls.push(result);
        },
    });
    await expect(page.getByRole('alert')).toHaveCount(1);
    await expect(page.getByText('Some message')).toHaveCount(1);
    await page.clock.fastForward(6000);
    await expect.poll(() => calls).toEqual([{action: 'TIMEOUT'}]);
    await expect(page.getByRole('alert')).toHaveCount(0);
});
test('Snackbar does not have dismiss button by default', async ({mount, page}) => {
    await mount('snackbar/Basic', {message: 'Some message', buttonText: 'Action', duration: 'PERSISTENT'});
    await expect(page.getByRole('button', {name: 'Action'})).toHaveCount(1);
    await expect(page.getByRole('button', {name: 'Cerrar'})).toHaveCount(0);
});
test('Snackbar always has dismiss button if it does not have action button and duration is Infinity', async ({
    mount,
    page,
}) => {
    await mount('snackbar/Basic', {message: 'Some message', duration: 'PERSISTENT', withDismiss: false});
    await expect(page.getByRole('button', {name: 'Cerrar'})).toHaveCount(1);
});
for (const persistent of [false, true])
    test(
        persistent
            ? 'nativeMessage is called with duration PERSISTENT when duration is Infinity'
            : 'nativeMessage is called when webview bridge is available',
        async ({mount, page}) => {
            const calls: Array<unknown> = [];
            const messages = await installWebviewBridge(page, {action: 'DISMISS'});
            await mount<typeof Basic>('snackbar/Basic', {
                message: 'any-message',
                buttonText: 'any-button-text',
                ...(persistent ? {duration: 'PERSISTENT'} : {}),
                onClose: (result) => {
                    calls.push(result);
                },
            });
            await expect
                .poll(() =>
                    messages.filter((message) => message.type === 'MESSAGE').map((message) => message.payload)
                )
                .toEqual([
                    {
                        message: 'any-message',
                        buttonText: 'any-button-text',
                        type: 'INFORMATIVE',
                        ...(persistent ? {duration: 'PERSISTENT'} : {}),
                    },
                ]);
            await expect.poll(() => calls).toEqual([{action: 'DISMISS'}]);
        }
    );
test('nativeMessage should be called once, even if the component re-renders', async ({mount, page}) => {
    let closes = 0;
    const messages = await installWebviewBridge(page, {action: 'DISMISS'});
    const component = await mount<typeof Rerender>('snackbar/Rerender', {
        onClose: () => {
            closes++;
        },
    });
    await expect(component.getByText('count: 0')).toHaveCount(1);
    await expect
        .poll(() =>
            messages.filter((message) => message.type === 'MESSAGE').map((message) => message.payload)
        )
        .toEqual([{message: 'any-message', buttonText: 'any-button-text', type: 'INFORMATIVE'}]);
    await expect.poll(() => closes).toBe(1);
    await component.getByRole('button').click();
    await expect(component.getByText('count: 1')).toHaveCount(1);
    expect(messages.filter((message) => message.type === 'MESSAGE')).toHaveLength(1);
    expect(closes).toBe(1);
});
test('useSnackbar: happy case', async ({mount, page}) => {
    await mount('snackbar/Hook');
    await page.getByRole('button', {name: 'Open snackbar 1'}).click();
    await expect(page.getByText('Snackbar 1')).toHaveCount(1);
});
test('useSnackbar: openSnackbar closes already opened one', async ({mount, page}) => {
    const calls: Array<unknown> = [];
    await mount<typeof Hook>('snackbar/Hook', {
        onClose: (result) => {
            calls.push(result);
        },
    });
    const open = page.getByRole('button', {name: 'Open snackbar 1'});
    await open.click();
    await open.click();
    await open.click();
    await page.getByRole('button', {name: 'Action', exact: true}).click();
    await expect
        .poll(() => calls)
        .toEqual([{action: 'CONSECUTIVE'}, {action: 'CONSECUTIVE'}, {action: 'BUTTON'}]);
});
