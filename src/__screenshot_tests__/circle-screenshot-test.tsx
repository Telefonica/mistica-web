import {openStoryPage, screen} from '../test-utils';

const CONTENT_OPTIONS = ['color', 'image', 'icon', 'none'];

test.each(CONTENT_OPTIONS)('Circle - %s', async (content) => {
    await openStoryPage({
        id: 'components-primitives-circle--default',
        args: {content, border: content === 'none', size: 100},
    });

    const story = await screen.findByTestId('circle');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
