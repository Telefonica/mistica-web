import {openStoryPage} from '../test-utils';
import type {Device} from '../test-utils';
import {MOVISTAR_SKIN, VIVO_SKIN, O2_SKIN} from '../skins/constants';

const testableSkins = [MOVISTAR_SKIN, VIVO_SKIN, O2_SKIN];
const testableDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const feedbackTypes = ['Success', 'Error', 'Info'];

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
        section: 'Components|Feedbacks/FeedbackScreen',
        name: `${feedbackType}FeedbackScreen`,
        skin,
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
