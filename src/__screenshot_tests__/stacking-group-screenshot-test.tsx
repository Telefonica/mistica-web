import {openStoryPage, screen, ssimScreenshotConfig} from '../test-utils';

test.each`
    type        | stacked  | inverse
    ${'square'} | ${true}  | ${false}
    ${'circle'} | ${true}  | ${false}
    ${'square'} | ${false} | ${false}
    ${'circle'} | ${false} | ${false}
    ${'square'} | ${true}  | ${true}
    ${'circle'} | ${true}  | ${true}
    ${'square'} | ${false} | ${true}
    ${'circle'} | ${false} | ${true}
`('Stacking Group. type={$type} stacked={$stacked} inverse={$inverse}', async ({type, stacked, inverse}) => {
    await openStoryPage({
        id: 'components-stackinggroup--default',
        device: 'DESKTOP',
        args: {type, stacked, inverse},
    });

    const element = await screen.findByTestId('stacking-group');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot(ssimScreenshotConfig);
});
