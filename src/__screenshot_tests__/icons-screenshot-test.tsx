import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';

const SKINS = ['Movistar', 'O2', 'Blau'] as const;
const ICON_TYPES = ['light', 'regular', 'filled'];

const getCases = () => {
    const cases = [];
    for (const skin of SKINS) {
        for (const type of ICON_TYPES) {
            cases.push([skin, type]);
        }
    }
    return cases;
};

for (const testCase of getCases()) {
    const [skin, type] = testCase;
    test(`Icons catalog for ${testCase[0]} (${testCase[1]})`, async () => {
        const page = await openStoryPage({
            id: 'icons-catalog--catalog',
            device: 'DESKTOP',
            skin: skin as (typeof SKINS)[number],
            args: {light: type === 'light', regular: type === 'regular', filled: type === 'filled', size: 32},
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}
