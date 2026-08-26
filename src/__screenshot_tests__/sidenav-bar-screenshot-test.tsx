import {openStoryPage, screen} from '../test-utils';

// Every test of the rail asks for a desktop device. A tablet takes the mobile treatment, and the default
// device of `openStoryPage` is a tablet, so the rail needs the request. The mobile tests live at the end of
// this file.

test('SidenavBar', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

// The collapsed rail keeps the 32px gap between the collapse action and the header slot, which the spec
// gives for both states. Only a screenshot guards that gap: the CSS class carries it.
test('SidenavBar collapsed with a header slot', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'DESKTOP',
        args: {defaultCollapsed: true},
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});

// The background tokens of the header and the footer differ from the ones of the body only in dark mode,
// where `background` and `backgroundContainer` carry two different blacks. A light screenshot passes with
// the wrong token, so these two cases guard the tokens of the spec.
test.each`
    boxed
    ${false}
    ${true}
`('SidenavBar in dark mode. boxed($boxed)', async ({boxed}) => {
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

// Each variant paints its own tokens on the three bands, on the labels, on the assets, on the chevrons, on
// the section titles, on the selected background and on the selected indicator. The controlled story opens
// with a selected item, so one screenshot per variant guards the whole set.
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

// A boxed sidenav paints its border only over a default or an alternative page, the same rule that `Boxed`
// follows. The border reads against those two pages, and it does not against a brand, a negative or a media
// page. One screenshot per page context guards the rule.
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

// The separator of the two columns crosses the edge of a boxed sidenav, so it reaches the top and the
// bottom of the box. In dark mode the border token carries the background colour of the sidenav, so the
// edge itself is invisible and the box reads by its background: a separator that stopped at that edge
// left a 1px gap. Only a dark screenshot guards that pixel.
test('SidenavBar double panel boxed in dark mode', async () => {
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

// The mobile sidenav is a top bar with a burger menu, so the whole page carries the component: the top bar
// holds the logo and the header slot, and the panel of the burger holds the items and the footer slot.
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

// A parent item reveals its children in the second level, which shows the back bar and the label of that
// parent. The rows of both levels paint their right slot before the chevron.
test('SidenavBar mobile second level', async () => {
    const page = await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'MOBILE_IOS',
    });

    await page.click(await screen.findByRole('button', {name: OPEN_MENU_LABEL}));
    await page.click(await screen.findByRole('button', {name: 'Projects'}));

    expect(await page.screenshot()).toMatchImageSnapshot();
});

// The variant paints the top bar alone. The panel always renders in the default variant, so one screenshot
// per variant guards the tokens of the bar, and the panel of the burger stays out of the frame.
test.each`
    variant
    ${'brand'}
    ${'alternative'}
    ${'negative'}
    ${'media'}
`('SidenavBar mobile variant($variant)', async ({variant}) => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--controlled-selection',
        device: 'MOBILE_IOS',
        args: {variant, pageVariant: variant},
    });

    const topBar = await screen.findByRole('banner');
    expect(await topBar.screenshot()).toMatchImageSnapshot();
});

// A tablet has no room for the rail, so it takes the same top bar as a mobile.
test('SidenavBar tablet takes the mobile treatment', async () => {
    const page = await openStoryPage({
        id: 'components-sidenavbar-bar--default',
        device: 'TABLET',
    });

    await page.click(await screen.findByRole('button', {name: OPEN_MENU_LABEL}));

    expect(await page.screenshot()).toMatchImageSnapshot();
});
