import {openStoryPage, screen} from '../../../test-utils';

test('SidenavBar', async () => {
    await openStoryPage({
        id: 'components-sidenavbar-bar--default',
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
