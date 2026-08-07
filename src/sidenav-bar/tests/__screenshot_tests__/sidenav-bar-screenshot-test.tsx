import {openStoryPage, screen} from '../../../test-utils';

test('SidenavBar', async () => {
    await openStoryPage({
        id: 'components-sidenav-bar--default',
    });

    const sidenavBar = await screen.findByRole('navigation');
    const image = await sidenavBar.screenshot();

    expect(image).toMatchImageSnapshot();
});
