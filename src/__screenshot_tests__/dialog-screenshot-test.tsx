import {openStoryPage, screen} from '../test-utils';

test.each`
    device          | action
    ${'MOBILE_IOS'} | ${'alert'}
    ${'DESKTOP'}    | ${'alert'}
    ${'MOBILE_IOS'} | ${'confirm'}
    ${'DESKTOP'}    | ${'confirm'}
    ${'MOBILE_IOS'} | ${'confirm destructive'}
    ${'DESKTOP'}    | ${'confirm destructive'}
    ${'MOBILE_IOS'} | ${'dialog'}
    ${'DESKTOP'}    | ${'dialog'}
`('Dialog - device: $device, action: $action', async ({device, action}) => {
    const type = (action as string).split(' ')[0];

    const page = await openStoryPage({
        id: `components-modals--${type}`,
        device,
        args: {destructive: action.includes('destructive')},
    });

    await (await screen.findByRole('button')).click();

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test('Select options are correctly positioned inside a dialog', async () => {
    const page = await openStoryPage({
        id: 'components-modals--dialog',
        device: 'DESKTOP',
    });

    await (await screen.findByRole('button')).click();
    await (await screen.findByLabelText('Select')).click();

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
