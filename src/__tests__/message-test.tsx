import {test, expect} from '../test-utils/component';

import type {Example} from './message.story';

test('static messages expose their direction and are skipped by keyboard navigation', async ({
    mount,
    page,
}) => {
    const component = await mount('message/Static');
    for (const text of ['Mensaje:', 'Tú:', 'Hello'])
        await expect(component.getByText(text, {exact: true})).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(component.getByRole('button', {name: 'Next control'})).toBeFocused();
});
for (const senderNameAs of ['span', 'p', 'h2'])
    test(`static messages expose label overrides without duplicate text: ${senderNameAs}`, async ({
        mount,
    }) => {
        const component = await mount('message/Example', {
            type: 'incoming',
            senderName: 'Ana',
            senderNameAs,
            senderNameLabel: 'Ana, support',
            timestamp: '13:00',
            timestampLabel: "One o'clock",
            contentText: 'Hello',
        });
        for (const name of ['Ana', '13:00'])
            await expect(component.getByText(name, {exact: true})).toHaveAttribute('aria-hidden', 'true');
        for (const name of ['Ana, support', "One o'clock"])
            await expect(component.getByText(name, {exact: true})).not.toHaveAttribute('aria-hidden', 'true');
        await expect(component.getByRole('button')).toHaveCount(0);
    });
test('sender label overrides preserve heading semantics', async ({mount}) => {
    const component = await mount('message/Example', {
        type: 'incoming',
        senderName: 'Ana',
        senderNameAs: 'h2',
        senderNameLabel: 'Ana, support',
    });
    await expect(component.getByRole('heading', {name: 'Ana, support', level: 2})).toHaveCount(1);
});
test('interactive messages group sender, content and timestamp in reading order', async ({mount}) => {
    const component = await mount<typeof Example>('message/Example', {
        type: 'incoming',
        senderName: 'Ana',
        senderNameLabel: 'Ana, support',
        timestamp: '13:00',
        timestampLabel: "One o'clock",
        footerSlot: true,
        contentSlot: true,
        onPress: () => {},
    });
    await expect(
        component.getByRole('button', {name: "Mensaje: Ana, support Details One o'clock", exact: true})
    ).toHaveCount(1);
});
for (const actionsPosition of ['side', 'footer'] as const)
    test(`asset, bubble and ${actionsPosition} actions have independent keyboard targets`, async ({
        mount,
        page,
    }) => {
        const calls: Array<string> = [];
        const component = await mount<typeof Example>('message/Example', {
            type: 'incoming',
            asset: true,
            assetLabel: "Open Ana's profile",
            contentText: 'Hello',
            actionsPosition,
            actions: true,
            onAsset: () => {
                calls.push('asset');
            },
            onPress: () => {
                calls.push('bubble');
            },
            onAction: () => {
                calls.push('action');
            },
        });
        await page.keyboard.press('Tab');
        await expect(component.getByRole('button', {name: "Open Ana's profile"})).toBeFocused();
        await page.keyboard.press('Enter');
        await expect.poll(() => calls).toEqual(['asset']);
        await page.keyboard.press('Tab');
        await expect(component.getByRole('button', {name: 'Mensaje: Hello'})).toBeFocused();
        await page.keyboard.press('Space');
        await expect.poll(() => calls).toEqual(['asset', 'bubble']);
        await page.keyboard.press('Tab');
        await expect(component.getByRole('button', {name: 'Copy'})).toBeFocused();
        await page.keyboard.press('Enter');
        await expect.poll(() => calls).toEqual(['asset', 'bubble', 'action']);
    });
