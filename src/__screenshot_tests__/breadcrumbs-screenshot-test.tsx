import {openStoryPage, screen} from '../test-utils';

test.each`
    device          | inverse
    ${'DESKTOP'}    | ${false}
    ${'MOBILE_IOS'} | ${false}
    ${'MOBILE_IOS'} | ${true}
`('Breadcrumbs - device: $device - inverse: $inverse', async ({device, inverse}) => {
    await openStoryPage({id: 'components-breadcrumbs--default', device, args: {inverse}});

    const element = await screen.findByTestId('story');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
