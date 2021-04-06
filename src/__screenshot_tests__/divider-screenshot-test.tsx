import {openStoryPage, screen} from '../test-utils';

test('Divider', async () => {
    await openStoryPage({
        section: 'Components/Others/Divider',
        name: 'Divider',
    });

    const story = await screen.findByTestId('divider-story');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
