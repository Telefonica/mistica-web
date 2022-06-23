import {openStoryPage, screen} from '../test-utils';

test('Video', async () => {
    await openStoryPage({id: 'components-others-video--default'});

    const story = await screen.findByTestId('video');

    await new Promise((r) => setTimeout(r, 2500));

    expect(await story.screenshot()).toMatchImageSnapshot();
});
