import {openStoryPage, screen} from '../test-utils';

import type {KnownSkinName} from '../skins/types';

const SKINS: Array<KnownSkinName> = [
    'Movistar',
    'Movistar-new',
    'O2',
    'O2-new',
    'Vivo',
    'Vivo-new',
    'Telefonica',
    'Blau',
    'Tu',
    'Esimflag',
];
const LOGO_TYPES = ['imagotype', 'vertical', 'isotype'];
const INVERSE_VALUES = [false, true];
const DARK_MODE_VALUES = [false, true];

const getBrandLogoCases = () => {
    const cases = [];
    for (const skin of SKINS) {
        if (skin !== 'Vivo-new') {
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

test.each(getBrandLogoCases())(
    'Logo. brand={%s} type={%s} isInverse={%s} isDarkMode={%s}',
    async (brand, type, isInverse, isDarkMode) => {
        await openStoryPage({
            id: 'components-logo--default',
            device: 'DESKTOP',
            args: {forceBrandLogo: true, brand, type, isInverse},
            isDarkMode: isDarkMode as boolean,
        });

        const story = await screen.findByTestId('logo');

        const image = await story.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each(SKINS)('Logo. Default brand with skin={%s}', async (skin: KnownSkinName) => {
    await openStoryPage({
        id: 'components-logo--default',
        device: 'DESKTOP',
        skin,
    });

    const story = await screen.findByTestId('logo');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(SKINS)('Logo with color override skin=%s', async (skin: KnownSkinName) => {
    await openStoryPage({
        id: 'components-logo--default',
        skin,
        args: {color: '#000000', size: 64, type: 'imagotype'},
    });

    const story = await screen.findByTestId('logo');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
