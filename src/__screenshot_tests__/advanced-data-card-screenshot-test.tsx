import {openStoryPage, screen} from '../test-utils';

test.each`
    Actions              | footerImage
    ${'none'}            | ${false}
    ${'button'}          | ${false}
    ${'link'}            | ${false}
    ${'button and link'} | ${false}
    ${'none'}            | ${true}
    ${'button'}          | ${true}
    ${'link'}            | ${true}
    ${'button and link'} | ${true}
`('Advanced Data Card', async ({Actions, footerImage}) => {
    await openStoryPage({
        id: 'community-advanceddatacard--default',
        device: 'MOBILE_IOS',
        args: {Actions, footerImage},
    });

    const element = await screen.findByTestId('advanced-data-card');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});
