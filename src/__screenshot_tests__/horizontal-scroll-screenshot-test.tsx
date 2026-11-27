import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';

test('HorizontalScroll', async () => {
    const page = await openStoryPage({
        id: 'layout-horizontalscroll--default',
    });

    await expectScreenshot(page);
});
