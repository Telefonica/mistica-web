import {openStoryPage, screen} from '../../../test-utils';

test('SidenavBar renders its content', async () => {
    await openStoryPage({
        id: 'components-sidenav-bar--default',
    });

    await screen.findByRole('navigation', {name: 'Main navigation'});
    await screen.findByText('Sidenav bar content');
});
