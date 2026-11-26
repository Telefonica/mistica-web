import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`MasterDetailLayout in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'layout-master-detail-layout--default',
            device,
        });

        await expectScreenshot(page);

        await (await screen.findByText('Personal details')).click();

        await screen.findByText('You are inside Personal details section');

        await expectScreenshot(page);
    });
}
