import {openStoryPage, screen} from '../test-utils';

test('Image', async () => {
    await openStoryPage({id: 'components-others-image--default'});

    const story = await screen.findByTestId('image-story');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
