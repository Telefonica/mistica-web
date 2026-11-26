import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

test('Grid', async () => {
    const page = await openStoryPage({
        id: 'layout-grid--default',
        device: 'MOBILE_IOS',
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

const devices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

for (const testCase of devices) {
    const device = testCase;
    test(`Grid auto columns ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'layout-grid--auto-columns',
            device,
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}
