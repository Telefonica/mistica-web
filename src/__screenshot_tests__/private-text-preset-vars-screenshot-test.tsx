import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const SKINS = ['Movistar', 'Vivo', 'O2'] as const;
const DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;

const getCases = () => {
    const cases = [];
    for (const skin of SKINS) {
        for (const device of DEVICES) {
            cases.push([skin, device]);
        }
    }
    return cases;
};

for (const testCase of getCases()) {
    const [skin, device] = testCase;
    test(`TextPresets as CSS vars in ${testCase[0]} (${testCase[1]})`, async () => {
        await openStoryPage({
            id: 'private-textpresets-css-vars--default',
            skin: skin as (typeof SKINS)[number],
            device: device as (typeof DEVICES)[number],
        });

        const story = await screen.findByTestId('story');
        await expectScreenshot(story);
    });
}
