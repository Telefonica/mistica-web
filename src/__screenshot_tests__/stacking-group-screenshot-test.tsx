import {openStoryPage, screen} from '../test-utils';

test.each`
    size    | type        | stacked  | inverse
    ${'64'} | ${'image'}  | ${false} | ${false}
    ${'64'} | ${'avatar'} | ${false} | ${false}
    ${'64'} | ${'image'}  | ${true}  | ${false}
    ${'64'} | ${'avatar'} | ${true}  | ${false}
    ${'64'} | ${'image'}  | ${false} | ${true}
    ${'64'} | ${'avatar'} | ${false} | ${true}
    ${'64'} | ${'image'}  | ${true}  | ${true}
    ${'64'} | ${'avatar'} | ${true}  | ${true}
`('Stacking Group', async ({size, type, stacked, inverse}) => {
    await openStoryPage({
        id: 'components-stackinggroup--default',
        device: 'DESKTOP',
        args: {size, type, stacked, inverse},
    });

    const element = await screen.findByTestId('stacking-group');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});
