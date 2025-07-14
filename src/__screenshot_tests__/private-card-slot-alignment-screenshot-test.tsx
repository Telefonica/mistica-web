import {openStoryPage, screen} from '../test-utils';

test('Card slot alignment', async () => {
    await openStoryPage({id: 'private-card-slot-alignment--slot-alignment'});

    const story = await screen.findByTestId('story');

    const image = await story.screenshot();

    expect(image).toMatchImageSnapshot();
});
