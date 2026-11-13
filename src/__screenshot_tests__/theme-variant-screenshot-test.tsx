import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';
import {normalizeVariant} from '../theme-variant-context';

const themeVariants = ['default', 'inverse', 'alternative', 'media'] as const;

for (const testCase of themeVariants) {
    const variant = testCase;
    test(`ThemeVariant ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'utilities-themevariant--components-over-different-theme-variants',
            args: {variant: normalizeVariant(variant)},
        });

        await expectScreenshot(page);
    });
}

for (const testCase of themeVariants) {
    const variant = testCase;
    test(`ThemeVariant in darkMode ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'utilities-themevariant--components-over-different-theme-variants',
            args: {variant: normalizeVariant(variant)},
            isDarkMode: true,
        });

        await expectScreenshot(page);
    });
}
