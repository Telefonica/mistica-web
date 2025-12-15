import {openStoryPage, screen} from '../test-utils';

const SKINS = ['Movistar', 'O2', 'Vivo-new', 'Telefonica', 'Blau', 'O2-new', 'Esimflag'] as const;

test.each(SKINS)('Components in %s', async (skin) => {
    await openStoryPage({
        id: 'private-components-in-different-skins--default',
        skin,
    });

    const groups = await screen.findAllByTestId('components-group');
    for (const group of groups) {
        expect(await group.screenshot()).toMatchImageSnapshot();
    }
});

test.each(SKINS)('Components in %s (inverse)', async (skin) => {
    await openStoryPage({
        id: 'private-components-in-different-skins--default',
        args: {variantOutside: 'brand'},
        skin,
    });

    const groups = await screen.findAllByTestId('components-group');
    for (const group of groups) {
        expect(await group.screenshot()).toMatchImageSnapshot();
    }
});

test.each(SKINS)('Components in %s (alternative)', async (skin) => {
    await openStoryPage({
        id: 'private-components-in-different-skins--default',
        args: {variantOutside: 'alternative'},
        skin,
    });

    const groups = await screen.findAllByTestId('components-group');
    for (const group of groups) {
        expect(await group.screenshot()).toMatchImageSnapshot();
    }
});

test.each(SKINS)('Components in %s (dark mode)', async (skin) => {
    await openStoryPage({
        id: 'private-components-in-different-skins--default',
        isDarkMode: true,
        skin,
    });

    const groups = await screen.findAllByTestId('components-group');
    for (const group of groups) {
        expect(await group.screenshot()).toMatchImageSnapshot();
    }
});

test.each(SKINS)('Components in %s (inverse and dark mode)', async (skin) => {
    await openStoryPage({
        id: 'private-components-in-different-skins--default',
        args: {variantOutside: 'brand'},
        isDarkMode: true,
        skin,
    });

    const groups = await screen.findAllByTestId('components-group');
    for (const group of groups) {
        expect(await group.screenshot()).toMatchImageSnapshot();
    }
});
