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
        args: {variant},
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
