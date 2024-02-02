import {openStoryPage} from '../test-utils';

const SKINS = ['Movistar', 'O2', 'Vivo-new', 'Telefonica', 'Blau'] as const;

test.each(SKINS)('Components in %s', async (skin) => {
    const page = await openStoryPage({
        id: 'private-components-in-different-skins--default',
        skin,
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});

test.each(SKINS)('Components in %s (inverse)', async (skin) => {
    const page = await openStoryPage({
        id: 'private-components-in-different-skins--default',
        args: {inverse: true},
        skin,
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});

test.each(SKINS)('Components in %s (dark mode)', async (skin) => {
    const page = await openStoryPage({
        id: 'private-components-in-different-skins--default',
        isDarkMode: true,
        skin,
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});

test.each(SKINS)('Components in %s (inverse and dark mode)', async (skin) => {
    const page = await openStoryPage({
        id: 'private-components-in-different-skins--default',
        args: {inverse: true},
        isDarkMode: true,
        skin,
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});
