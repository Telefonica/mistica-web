import {openSSRPage} from '../test-utils';

test('ssr SideNavigation', async () => {
    await openSSRPage({name: 'side-navigation', device: 'DESKTOP'});
});
