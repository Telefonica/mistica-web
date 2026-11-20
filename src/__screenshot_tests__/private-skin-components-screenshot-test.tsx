import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const SKINS = ['Movistar', 'O2', 'Vivo', 'Vivo-evolution', 'Telefonica', 'Blau', 'Esimflag'] as const;

for (const testCase of SKINS) {
    const skin = testCase;
    test(`Components in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-components-in-different-skins--default',
            skin,
        });

        const groups = await screen.findAllByTestId('components-group');
        for (const group of groups) {
            await expectScreenshot(group);
        }
    });
}

for (const testCase of SKINS) {
    const skin = testCase;
    test(`Components in ${testCase} (inverse)`, async () => {
        await openStoryPage({
            id: 'private-components-in-different-skins--default',
            args: {variantOutside: 'brand'},
            skin,
        });

        const groups = await screen.findAllByTestId('components-group');
        for (const group of groups) {
            await expectScreenshot(group);
        }
    });
}

for (const testCase of SKINS) {
    const skin = testCase;
    test(`Components in ${testCase} (alternative)`, async () => {
        await openStoryPage({
            id: 'private-components-in-different-skins--default',
            args: {variantOutside: 'alternative'},
            skin,
        });

        const groups = await screen.findAllByTestId('components-group');
        for (const group of groups) {
            await expectScreenshot(group);
        }
    });
}

for (const testCase of SKINS) {
    const skin = testCase;
    test(`Components in ${testCase} (dark mode)`, async () => {
        await openStoryPage({
            id: 'private-components-in-different-skins--default',
            isDarkMode: true,
            skin,
        });

        const groups = await screen.findAllByTestId('components-group');
        for (const group of groups) {
            await expectScreenshot(group);
        }
    });
}

for (const testCase of SKINS) {
    const skin = testCase;
    test(`Components in ${testCase} (inverse and dark mode)`, async () => {
        await openStoryPage({
            id: 'private-components-in-different-skins--default',
            args: {variantOutside: 'brand'},
            isDarkMode: true,
            skin,
        });

        const groups = await screen.findAllByTestId('components-group');
        for (const group of groups) {
            await expectScreenshot(group);
        }
    });
}
