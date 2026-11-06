import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID', 'DESKTOP'];

for (const testCase of DEVICES) {
    const device = testCase;
    test(`ButtonGroup (${testCase})`, async () => {
        const page = await openStoryPage({
            id: 'components-buttons-buttongroup--default',
            device,
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`ButtonGroup (${testCase}) - small`, async () => {
        const page = await openStoryPage({
            id: 'components-buttons-buttongroup--default',
            device,
            args: {small: true},
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`ButtonGroup - Long text (${testCase})`, async () => {
        const page = await openStoryPage({
            id: 'components-buttons-buttongroup--default',
            device,
            args: {buttonPrimaryText: 'A very long action text in this button', buttonLink: false},
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}
