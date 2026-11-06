import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';
import {MOVISTAR_SKIN, VIVO_SKIN, VIVO_EVOLUTION_SKIN, BLAU_SKIN, O2_SKIN} from '../skins/constants';

import type {Device} from '../test-utils';

const testableSkins = [MOVISTAR_SKIN, VIVO_SKIN, VIVO_EVOLUTION_SKIN, O2_SKIN, BLAU_SKIN];
const testableDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

const cases: Array<[string, Device]> = [];
for (const skin of testableSkins) {
    for (const device of testableDevices) {
        cases.push([skin, device]);
    }
}

for (const testCase of cases) {
    const [skin, device] = testCase;
    test(`Success Feedback component appears properly on ${testCase[0]} and ${testCase[1]}`, async () => {
        const page = await openStoryPage({
            id: `patterns-feedback-successfeedback--success`,
            skin: skin as never,
            device,
        });

        await expectScreenshot(page);
    });
}

for (const testCase of testableDevices) {
    const device = testCase;
    test(`Success Feedback component appears properly as a Success Header on ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'patterns-feedback-successfeedback--success-as-header',
            skin: MOVISTAR_SKIN,
            device,
        });

        await expectScreenshot(page);
    });
}

for (const testCase of testableDevices) {
    const device = testCase;
    test(`Success Feedback component appears properly with Vivo skin on ${testCase}`, async () => {
        const page = await openStoryPage({
            id: `patterns-feedback-successfeedback--success`,
            skin: VIVO_SKIN,
            device,
        });

        await expectScreenshot(page);
    });
}
