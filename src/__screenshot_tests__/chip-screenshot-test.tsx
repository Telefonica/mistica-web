import {openStoryPage, screen} from '../test-utils';

test('Chip', async () => {
    await openStoryPage({id: 'components-others-chip--default'});

    const story = await screen.findByTestId('chip-story');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
