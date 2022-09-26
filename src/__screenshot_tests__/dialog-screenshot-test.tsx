import {openStoryPage, screen} from '../test-utils';

test.each`
    device          | action
    ${'MOBILE_IOS'} | ${'Open one button'}
    ${'DESKTOP'}    | ${'Open one button'}
    ${'MOBILE_IOS'} | ${'Open two buttons'}
    ${'DESKTOP'}    | ${'Open two buttons'}
    ${'MOBILE_IOS'} | ${'Open two buttons (with icon)'}
    ${'DESKTOP'}    | ${'Open two buttons (with icon)'}
    ${'MOBILE_IOS'} | ${'Open two buttons destructive'}
    ${'DESKTOP'}    | ${'Open two buttons destructive'}
    ${'MOBILE_IOS'} | ${'Open dialog'}
    ${'DESKTOP'}    | ${'Open dialog'}
`('Dialog, device: $device, action: $action', async ({device, action}) => {
    const page = await openStoryPage({
        id: 'components-dialog--default',
        device,
    });

    await (await screen.findByText(action)).click();

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
