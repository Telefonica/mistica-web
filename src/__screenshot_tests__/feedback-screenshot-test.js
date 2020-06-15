// @flow
import {openStoryPage} from '../test-utils';

const testableSkins = ['Movistar', 'Vivo', 'O2'];
const testableDevices = ['MOBILE_IOS', 'DESKTOP'];
const feedbackTypes = ['Success', 'Error', 'Info'];

const cases = [];
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
