import {test, expectScreenshot} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr image', async () => {
    const page = await openSSRPage({name: 'image', waitUntil: 'networkidle'});

    await expectScreenshot(page);
});
