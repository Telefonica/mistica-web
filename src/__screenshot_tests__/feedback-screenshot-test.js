// @flow
import {openStoryPage} from '../test-utils';

const testableBrands = ['Movistar', 'Vivo', 'O2'];
const testableDevices = ['MOBILE_IOS', 'DESKTOP'];
const feedbackTypes = ['success', 'error', 'info'];

const cases = [];
for (const brand of testableBrands) {
    for (const device of testableDevices) {
        for (const feedbackType of feedbackTypes) {
            cases.push([feedbackType, brand, device]);
        }
    }
}

test.each(cases)('Feedback %s screen appears properly on %s and %s', async (feedbackType, brand, device) => {
    const page = await openStoryPage({
        section: 'Components|Feedbacks/Screens',
        name: `${feedbackType}-feedback-screen`,
        brand,
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
