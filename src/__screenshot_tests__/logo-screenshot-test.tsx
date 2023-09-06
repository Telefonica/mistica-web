import {openStoryPage, screen} from '../test-utils';

const SKINS = ['Movistar', 'O2', 'Vivo', 'Vivo-new', 'Telefonica', 'Blau'] as const;
const LOGO_TYPES = ['imagotype', 'vertical', 'isotype'];
const INVERSE_VALUES = [false, true];
const DARK_MODE_VALUES = [false, true];

const getCases = () => {
    const cases = [];
    for (const skin of SKINS) {
        for (const type of LOGO_TYPES) {
            for (const isInverse of INVERSE_VALUES) {
                for (const isDarkMode of DARK_MODE_VALUES) {
                    cases.push([skin, type, isInverse, isDarkMode]);
                }
            }
        }
    }
    return cases;
};

test.each(getCases())(
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

test.each(SKINS)('Logo. Default brand with skin={%s}', async (skin) => {
    await openStoryPage({
        id: 'components-logo--default',
        device: 'DESKTOP',
        skin: skin as (typeof SKINS)[number],
    });

    const story = await screen.findByTestId('logo');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
