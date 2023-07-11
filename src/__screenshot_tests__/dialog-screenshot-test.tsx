import {openStoryPage, screen} from '../test-utils';

test.each`
    device          | action
    ${'MOBILE_IOS'} | ${'Open one button'}
    ${'DESKTOP'}    | ${'Open one button'}
    ${'MOBILE_IOS'} | ${'Open two buttons'}
    ${'DESKTOP'}    | ${'Open two buttons'}
    ${'MOBILE_IOS'} | ${'Open two buttons destructive'}
    ${'DESKTOP'}    | ${'Open two buttons destructive'}
    ${'MOBILE_IOS'} | ${'Open dialog'}
    ${'DESKTOP'}    | ${'Open dialog'}
`('Dialog, device: $device, action: $action', async ({device, action}) => {
    const page = await openStoryPage({
        id: 'components-modals--default',
        device,
    });

    await (await screen.findByRole('button', {name: action})).click();

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test('Select options are correctly positioned inside a dialog', async () => {
    const page = await openStoryPage({
        id: 'components-modals--default',
        device: 'DESKTOP',
    });

    await (await screen.findByRole('button', {name: 'Open dialog'})).click();
    await (await screen.findByLabelText('Select')).click();

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
