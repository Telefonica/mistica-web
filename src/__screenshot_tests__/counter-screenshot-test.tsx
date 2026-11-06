import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

// todo https://github.com/Telefonica/mistica-web/issues/1647 review and improve test strategy
const SKINS = ['Movistar', 'O2', 'Vivo', 'Vivo-evolution', 'Telefonica', 'Blau'] as const;

for (const testCase of SKINS) {
    const skin = testCase;
    test(`Counter default. skin={${testCase}}`, async () => {
        await openStoryPage({
            id: 'components-counter--default',
            device: 'DESKTOP',
            args: {defaultValue: 1},
            skin: skin as (typeof SKINS)[number],
        });

        const counter = await screen.findByTestId('counter');

        await expectScreenshot(counter);
    });
}

test('Counter. isInverse', async () => {
    await openStoryPage({
        id: 'components-counter--default',
        device: 'DESKTOP',
        args: {variantOutside: 'brand', defaultValue: 1},
    });

    const counter = await screen.findByTestId('counter');

    await expectScreenshot(counter);
});

test('Counter. isDarkMode', async () => {
    await openStoryPage({
        id: 'components-counter--default',
        device: 'DESKTOP',
        args: {defaultValue: 1},
        isDarkMode: true,
    });

    const counter = await screen.findByTestId('counter');

    await expectScreenshot(counter);
});

for (const testCase of [
    {min: 1, max: 1, defaultValue: 1, removable: false, disabled: false},
    {min: 0, max: 4, defaultValue: 0, removable: false, disabled: false},
    {min: 0, max: 4, defaultValue: 4, removable: false, disabled: false},
    {min: 3, max: 4, defaultValue: 3, removable: false, disabled: false},
    {min: 0, max: 20, defaultValue: 10, removable: false, disabled: false},
    {min: 1, max: 1, defaultValue: 1, removable: true, disabled: false},
    {min: 0, max: 4, defaultValue: 0, removable: true, disabled: false},
    {min: 0, max: 20, defaultValue: 10, removable: true, disabled: false},
    {min: 1, max: 1, defaultValue: 1, removable: false, disabled: true},
    {min: 0, max: 4, defaultValue: 0, removable: false, disabled: true},
    {min: 0, max: 4, defaultValue: 4, removable: false, disabled: true},
    {min: 3, max: 4, defaultValue: 3, removable: false, disabled: true},
    {min: 0, max: 20, defaultValue: 10, removable: false, disabled: true},
    {min: 3, max: 4, defaultValue: 3, removable: true, disabled: true},
] as const) {
    const {min, max, defaultValue, removable, disabled} = testCase;
    test(`Counter. min=${testCase.min} max=${testCase.max} defaultValue=${testCase.defaultValue} removable=${testCase.removable} disabled=${testCase.disabled}`, async () => {
        await openStoryPage({
            id: 'components-counter--default',
            device: 'DESKTOP',
            args: {min, max, defaultValue, removable, disabled},
            skin: 'Vivo',
        });

        const counter = await screen.findByTestId('counter');

        await expectScreenshot(counter);
    });
}
