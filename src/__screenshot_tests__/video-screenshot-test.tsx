import {openStoryPage, screen} from '../test-utils';

test('Video', async () => {
    await openStoryPage({id: 'components-others-video--default'});

    const story = await screen.findByTestId('video');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
