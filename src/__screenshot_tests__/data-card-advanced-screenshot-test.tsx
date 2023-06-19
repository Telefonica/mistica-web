import {openStoryPage, screen} from '../test-utils';

test.each`
    bottomActions
    ${'none'}
    ${'button'}
    ${'link'}
    ${'button and link'}
    ${'footerImage'}
    ${'button and footerImage'}
    ${'link and footerImage'}
    ${'button link and footerImage'}
`('Data Card Advanced', async ({bottomActions}) => {
    await openStoryPage({
        id: 'community-datacardadvanced--default',
        device: 'MOBILE_IOS',
        args: {bottomActions},
    });

    const element = await screen.findByTestId('data-card-advanced');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});
