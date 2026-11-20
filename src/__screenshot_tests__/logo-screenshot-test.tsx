import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

import type {KnownSkinName} from '../skins/types';

const SKINS: Array<KnownSkinName> = [
    'Movistar',
    'O2',
    'Vivo',
    'Vivo-evolution',
    'Telefonica',
    'Blau',
    'Esimflag',
];
const LOGO_TYPES = ['imagotype', 'vertical', 'isotype'];
const INVERSE_VALUES = [false, true];
const DARK_MODE_VALUES = [false, true];

const getBrandLogoCases = () => {
    const cases = [];
    for (const skin of SKINS) {
        if (skin !== 'Vivo-evolution') {
            for (const type of LOGO_TYPES) {
                for (const isInverse of INVERSE_VALUES) {
                    for (const isDarkMode of DARK_MODE_VALUES) {
                        cases.push([skin, type, isInverse, isDarkMode]);
                    }
                }
            }
        }
    }
    return cases;
};

for (const testCase of getBrandLogoCases()) {
    const [brand, type, isInverse, isDarkMode] = testCase;
    test(`Logo. brand={${testCase[0]}} type={${testCase[1]}} isInverse={${testCase[2]}} isDarkMode={${testCase[3]}}`, async () => {
        await openStoryPage({
            id: 'components-logo--default',
            device: 'DESKTOP',
            args: {forceBrandLogo: true, brand, type, variantOutside: isInverse ? 'brand' : 'default'},
            isDarkMode: isDarkMode as boolean,
        });

        const story = await screen.findByTestId('logo');

        await expectScreenshot(story);
    });
}

for (const testCase of SKINS) {
    const skin = testCase as KnownSkinName;
    test(`Logo. Default brand with skin={${testCase}}`, async () => {
        await openStoryPage({
            id: 'components-logo--default',
            device: 'DESKTOP',
            skin,
        });

        const story = await screen.findByTestId('logo');

        await expectScreenshot(story);
    });
}

for (const testCase of SKINS) {
    const skin = testCase as KnownSkinName;
    test(`Logo with color override skin=${testCase}`, async () => {
        await openStoryPage({
            id: 'components-logo--default',
            skin,
            args: {color: '#000000', size: 64, type: 'imagotype'},
        });

        const story = await screen.findByTestId('logo');

        await expectScreenshot(story);
    });
}
