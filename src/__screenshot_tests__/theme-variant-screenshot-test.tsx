import {openStoryPage} from '../test-utils';
import {normalizeVariant} from '../theme-variant-context';

const themeVariants = ['default', 'inverse', 'alternative', 'media'] as const;

test.each(themeVariants)('ThemeVariant %s', async (variant) => {
    const page = await openStoryPage({
        id: 'utilities-themevariant--components-over-different-theme-variants',
        args: {variant: normalizeVariant(variant)},
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(themeVariants)('ThemeVariant in darkMode %s', async (variant) => {
    const page = await openStoryPage({
        id: 'utilities-themevariant--components-over-different-theme-variants',
        args: {variant: normalizeVariant(variant)},
        isDarkMode: true,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
