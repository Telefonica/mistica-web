import {openStoryPage} from '../test-utils';
import {MOVISTAR_SKIN, VIVO_SKIN, O2_SKIN} from '../skins/constants';

import type {Device} from '../test-utils';

const testableSkins = [MOVISTAR_SKIN, VIVO_SKIN, O2_SKIN];
const testableDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

const cases: Array<[string, Device]> = [];
for (const skin of testableSkins) {
    for (const device of testableDevices) {
        cases.push([skin, device]);
    }
}

test.each(cases)('Success Feedback component appears properly on %s and %s', async (skin, device) => {
    const page = await openStoryPage({
        id: `patterns-feedback-successfeedback--success`,
        skin: skin as never,
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(testableDevices)(
    'Success Feedback component appears properly as a Success Header on %s',
    async (device) => {
        const page = await openStoryPage({
            id: 'patterns-feedback-successfeedback--success-as-header',
            skin: MOVISTAR_SKIN,
            device,
        });

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);
