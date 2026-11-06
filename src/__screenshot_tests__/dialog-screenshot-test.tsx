import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

for (const testCase of [
    {device: 'MOBILE_IOS', action: 'alert'},
    {device: 'DESKTOP', action: 'alert'},
    {device: 'MOBILE_IOS', action: 'confirm'},
    {device: 'DESKTOP', action: 'confirm'},
    {device: 'MOBILE_IOS', action: 'confirm destructive'},
    {device: 'DESKTOP', action: 'confirm destructive'},
    {device: 'MOBILE_IOS', action: 'dialog'},
    {device: 'DESKTOP', action: 'dialog'},
] as const) {
    const {device, action} = testCase;
    test(`Dialog - device: ${testCase.device}, action: ${testCase.action}`, async () => {
        const type = (action as string).split(' ')[0];

        const page = await openStoryPage({
            id: `components-modals--${type}`,
            device,
            args: {destructive: action.includes('destructive')},
        });

        await (await screen.findByRole('button', {name: 'Open'})).click();

        await screen.findByRole('dialog');
        await expectScreenshot(page, {fullPage: true});
    });
}

test('Select options are correctly positioned inside a dialog', async () => {
    const page = await openStoryPage({
        id: 'components-modals--dialog',
        device: 'DESKTOP',
    });

    await (await screen.findByRole('button', {name: 'Open'})).click();
    await screen.findByRole('dialog');
    await (await screen.findByRole('button', {name: 'Select Orange'})).click();

    await expectScreenshot(page, {...{fullPage: true}});
});

test('Dialog optional elements are not displayed if not provided', async () => {
    const page = await openStoryPage({
        id: 'components-modals--dialog',
        device: 'DESKTOP',
        args: {
            message: 'Message',
            title: '',
            subtitle: '',
            onAccept: false,
            onCancel: false,
            link: false,
            asset: false,
            slot: false,
        },
    });

    await (await screen.findByRole('button', {name: 'Open'})).click();
    await screen.findByRole('dialog');

    await expectScreenshot(page, {...{fullPage: true}});
});
