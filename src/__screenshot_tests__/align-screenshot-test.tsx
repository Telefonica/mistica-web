import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const ALIGN_OPTIONS = ['start', 'center', 'end'];

const getCases = () => {
    const cases = [];
    for (const x of ALIGN_OPTIONS) {
        for (const y of ALIGN_OPTIONS) {
            cases.push([x, y]);
        }
    }
    return cases;
};

for (const testCase of getCases()) {
    const [x, y] = testCase;
    test(`Align x="${testCase[0]}" and y="${testCase[1]}" (%s)`, async () => {
        await openStoryPage({
            id: 'layout-align--default',
            device: 'MOBILE_IOS',
            args: {x, y},
        });

        const element = await screen.findByTestId('story');
        await expectScreenshot(element);
    });
}
