import {openStoryPage, screen} from '../test-utils';

test('TextLink common component screenshot', async () => {
    await openStoryPage({
        section: 'Components|Touchables/TextLink',
        name: 'TextLink',
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});
