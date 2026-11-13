import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

test('Inline cases', async () => {
    await openStoryPage({
        id: 'private-inline-cases--default',
    });

    const story = await screen.findByTestId('story');

    await expectScreenshot(story);
});
