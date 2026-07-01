import {openStoryPage, screen} from '../test-utils';

test.each`
    collapsed
    ${false}
    ${true}
`('SideNavigation collapsed($collapsed)', async ({collapsed}) => {
    await openStoryPage({
        id: 'components-navigation-bars-sidenavigation--default',
        device: 'DESKTOP',
        args: {
            collapsed,
            sectionOpen: true,
        },
    });

    const sideNavigation = await screen.findByTestId('side-navigation');

    expect(await sideNavigation.screenshot()).toMatchImageSnapshot();
});
