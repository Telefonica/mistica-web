import {test, expect} from '../test-utils/component';

test.beforeEach(async ({context}) => {
    await context.route('https://example.org/', (route) => route.fulfill({body: 'Destination'}));
});
test('redirect', async ({mount, page}) => {
    const component = await mount('browser/Redirect');
    await component.getByRole('button', {name: 'Go'}).click();
    await expect(page).toHaveURL('https://example.org/');
});
test('open external', async ({mount, page}) => {
    const component = await mount('browser/Redirect', {external: true});
    const popupPromise = page.waitForEvent('popup');
    await component.getByRole('button', {name: 'Go'}).click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL('https://example.org/');
    expect(page.url()).toContain('/playwright/gallery/index.html');
});
test('open loadOnTop', async ({page, baseURL}) => {
    if (!baseURL) {
        throw new Error('Component gallery URL must be configured');
    }
    await page.goto(baseURL);
    const framePromise = page.waitForEvent('frameattached');
    await page.evaluate(() => {
        const frame = document.createElement('iframe');
        frame.title = 'Redirect frame';
        frame.src = location.href;
        document.body.append(frame);
    });
    const frame = await framePromise;
    await frame.waitForFunction(() => typeof (window as unknown as {mount?: unknown}).mount === 'function');
    await frame.evaluate(async () => {
        await (
            window as unknown as {
                mount: (params: {story: string; props: {loadOnTop: boolean}}) => Promise<void>;
            }
        ).mount({story: 'browser/Redirect', props: {loadOnTop: true}});
    });
    await frame.getByRole('button', {name: 'Go'}).click();
    await expect(page).toHaveURL('https://example.org/');
});
