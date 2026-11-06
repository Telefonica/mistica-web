import {within} from '@telefonica/acceptance-testing';
import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['DESKTOP', 'MOBILE_IOS'] as const;

test.each(DEVICES)('Components with portals render properly (%s)', async (device) => {
    const page = await openStoryPage({
        id: 'private-components-inside-portals--default',
        device,
    });

    const closeMenu = async () => {
        const menu = await screen.findByRole('menu');
        const firstOption = await within(menu).findByRole('menuitem', {name: 'Option 1'});
        await firstOption.click();
    };

    const closeSnackbar = async () => {
        const snackbar = await screen.findByRole('alert');
        const dismissButton = await within(snackbar).findByRole('button', {name: 'Cerrar'});
        await dismissButton.click();
    };

    const closeLastOpenedDialog = async () => {
        const dialogs = await screen.findAllByRole('dialog');
        const lastOpenedDialog = dialogs[dialogs.length - 1];
        const dismissButton = await within(lastOpenedDialog).findByRole('button', {name: 'Cerrar'});
        await dismissButton.click();
    };

    // Open Dialog
    await (await screen.findByTestId('dialog-button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Open Dialog's Menu
    await (await screen.findByTestId('dialog-menu-button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Close Dialog's Menu
    await closeMenu();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // In mobile, options are displayed with a native select, and it's not visible in screenshots
    if (device === 'DESKTOP') {
        // Open Dialog's select
        await (await screen.findByLabelText('Select')).click();
        expect(await page.screenshot()).toMatchImageSnapshot();

        // Close Dialog's select
        await (await screen.findByLabelText('Select')).click();
        expect(await page.screenshot()).toMatchImageSnapshot();
    }

    // Open Dialog's Sheet
    await (await screen.findByTestId('dialog-sheet-button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Open Snackbar
    await (await screen.findByTestId('sheet-snackbar-button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Close Dialog's Sheet
    await (await screen.findByTestId('sheet-close-button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Close Dialog
    await closeLastOpenedDialog();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Close snackbar
    await closeSnackbar();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Open Sheet
    await (await screen.findByTestId('sheet-button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Open Sheet's Dialog
    await (await screen.findByTestId('sheet-dialog-button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Close Sheet's Dialog
    await closeLastOpenedDialog();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // In mobile, options are displayed with a native select, and it's not visible in screenshots
    if (device === 'DESKTOP') {
        // Open Sheet's select
        await (await screen.findByLabelText('Select')).click();
        expect(await page.screenshot()).toMatchImageSnapshot();

        // Close Sheet's select
        await (await screen.findByLabelText('Select')).click();
        expect(await page.screenshot()).toMatchImageSnapshot();
    }

    // Close Sheet
    await (await screen.findByTestId('sheet-close-button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();

    // Burger menu is only rendered in mobile
    if (device === 'MOBILE_IOS') {
        // Open MainNavigationBar's burger menu
        await (await screen.findByLabelText('Abrir menú de navegación')).click();

        expect(await page.screenshot()).toMatchImageSnapshot();

        // Close MainNavigationBar's burger menu
        await (await screen.findByLabelText('Cerrar menú de navegación')).click();
        expect(await page.screenshot()).toMatchImageSnapshot();
    }
});
