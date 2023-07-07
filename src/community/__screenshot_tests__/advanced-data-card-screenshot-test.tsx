import {openStoryPage, screen} from '../../test-utils';

test.each`
    actions              | footerImage
    ${'none'}            | ${false}
    ${'button'}          | ${false}
    ${'link'}            | ${false}
    ${'button and link'} | ${false}
    ${'none'}            | ${true}
    ${'button'}          | ${true}
    ${'link'}            | ${true}
    ${'button and link'} | ${true}
`('Advanced Data Card', async ({actions, footerImage}) => {
    await openStoryPage({
        id: 'community-advanceddatacard--default',
        device: 'MOBILE_IOS',
        args: {actions, footerImage},
    });

    const element = await screen.findByTestId('advanced-data-card');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});
