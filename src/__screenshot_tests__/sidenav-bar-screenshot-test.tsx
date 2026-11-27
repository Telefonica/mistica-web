import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, renderingTolerance} from '../test-utils';

test('SidenavBar', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
    });

    const sidenavBar = await screen.findByRole('navigation');
    await expectScreenshot(sidenavBar);
});

test('SidenavBar collapsed keeps the 32px gap above the header slot', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {defaultCollapsed: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    await expectScreenshot(sidenavBar);
});

test('SidenavBar collapsed keeps the accent bar of a selected first-level item', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {defaultCollapsed: true, selectedItemId: 'home'},
    });

    const sidenavBar = await screen.findByRole('navigation');
    await expectScreenshot(sidenavBar);
});

for (const testCase of [false, true]) {
    const collapsed = testCase;
    test(`SidenavBar grows for an oversized logo and clips its width. collapsed(${testCase})`, async () => {
        await openStoryPage({
            id: 'components-sidenavbar-bar--default',
            device: 'DESKTOP',
            args: {logo: 'oversized', defaultCollapsed: collapsed},
        });

        const sidenavBar = await screen.findByRole('navigation');
        await expectScreenshot(sidenavBar);
    });
}

test('SidenavBar wraps a long label at every level and grows its row', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {longLabels: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    await expectScreenshot(sidenavBar);
});

test('SidenavBar collapsed clips a long label at one line', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {longLabels: true, defaultCollapsed: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    await expectScreenshot(sidenavBar);
});

for (const testCase of [{boxed: false}, {boxed: true}] as const) {
    const {boxed} = testCase;
    test(`SidenavBar in dark mode paints the three bands with one token. boxed(${testCase.boxed})`, async () => {
        await openStoryPage({
            id: 'components-sidenavbar-bar--default',
            device: 'DESKTOP',
            isDarkMode: true,
            args: {boxed, divider: false},
        });

        const sidenavBar = await screen.findByRole('navigation');
        await expectScreenshot(sidenavBar, {...renderingTolerance});
    });
}

// A raw "#" does not survive the URL of the story, so the colour uses the encoding of Storybook.
test('SidenavBar with a custom background on the three bands and no seam', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {colorsEnabled: true, backgroundColor: '!hex(ffdddd)', fixedFooter: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    await expectScreenshot(sidenavBar);
});

for (const testCase of [
    {variant: 'default'},
    {variant: 'brand'},
    {variant: 'alternative'},
    {variant: 'negative'},
    {variant: 'media'},
] as const) {
    const {variant} = testCase;
    test(`SidenavBar variant(${testCase.variant})`, async () => {
        await openStoryPage({
            id: 'components-sidenavbar-bar--controlled-selection',
            device: 'DESKTOP',
            args: {variant, pageVariant: variant},
        });

        const sidenavBar = await screen.findByRole('navigation');
        await expectScreenshot(sidenavBar);
    });
}

for (const testCase of [
    {pageVariant: 'default'},
    {pageVariant: 'brand'},
    {pageVariant: 'alternative'},
    {pageVariant: 'negative'},
    {pageVariant: 'media'},
] as const) {
    const {pageVariant} = testCase;
    test(`SidenavBar boxed over pageVariant(${testCase.pageVariant})`, async () => {
        await openStoryPage({
            id: 'components-sidenavbar-bar--controlled-selection',
            device: 'DESKTOP',
            args: {variant: 'default', pageVariant, boxed: true},
        });

        const sidenavBar = await screen.findByRole('navigation');
        await expectScreenshot(sidenavBar);
    });
}

for (const testCase of [
    {collapsed: false, boxed: false, divider: true},
    {collapsed: false, boxed: false, divider: false},
    {collapsed: false, boxed: true, divider: true},
    {collapsed: true, boxed: false, divider: true},
] as const) {
    const {collapsed, boxed, divider} = testCase;
    test(`SidenavBar double panel. collapsed(${testCase.collapsed}) boxed(${testCase.boxed}) divider(${testCase.divider})`, async () => {
        await openStoryPage({
            id: 'components-sidenavbar-bar--default',
            device: 'DESKTOP',
            args: {doublePanel: true, logo: 'none', defaultCollapsed: collapsed, boxed, divider},
        });

        const sidenavBar = await screen.findByRole('navigation');

        await (await screen.findByRole('button', {name: 'Projects'})).click();

        await expectScreenshot(sidenavBar);
    });
}

test('SidenavBar double panel boxed in dark mode runs the separator to the edge of the box', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        isDarkMode: true,
        args: {doublePanel: true, logo: 'none', boxed: true},
    });

    const sidenavBar = await screen.findByRole('navigation');

    await (await screen.findByRole('button', {name: 'Projects'})).click();

    await expectScreenshot(sidenavBar);
});

// Mobile ----------------------------------------------------------------------

const OPEN_MENU_LABEL = 'Abrir menú de navegación';

for (const testCase of [{isDarkMode: false}, {isDarkMode: true}] as const) {
    const {isDarkMode} = testCase;
    test(`SidenavBar mobile. isDarkMode(${testCase.isDarkMode})`, async () => {
        const page = await openStoryPage({
            id: 'components-sidenavbar-bar--default',
            device: 'MOBILE_IOS',
            isDarkMode,
        });

        await expectScreenshot(page);

        await (await screen.findByRole('button', {name: OPEN_MENU_LABEL})).click();

        await expectScreenshot(page);
    });
}

test('SidenavBar mobile second level', async () => {
    const page = await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByRole('button', {name: OPEN_MENU_LABEL})).click();
    await (await screen.findByRole('button', {name: 'Projects'})).click();

    await expectScreenshot(page);
});

for (const testCase of [
    {variant: 'brand'},
    {variant: 'alternative'},
    {variant: 'negative'},
    {variant: 'media'},
] as const) {
    const {variant} = testCase;
    test(`SidenavBar mobile top bar variant(${testCase.variant})`, async () => {
        await openStoryPage({
            id: 'components-sidenavbar-bar--controlled-selection',
            device: 'MOBILE_IOS',
            args: {variant, pageVariant: variant},
        });

        const topBar = await screen.findByTestId('SidenavBar');
        await expectScreenshot(topBar);
    });
}

test('SidenavBar tablet takes the mobile treatment', async () => {
    const page = await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'TABLET',
    });

    await (await screen.findByRole('button', {name: OPEN_MENU_LABEL})).click();

    await expectScreenshot(page);
});
