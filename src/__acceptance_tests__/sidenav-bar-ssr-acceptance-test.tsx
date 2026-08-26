import {openSSRPage} from '../test-utils';

test('ssr SidenavBar', async () => {
    await openSSRPage({name: 'sidenav-bar', device: 'DESKTOP'});
});

test('ssr SidenavBar collapsed', async () => {
    await openSSRPage({name: 'sidenav-bar-collapsed', device: 'DESKTOP'});
});

// The server always renders the desktop tree, because the screen size context reports desktop on the
// server and on the first client render. On a phone the sidenav then replaces that tree with the mobile
// bar, so the screen changes after the hydration on purpose, and the visual check does not apply. This
// test still fails on a hydration error or on a page error during that swap.
test('ssr SidenavBar on mobile swaps to the mobile bar', async () => {
    await openSSRPage({name: 'sidenav-bar', device: 'MOBILE_IOS', checkHidrationVisualMismatch: false});
});
