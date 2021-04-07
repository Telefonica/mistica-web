import {openStoryPage, screen} from '../test-utils';

test.each`
    inverse
    ${true}
    ${false}
`('Boxed inverse($inverse)', async ({inverse}) => {
    await openStoryPage({
        section: 'Components/Layouts/Boxed',
        name: 'Boxed',
        device: 'MOBILE_IOS',
    });

    if (inverse) {
        await (await screen.findByText('Inverse')).click();
    }

    const image = await (await screen.findByTestId('boxed')).screenshot();
    expect(image).toMatchImageSnapshot();
});
