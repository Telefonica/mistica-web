import {openStoryPage, screen} from '../test-utils';

test('Icons catalog', async () => {
    const page = await openStoryPage({
        id: 'icons-mistica-icons--catalog',
        device: 'DESKTOP',
    });

    const lightCheckbox = await screen.findByLabelText('Light');
    const filledCheckbox = await screen.findByLabelText('Filled');
    const regularCheckbox = await screen.findByLabelText('Regular');

    filledCheckbox.click();
    regularCheckbox.click();

    const light = await page.screenshot({fullPage: true});
    expect(light).toMatchImageSnapshot();

    lightCheckbox.click();
    regularCheckbox.click();

    const regular = await page.screenshot({fullPage: true});
    expect(regular).toMatchImageSnapshot();

    regularCheckbox.click();
    filledCheckbox.click();

    const filled = await page.screenshot({fullPage: true});
    expect(filled).toMatchImageSnapshot();
});
