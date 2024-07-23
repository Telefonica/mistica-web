import {openStoryPage} from '../test-utils';
import {MOVISTAR_SKIN, O2_NEW_SKIN} from '../skins/constants';

import type {Device} from '../test-utils';

const testableSkins = [MOVISTAR_SKIN, O2_NEW_SKIN] as const;
const testableDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

const cases: Array<[string, Device]> = [];
for (const skin of testableSkins) {
    for (const device of testableDevices) {
        cases.push([skin, device]);
    }
}

test.each(cases)('SuccessFeedbackScreen with NavigationBar - %s - %s', async (skin, device) => {
    const page = await openStoryPage({
        id: `private-fixedfooter--default`,
        skin: skin as (typeof testableSkins)[number],
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
