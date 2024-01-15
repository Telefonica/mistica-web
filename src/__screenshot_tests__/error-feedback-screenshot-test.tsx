import {openStoryPage, screen} from '../test-utils';
import {MOVISTAR_SKIN, O2_SKIN} from '../skins/constants';

import type {Device} from '../test-utils';

const testableSkins = [MOVISTAR_SKIN, O2_SKIN] as const;
const testableDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

const cases: Array<[(typeof testableSkins)[number], Device]> = [];
for (const skin of testableSkins) {
    for (const device of testableDevices) {
        cases.push([skin, device]);
    }
}

test.each(cases)('ErrorFeedback on %s and %s', async (skin, device) => {
    await openStoryPage({
        id: `patterns-feedback-errorfeedback--error-feedback-story`,
        skin,
        device,
        args: {
            errorReference: 'E-1234',
        },
    });

    const errorFeedback = await screen.findByTestId('error-feedback');

    const image = await errorFeedback.screenshot();
    expect(image).toMatchImageSnapshot();
});
