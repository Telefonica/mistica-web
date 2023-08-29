import {openStoryPage, screen} from '../test-utils';

test('Divider', async () => {
    await openStoryPage({id: 'components-divider--default'});

    const story = await screen.findByTestId('divider-story');

    expect(await story.screenshot()).toMatchImageSnapshot();
});

test('Divider - inverse', async () => {
    await openStoryPage({id: 'components-divider--default', args: {inverse: true}});

    const story = await screen.findByTestId('divider-story');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
