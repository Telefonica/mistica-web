import {openStoryPage, screen} from '../test-utils';

test('TextLink common component screenshot', async () => {
    await openStoryPage({id: 'components-text-link--default'});

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});
