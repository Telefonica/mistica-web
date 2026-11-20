import {test, expect} from '../test-utils/component';
import {installWebviewBridge} from '../test-utils/webview';

import type {Example} from './dialog.story';

test('does not render anything initially', async ({mount}) => {
    const component = await mount('dialog/Empty');
    await expect(component.locator(':scope > :not(style)')).toHaveCount(0);
});
test('throws when we try to stack dialogs', async ({mount, page}) => {
    const component = await mount('dialog/Example');
    await component.getByRole('button', {name: 'Alert', exact: true}).click();
    await expect(page.getByText('Message', {exact: true})).toHaveCount(1);
    await page.evaluate(() => window.dispatchEvent(new Event('test-open-dialog')));
    await expect(component.getByTestId('dialog-error')).toHaveValue(
        'Tried to show a dialog on top of another dialog'
    );
});
test("throws when we don't instantiate theme", async ({mount, page}) => {
    const component = await mount('dialog/Example', {missingTheme: true});
    await page.evaluate(() => window.dispatchEvent(new Event('test-open-dialog')));
    await expect(component.getByTestId('dialog-error')).toHaveValue(
        /Tried to show a dialog but the DialogRoot component was not mounted/
    );
});
test('renders alert dialog correctly when alert function called', async ({mount, page}) => {
    await mount('dialog/Example');
    await page.getByRole('button', {name: 'Alert', exact: true}).click();
    await expect(page.getByText('Message', {exact: true})).toHaveCount(1);
    await expect(page.getByRole('button', {name: 'Yay!'})).toHaveCount(1);
});
test('works with nested theme context providers', async ({mount, page}) => {
    await mount('dialog/Example', {nested: true});
    await page.getByRole('button', {name: 'Alert', exact: true}).click();
    await expect(page.getByText('Message', {exact: true})).toHaveCount(1);
});
test('closes alert dialog when clicking on button', async ({mount, page}) => {
    let calls = 0;
    await mount<typeof Example>('dialog/Example', {
        onAccept: () => {
            calls++;
        },
    });
    await page.getByRole('button', {name: 'Alert', exact: true}).click();
    await page.getByRole('button', {name: 'Yay!'}).click();
    await expect.poll(() => calls).toBe(1);
});
test('renders confirm dialog correctly when confirm function called', async ({mount, page}) => {
    await mount('dialog/Example');
    await page.getByRole('button', {name: 'Confirm', exact: true}).click();
    await expect(page.getByRole('dialog')).toHaveCount(1);
    await expect(page.getByText('Message', {exact: true})).toHaveCount(1);
    for (const name of ['Nope!', 'Yay!']) await expect(page.getByRole('button', {name})).toHaveCount(1);
});
test('Closes a dialog on click outside', async ({mount, page}) => {
    let calls = 0;
    await mount<typeof Example>('dialog/Example', {
        onCancel: () => {
            calls++;
        },
    });
    await page.getByRole('button', {name: 'Dialog', exact: true}).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Nope!'})).toBeVisible();
    await page.getByTestId('dialog-overlay').click({position: {x: 0, y: 0}});
    await expect(page.getByRole('dialog', {includeHidden: true})).toHaveCount(0);
    expect(calls).toBe(1);
});
test('closes confirm dialog when clicking on any button', async ({mount, page}) => {
    const calls: Array<string> = [];
    await mount<typeof Example>('dialog/Example', {
        onCancel: () => {
            calls.push('cancel');
        },
        onAccept: () => {
            calls.push('accept');
        },
    });
    await page.getByRole('button', {name: 'Confirm', exact: true}).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', {name: 'Nope!'}).click();
    await expect(page.getByRole('dialog', {includeHidden: true})).toHaveCount(0);
    expect(calls).toEqual(['cancel']);
    await page.getByRole('button', {name: 'Confirm without onCancel', exact: true}).click();
    await expect(page.getByRole('button', {name: 'Nope!'})).toBeVisible();
    await page.getByRole('button', {name: 'Yay!'}).click();
    await expect.poll(() => calls).toEqual(['cancel', 'accept']);
});
test('closing a previous accepted dialog does not trigger onAccept callback', async ({mount, page}) => {
    const calls: Array<string> = [];
    await mount<typeof Example>('dialog/Example', {
        onAccept: () => {
            calls.push('accept');
        },
        onCancel: () => {
            calls.push('cancel');
        },
    });
    await page.getByRole('button', {name: 'Confirm', exact: true}).click();
    await page.getByRole('button', {name: 'Yay!'}).click();
    await expect(page.getByRole('dialog', {includeHidden: true})).toHaveCount(0);
    expect(calls).toEqual(['accept']);
    await page.getByRole('button', {name: 'Confirm', exact: true}).click();
    await page.getByRole('button', {name: 'Nope!'}).click();
    await expect(page.getByRole('dialog', {includeHidden: true})).toHaveCount(0);
    expect(calls).toEqual(['accept', 'cancel']);
});
for (const kind of ['Alert', 'Confirm'])
    test(`when webview bridge is available native${kind} is shown`, async ({mount, page}) => {
        const messages = await installWebviewBridge(page, {result: true});
        await mount('dialog/Example');
        await page.getByRole('button', {name: kind, exact: true}).click();
        await expect
            .poll(() =>
                messages
                    .filter((message) => message.type === kind.toUpperCase())
                    .map((message) => message.payload)
            )
            .toEqual([
                {
                    title: 'Title',
                    message: 'Message',
                    ...(kind === 'Alert' ? {buttonText: 'Yay!'} : {acceptText: 'Yay!', cancelText: 'Nope!'}),
                },
            ]);
    });
for (const [kind, name] of [
    ['switch', 'notifications'],
    ['checkbox', 'terms'],
    ['radio', 'option'],
] as const)
    test(`returns focus to the trigger ${kind === 'radio' ? 'radio button' : kind} when the dialog is closed via keyboard`, async ({
        mount,
        page,
    }) => {
        await mount('dialog/Trigger', {kind});
        const trigger = page.getByRole(kind, {name, exact: true});
        await trigger.focus();
        await expect(trigger).toBeFocused();
        await page.keyboard.press('Space');
        await expect(page.getByRole('dialog')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog', {includeHidden: true})).toHaveCount(0);
        await expect(trigger).toBeFocused();
    });
test('dialog close button is accessible', async ({mount, page}) => {
    await mount('dialog/Example');
    await page.getByRole('button', {name: 'Dialog', exact: true}).click();
    await expect(page.getByRole('button', {name: 'custom close label'})).toBeVisible();
});
