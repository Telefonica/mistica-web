import {openStoryPage, screen} from '../test-utils';

test('Icons catalog', async () => {
    const page = await openStoryPage({
        id: 'icons-mistica-icons--catalog',
        device: 'DESKTOP',
    });

    const lightCheckbox = await screen.findByLabelText('Light');
    const filledCheckbox = await screen.findByLabelText('Filled');
    const regularCheckbox = await screen.findByLabelText('Regular');

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
