import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS_SMALL', 'MOBILE_IOS', 'DESKTOP'];

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Double Field (${JSON.stringify(testCase)})`, async () => {
        const page = await openStoryPage({
            id: 'layout-double-field--default',
            device,
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Double Field: Full width (${JSON.stringify(testCase)})`, async () => {
        const page = await openStoryPage({
            id: 'layout-double-field--full-width',
            device,
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}
