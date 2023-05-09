import {openStoryPage, screen} from '../test-utils';

test.each`
    type        | stacked  | inverse
    ${'square'} | ${false} | ${false}
    ${'circle'} | ${false} | ${false}
    ${'square'} | ${true}  | ${false}
    ${'circle'} | ${true}  | ${false}
    ${'square'} | ${false} | ${true}
    ${'circle'} | ${false} | ${true}
    ${'square'} | ${true}  | ${true}
    ${'circle'} | ${true}  | ${true}
    `('Stacking Group', async ({ type, stacked, inverse}) => {
    await openStoryPage({
        id: 'components-stackinggroup--default',
        device: 'DESKTOP',
        args: { type, stacked, inverse},
    });

    const element = await screen.findByTestId('stacking-group');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});