test('decorative assets are excluded from the accessible name', async ({mount}) => {
    const component = await mount<typeof Example>('message/Example', {
        type: 'incoming',
        decorativeAsset: true,
        contentText: 'Hello',
        onPress: () => {},
    });
    await expect(component.getByRole('img')).toHaveCount(0);
    await expect(component.getByRole('button', {name: 'Mensaje: Hello'})).toHaveCount(1);
});
test('outgoing errors announce a custom message, hide the timestamp and can be retried', async ({mount}) => {
    let calls = 0;
    const component = await mount<typeof Example>('message/Example', {
        type: 'outgoing',
        contentText: 'Hello',
        error: true,
        errorMessage: 'Try again',
        timestamp: '13:00',
        onPress: () => {
            calls++;
        },
    });
    await expect(component.getByRole('alert')).toContainText('Try again');
    await expect(component.getByText('13:00')).toHaveCount(0);
    await component.getByRole('button', {name: 'Tú: Hello Try again'}).click();
    await expect.poll(() => calls).toBe(1);
});
test('incoming errors retain the timestamp and include it in the accessible name', async ({mount}) => {
    const component = await mount<typeof Example>('message/Example', {
        type: 'incoming',
        contentText: 'Hello',
        error: true,
        errorMessage: 'Try again',
        timestamp: '13:00',
        onPress: () => {},
    });
    await expect(component.getByText('13:00')).toHaveCount(1);
    await expect(component.getByRole('button', {name: 'Mensaje: Hello 13:00 Try again'})).toHaveCount(1);
    await expect(component.getByRole('alert')).toContainText('Try again');
});
for (const interactive of [false, true])
    test(`errors display the product message for ${interactive ? 'interactive' : 'static'} messages`, async ({
        mount,
    }) => {
        const component = await mount<typeof Example>('message/Example', {
            type: 'outgoing',
            contentText: 'Hello',
            error: true,
            errorMessage: 'Contact support',
            ...(interactive ? {onPress: () => {}} : {}),
        });
        await expect(component.getByRole('alert')).toHaveText('Contact support');
    });
test('explicit accessible labels override the generated name', async ({mount}) => {
    const component = await mount('message/Example', {
        type: 'incoming',
        contentText: 'Details',
        href: '/details',
        'aria-label': 'Open details',
    });
    await expect(component.getByRole('link', {name: 'Open details'})).toHaveAttribute('href', '/details');
});
test('changing action position or removing actions never duplicates them', async ({mount}) => {
    const props = {type: 'incoming', contentText: 'Hello'};
    const component = await mount('message/Example', {...props, actions: true});
    await expect(component.getByRole('button', {name: 'Copy'})).toHaveCount(1);
    await component.update({...props, actionsPosition: 'side', actions: true});
    await expect(component.getByRole('button', {name: 'Copy'})).toHaveCount(1);
    await component.update({...props, actionsPosition: 'side'});
    await expect(component.getByRole('button', {name: 'Copy'})).toHaveCount(0);
});
for (const actionsPosition of ['side', 'footer'] as const)
    test(`error messages retain content and slots with ${actionsPosition} actions`, async ({mount}) => {
        const calls: Array<string> = [];
        const component = await mount<typeof Example>('message/Example', {
            type: 'outgoing',
            contentText: 'Hello',
            contentSlot: true,
            footerSlot: true,
            sideSlot: true,
            error: true,
            errorMessage: 'Try again',
            actionsPosition,
            actions: true,
            onPress: () => {
                calls.push('retry');
            },
            onAction: () => {
                calls.push('action');
            },
        });
        await expect(component.getByRole('button', {name: 'Tú: Hello Details Try again'})).toHaveCount(1);
        await expect(component.getByText('Side', {exact: true})).toHaveCount(1);
        await expect(component.getByRole('alert')).toContainText('Try again');
        await component.getByRole('button', {name: 'Copy'}).click();
        await expect.poll(() => calls).toEqual(['action']);
    });
for (const error of [true, false])
    test(`Footer controls remain independent of the bubble (${error ? 'error' : 'default'})`, async ({
        mount,
        page,
    }) => {
        const calls: Array<string> = [];
        const component = await mount<typeof Example>('message/Example', {
            type: 'outgoing',
            contentText: 'Hello',
            ...(error ? {error: true, errorMessage: 'Try again'} : {}),
            footerControl: true,
            onPress: () => {
                calls.push('retry');
            },
            onFooter: () => {
                calls.push('footer');
            },
        });
        const footer = component.getByRole('button', {name: 'Footer action'});
        const bubble = component.getByRole('button', {
            name: error ? 'Tú: Hello Try again' : 'Tú: Hello',
            exact: true,
        });
        await expect(bubble.getByRole('button', {name: 'Footer action'})).toHaveCount(0);
        await footer.click();
        await expect.poll(() => calls).toEqual(['footer']);
        await footer.focus();
        await page.keyboard.press('Enter');
        await expect.poll(() => calls).toEqual(['footer', 'footer']);
        await bubble.click();
        await expect.poll(() => calls).toEqual(['footer', 'footer', 'retry']);
    });
