import {openStoryPage, setRootFontSize} from '../test-utils';
import {MOVISTAR_SKIN, VIVO_SKIN, O2_SKIN} from '../skins/constants';

import type {Device} from '../test-utils';

const testableSkins = [MOVISTAR_SKIN, VIVO_SKIN, O2_SKIN];
const testableDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const feedbackTypes = [
    'successfeedbackscreen--success',
    'errorfeedbackscreen--error',
    'infofeedbackscreen--info',
];

const cases: Array<[string, string, Device]> = [];
for (const skin of testableSkins) {
    for (const device of testableDevices) {
        for (const feedbackType of feedbackTypes) {
            cases.push([feedbackType, skin, device]);
        }
    }
}

test.each(cases)('Feedback %s screen appears properly on %s and %s', async (feedbackType, skin, device) => {
    const page = await openStoryPage({
        id: `components-screens-feedbackscreen-${feedbackType}`,
        skin: skin as never,
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Feedback screen with large fontSize', async () => {
    const page = await openStoryPage({
        id: 'components-screens-feedbackscreen-successfeedbackscreen--success',
        skin: MOVISTAR_SKIN,
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
