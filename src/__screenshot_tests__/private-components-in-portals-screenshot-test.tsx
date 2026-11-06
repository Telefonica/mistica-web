import {test, expect, expectScreenshot} from '../test-utils/playwright';
import {within, openStoryPage, screen} from '../test-utils';

const DEVICES = ['DESKTOP', 'MOBILE_IOS'] as const;

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Components with portals render properly (${testCase})`, async () => {
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

        const closeSheet = async () => {
            const closeButton = await screen.findByTestId('sheet-close-button');
            await closeButton.click();
            await expect(closeButton).toHaveCount(0);
            await page.mouse.move(0, 0);
        };

        const closeLastOpenedDialog = async () => {
            const dialogs = await screen.findAllByRole('dialog');
            const lastOpenedDialog = dialogs[dialogs.length - 1];
            const dismissButton = await within(lastOpenedDialog).findByRole('button', {name: 'Cerrar'});
            await dismissButton.click();
        };

        // Open Dialog
        await (await screen.findByTestId('dialog-button')).click();
        await expectScreenshot(page);

        // Open Dialog's Menu
        await (await screen.findByTestId('dialog-menu-button')).click();
        await expectScreenshot(page);

        // Close Dialog's Menu
        await closeMenu();
        await expectScreenshot(page);

        // In mobile, options are displayed with a native select, and it's not visible in screenshots
        if (device === 'DESKTOP') {
            // Open Dialog's select
            await (await screen.findByRole('button', {name: 'Select'})).click();
            await expectScreenshot(page);

            // Close Dialog's select
            await (await screen.findByTestId('Overlay')).click();
            await expectScreenshot(page);
        }

        // Open Dialog's Sheet
        await (await screen.findByTestId('dialog-sheet-button')).click();
        await expectScreenshot(page);

        // Open Snackbar
        await (await screen.findByTestId('sheet-snackbar-button')).click();
        await (await screen.findByRole('alert')).waitFor({state: 'visible'});
        await expectScreenshot(page);

        // Close Dialog's Sheet
        await closeSheet();
        await expectScreenshot(page);

        // Close Dialog
        await closeLastOpenedDialog();
        await expectScreenshot(page);

        // Close snackbar
        await closeSnackbar();
        await expectScreenshot(page);

        // Open Sheet
        await (await screen.findByTestId('sheet-button')).click();
        await expectScreenshot(page);

        // Open Sheet's Dialog
        await (await screen.findByTestId('sheet-dialog-button')).click();
        await expectScreenshot(page);

        // Close Sheet's Dialog
        await closeLastOpenedDialog();
        await expectScreenshot(page);

        // In mobile, options are displayed with a native select, and it's not visible in screenshots
        if (device === 'DESKTOP') {
            // Open Sheet's select
            await (await screen.findByRole('button', {name: 'Select'})).click();
            await expectScreenshot(page);

            // Close Sheet's select
            await (await screen.findByTestId('Overlay')).click();
            await expectScreenshot(page);
        }

        // Close Sheet
        await closeSheet();
        await expectScreenshot(page);

        // Burger menu is only rendered in mobile
        if (device === 'MOBILE_IOS') {
            // Open MainNavigationBar's burger menu
            await (await screen.findByLabelText('Abrir menú de navegación')).click();

            await expectScreenshot(page);

            // Close MainNavigationBar's burger menu
            await (await screen.findByLabelText('Cerrar menú de navegación')).click();
            await expectScreenshot(page);
        }
    });
}
