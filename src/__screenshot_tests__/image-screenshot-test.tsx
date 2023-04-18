import {openStoryPage, screen} from '../test-utils';

test('Image', async () => {
    await openStoryPage({id: 'components-primitives-image--default'});

    const story = await screen.findByTestId('image-story');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
