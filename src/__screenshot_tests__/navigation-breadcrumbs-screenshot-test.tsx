import {openStoryPage, screen} from '../test-utils';

test.each`
    device          | inverse  | dark
    ${'DESKTOP'}    | ${false} | ${false}
    ${'MOBILE_IOS'} | ${false} | ${false}
    ${'MOBILE_IOS'} | ${true}  | ${false}
    ${'MOBILE_IOS'} | ${false} | ${true}
`('Breadcrumbs - device: $device - inverse: $inverse - dark: $dark', async ({device, inverse, dark}) => {
    await openStoryPage({
        id: 'components-breadcrumbs--default',
        device,
        isDarkMode: dark,
        args: {inverse},
    });

    const element = await screen.findByTestId('story');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
