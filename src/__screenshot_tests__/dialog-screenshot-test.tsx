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

    await (await screen.findByRole('button', {name: 'Open'})).click();

    const image = await page.screenshot({fullPage: true});

    await screen.findByRole('dialog');
    expect(image).toMatchImageSnapshot();
});

test('Select options are correctly positioned inside a dialog', async () => {
    const page = await openStoryPage({
        id: 'components-modals--dialog',
        device: 'DESKTOP',
    });

    await (await screen.findByRole('button', {name: 'Open'})).click();
    await screen.findByRole('dialog');
    await (await screen.findByLabelText('Select')).click();

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
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
            extra: false,
        },
    });

    await (await screen.findByRole('button', {name: 'Open'})).click();
    await screen.findByRole('dialog');

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
