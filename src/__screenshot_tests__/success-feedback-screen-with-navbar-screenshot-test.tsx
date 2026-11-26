import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';
import {MOVISTAR_SKIN, O2_SKIN} from '../skins/constants';

import type {Device} from '../test-utils';

const testableSkins = [MOVISTAR_SKIN, O2_SKIN] as const;
const testableDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

const cases: Array<[string, Device]> = [];
for (const skin of testableSkins) {
    for (const device of testableDevices) {
        cases.push([skin, device]);
    }
}

for (const testCase of cases) {
    const [skin, device] = testCase;
    test(`SuccessFeedbackScreen with NavigationBar - ${testCase[0]} - ${testCase[1]}`, async () => {
        const page = await openStoryPage({
            id: `private-fixedfooter--default`,
            skin: skin as (typeof testableSkins)[number],
            device,
        });

        await expectScreenshot(page);
    });
}
