import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

test('Divider', async () => {
    await openStoryPage({id: 'components-divider--default'});

    const story = await screen.findByTestId('divider-story');

    await expectScreenshot(story);
});

test('Divider - inverse', async () => {
    await openStoryPage({id: 'components-divider--default', args: {variantOutside: 'brand'}});

    const story = await screen.findByTestId('divider-story');

    await expectScreenshot(story);
});
