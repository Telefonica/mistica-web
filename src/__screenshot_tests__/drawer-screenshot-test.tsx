import {openStoryPage, screen, waitFor} from '../test-utils';

import type {Device} from '../test-utils';

test.skip.each`
    device          | withActions | dismissible | contentLength
    ${'MOBILE_IOS'} | ${true}     | ${true}     | ${1}
    ${'MOBILE_IOS'} | ${true}     | ${true}     | ${5}
    ${'MOBILE_IOS'} | ${true}     | ${false}    | ${1}
    ${'DESKTOP'}    | ${true}     | ${true}     | ${1}
    ${'TABLET'}     | ${true}     | ${true}     | ${1}
    ${'MOBILE_IOS'} | ${false}    | ${true}     | ${1}
    ${'DESKTOP'}    | ${false}    | ${true}     | ${1}
    ${'TABLET'}     | ${false}    | ${true}     | ${1}
`(
    'Drawer $device actions:$withActions dismissible:$dismissible contentLength:$contentLength',
    async ({device, withActions, dismissible, contentLength}) => {
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

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

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
    expect(await page.screenshot()).toMatchImageSnapshot();

    // submitting without filling the required "age" field shows a validation error and doesn't submit
    await (await screen.findByRole('button', {name: 'Primary'})).click();

    await screen.findByText('Este campo es obligatorio');
    expect(await page.screenshot()).toMatchImageSnapshot();

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
