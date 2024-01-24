import {openStoryPage, screen} from '../test-utils';

test('Inline cases', async () => {
    await openStoryPage({
        id: 'private-inline-cases--default',
    });

    const story = await screen.findByTestId('story');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
