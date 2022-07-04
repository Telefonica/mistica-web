import {openStoryPage, screen} from '../test-utils';

test('TextLink common component screenshot', async () => {
    await openStoryPage({id: 'components-textlink--default'});

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});
