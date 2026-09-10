import {openStoryPage, screen} from '../test-utils';

test('SidenavBar', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('SidenavBar collapsed keeps the 32px gap above the header slot', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {defaultCollapsed: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('SidenavBar collapsed keeps the accent bar of a selected first-level item', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {defaultCollapsed: true, selectedItemId: 'home'},
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each([false, true])(
    'SidenavBar grows for an oversized logo and clips its width. collapsed(%s)',
    async (collapsed) => {
        await openStoryPage({
            id: 'components-sidenavbar-bar--default',
            device: 'DESKTOP',
            args: {logo: 'oversized', defaultCollapsed: collapsed},
        });

        const sidenavBar = await screen.findByRole('navigation');
        const image = await sidenavBar.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);

test('SidenavBar wraps a long label at every level and grows its row', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {longLabels: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('SidenavBar collapsed clips a long label at one line', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {longLabels: true, defaultCollapsed: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

// Only dark mode tells the header and footer tokens apart from the body token: `background` and
// `backgroundContainer` carry two different blacks there. A light screenshot passes with the wrong token.
test.each`
    boxed
    ${false}
    ${true}
`('SidenavBar in dark mode paints header and footer tokens. boxed($boxed)', async ({boxed}) => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        isDarkMode: true,
        args: {boxed, divider: false},
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

// The story encodes the colour as Storybook does, because the argument parser drops a raw "#".
test('SidenavBar with a custom background on the three bands and no seam', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {colorsEnabled: true, backgroundColor: '!hex(ffdddd)', fixedFooter: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

// The controlled story opens with a selected item, so one screenshot per variant also guards the
// selected background and the selected indicator.
test.each`
    variant
    ${'default'}
    ${'brand'}
    ${'alternative'}
    ${'negative'}
    ${'media'}
`('SidenavBar variant($variant)', async ({variant}) => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--controlled-selection',
        device: 'DESKTOP',
        args: {variant, pageVariant: variant},
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each`
    pageVariant
    ${'default'}
    ${'brand'}
    ${'alternative'}
    ${'negative'}
    ${'media'}
`('SidenavBar boxed over pageVariant($pageVariant)', async ({pageVariant}) => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--controlled-selection',
        device: 'DESKTOP',
        args: {variant: 'default', pageVariant, boxed: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each`
    collapsed | boxed    | divider
    ${false}  | ${false} | ${true}
    ${false}  | ${false} | ${false}
    ${false}  | ${true}  | ${true}
    ${true}   | ${false} | ${true}
`(
    'SidenavBar double panel. collapsed($collapsed) boxed($boxed) divider($divider)',
    async ({collapsed, boxed, divider}) => {
        await openStoryPage({
            id: 'components-sidenavbar-bar--double-panel',
            device: 'DESKTOP',
            args: {collapsed, boxed, divider},
        });

        const sidenavBar = await screen.findByRole('navigation');

        await (await screen.findByRole('button', {name: 'Projects'})).click();

        const image = await sidenavBar.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);

// In dark mode the border token carries the background colour of the sidenav, so the edge of the box is
// invisible and the box reads by its background. A separator that stopped at that edge left a 1px gap,
// and only a dark screenshot catches that pixel.
test('SidenavBar double panel boxed in dark mode runs the separator to the edge of the box', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--double-panel',
        device: 'DESKTOP',
        isDarkMode: true,
        args: {boxed: true},
    });

    const sidenavBar = await screen.findByRole('navigation');

    await (await screen.findByRole('button', {name: 'Projects'})).click();

    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

// Mobile ----------------------------------------------------------------------

const OPEN_MENU_LABEL = 'Abrir menú de navegación';

test.each`
    isDarkMode
    ${false}
    ${true}
`('SidenavBar mobile. isDarkMode($isDarkMode)', async ({isDarkMode}) => {
    const page = await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'MOBILE_IOS',
        isDarkMode,
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    await page.click(await screen.findByRole('button', {name: OPEN_MENU_LABEL}));

    expect(await page.screenshot()).toMatchImageSnapshot();
});

test('SidenavBar mobile second level', async () => {
    const page = await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'MOBILE_IOS',
    });

    await page.click(await screen.findByRole('button', {name: OPEN_MENU_LABEL}));
    await page.click(await screen.findByRole('button', {name: 'Projects'}));

    expect(await page.screenshot()).toMatchImageSnapshot();
});

// The panel always renders in the default variant, so the screenshot frames the top bar alone.
test.each`
    variant
    ${'brand'}
    ${'alternative'}
    ${'negative'}
    ${'media'}
`('SidenavBar mobile top bar variant($variant)', async ({variant}) => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--controlled-selection',
        device: 'MOBILE_IOS',
        args: {variant, pageVariant: variant},
    });

    const topBar = await screen.findByRole('banner');
    expect(await topBar.screenshot()).toMatchImageSnapshot();
});

test('SidenavBar tablet takes the mobile treatment', async () => {
    const page = await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'TABLET',
    });

    await page.click(await screen.findByRole('button', {name: OPEN_MENU_LABEL}));

    expect(await page.screenshot()).toMatchImageSnapshot();
});
