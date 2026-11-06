import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

const testDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

for (const testCase of testDevices) {
    const device = testCase;
    test(`ButtonLayout UI package, device: ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'layout-button-layout--default',
            device,
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}
