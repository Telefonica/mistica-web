import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

test('Card slot alignment', async () => {
    await openStoryPage({id: 'private-card-slot-alignment--slot-alignment'});

    const story = await screen.findByTestId('story');

    await expectScreenshot(story);
});
