import {openStoryPage, screen} from '../test-utils';

test('SkipLink', async () => {
    const page = await openStoryPage({
        id: 'components-skiplink--default',
        device: 'DESKTOP',
    });

    const skipLink = await screen.findByRole('link', {
        name: /Skip to main content Página actual/,
    });

    await skipLink.focus();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

    await skipLink.click();

    await page.keyboard.press('Tab');

    const mainContentLink = await screen.findByRole('link', {
        name: 'link inside main content',
    });

    expect(await mainContentLink.evaluate((el) => el === document.activeElement)).toBe(true);
}, 100000);
