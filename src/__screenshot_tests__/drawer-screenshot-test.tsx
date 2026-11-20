import {test, expect, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, waitFor} from '../test-utils';

import type {Device} from '../test-utils';

for (const testCase of [
    {device: 'MOBILE_IOS', withActions: true, dismissible: true, contentLength: 1},
    {device: 'MOBILE_IOS', withActions: true, dismissible: true, contentLength: 5},
    {device: 'MOBILE_IOS', withActions: true, dismissible: false, contentLength: 1},
    {device: 'DESKTOP', withActions: true, dismissible: true, contentLength: 1},
    {device: 'TABLET', withActions: true, dismissible: true, contentLength: 1},
    {device: 'MOBILE_IOS', withActions: false, dismissible: true, contentLength: 1},
    {device: 'DESKTOP', withActions: false, dismissible: true, contentLength: 1},
    {device: 'TABLET', withActions: false, dismissible: true, contentLength: 1},
] as const) {
    const {device, withActions, dismissible, contentLength} = testCase;
    test(`Drawer ${testCase.device} actions:${testCase.withActions} dismissible:${testCase.dismissible} contentLength:${testCase.contentLength}`, async () => {
        const page = await openStoryPage({
            id: 'components-modals-drawer--default',
            device: device as Device,
            args: {
                showButton: withActions,
                showSecondaryButton: withActions,
                showButtonLink: withActions,
                onDismissHandler: dismissible,
                contentLength,
            },
        });

        const button = await screen.findByRole('button', {name: 'Open Drawer'});
        await button.click();

        await expectScreenshot(page);
    });
}

test('Drawer with form', async () => {
    const page = await openStoryPage({
        id: 'components-modals-drawer--default',
        device: 'DESKTOP',
        args: {
            form: 'true',
        },
    });

    await (await screen.findByRole('button', {name: 'Open Drawer'})).click();

    // the drawer is open with the form rendered
    await expectScreenshot(page);

    // submitting without filling the required "age" field shows a validation error and doesn't submit
    await (await screen.findByRole('button', {name: 'Primary'})).click();

    await screen.findByText('Este campo es obligatorio');
    await expectScreenshot(page);

    // once the required field is filled, the form can be submitted
    await (await screen.findByLabelText('Age')).type('30');
    await (await screen.findByRole('button', {name: 'Primary'})).click();

    const result = await screen.findByTestId('result');
    await waitFor(async () => {
        expect(await result.evaluate((el) => el.textContent)).toBe(
            JSON.stringify({name: 'Pepito', email: 'pepito@gmail.com', age: '30'})
        );
    });
});
