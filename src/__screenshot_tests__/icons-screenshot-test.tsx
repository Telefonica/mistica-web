import {openStoryPage, screen} from '../test-utils';

const SKINS = ['Movistar', 'O2', 'Blau'] as const;

test.each(SKINS)('Icons catalog for %s', async ([skin]) => {
    const page = await openStoryPage({
        id: 'icons-mistica-icons--catalog',
        device: 'DESKTOP',
        skin: skin as typeof SKINS[number],
    });

    const lightCheckbox = await screen.findByLabelText('Light');
    const filledCheckbox = await screen.findByLabelText('Filled');
    const regularCheckbox = await screen.findByLabelText('Regular');
    // initially all checkboxes are checked

    await filledCheckbox.click();
    await regularCheckbox.click();

    const light = await page.screenshot({fullPage: true});
    expect(light).toMatchImageSnapshot();

    await lightCheckbox.click();
    await regularCheckbox.click();

    const regular = await page.screenshot({fullPage: true});
    expect(regular).toMatchImageSnapshot();

    await regularCheckbox.click();
    await filledCheckbox.click();

    const filled = await page.screenshot({fullPage: true});
    expect(filled).toMatchImageSnapshot();
});
