import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';

test('Private example', async () => {
    const page = await openStoryPage({
        id: 'private-example--default',
    });

    await expectScreenshot(page);
});
