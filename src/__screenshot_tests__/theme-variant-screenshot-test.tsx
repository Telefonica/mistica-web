import {openStoryPage} from '../test-utils';

const themeVariants = ['default', 'inverse', 'alternative', 'media'] as const;

test.each(themeVariants)('ThemeVariant %s', async (themeVariant) => {
    const page = await openStoryPage({
        id: 'utilities-themevariant--components-over-different-theme-variants',
        args: {themeVariant},
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(themeVariants)('ThemeVariant in darkMode %s', async (themeVariant) => {
    const page = await openStoryPage({
        id: 'utilities-themevariant--components-over-different-theme-variants',
        args: {themeVariant},
        isDarkMode: true,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
