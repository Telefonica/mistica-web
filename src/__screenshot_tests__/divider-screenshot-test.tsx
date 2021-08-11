import {openStoryPage, screen} from '../test-utils';

test('Divider', async () => {
    await openStoryPage({id: 'components-others-divider--default'});

    const story = await screen.findByTestId('divider-story');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
