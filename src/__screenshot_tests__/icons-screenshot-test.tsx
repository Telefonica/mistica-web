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

test.each(getCases())('Icons catalog for %s (%s)', async (skin, type) => {
    const page = await openStoryPage({
        id: 'icons-catalog--catalog',
        device: 'DESKTOP',
        skin: skin as (typeof SKINS)[number],
        args: {light: type === 'light', regular: type === 'regular', filled: type === 'filled', size: 32},
    });

    const icons = await page.screenshot({fullPage: true});
    expect(icons).toMatchImageSnapshot();
});
