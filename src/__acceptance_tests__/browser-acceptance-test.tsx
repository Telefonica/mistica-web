import {test, expect} from '../test-utils/playwright';
import {openStoryPage, screen, within} from '../test-utils';

test('Browser contexts isolate storage between pages', async () => {
    const story = {id: 'components-badge--default'};
    const firstPage = await openStoryPage(story);
    await firstPage.evaluate(() => localStorage.setItem('test-context', 'first'));

    const secondPage = await openStoryPage(story);
    expect(await secondPage.evaluate(() => localStorage.getItem('test-context'))).toBeNull();
});

test('Browser context applies mobile emulation, dark mode and safe area overrides', async () => {
    const page = await openStoryPage({
        id: 'components-badge--default',
        device: 'MOBILE_IOS_INSET',
        isDarkMode: true,
    });
    expect(
        await page.evaluate(() => ({
            width: window.innerWidth,
            scale: window.devicePixelRatio,
            touch: navigator.maxTouchPoints > 0,
            dark: matchMedia('(prefers-color-scheme: dark)').matches,
            safeArea: getComputedStyle(document.documentElement)
                .getPropertyValue('--acceptance-test-override-safe-area-inset-bottom')
                .trim(),
            acceptance: navigator.userAgent.includes('acceptance-test'),
        }))
    ).toEqual({width: 375, scale: 2, touch: true, dark: true, safeArea: '34px', acceptance: true});
});

test('Browser queries preserve scoped, exact and current-role matching', async () => {
    await openStoryPage({
        id: 'components-pagination--default',
        args: {totalPages: 9, currentPage: 3},
    });
    const list = await screen.findByRole('list');
    const current = await within(list).findByRole('button', {current: 'page'});
    expect(await current.getAttribute('aria-label')).toBe('Página 3, página actual');
    const buttons = await within(list).findAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1);
});

test('Taking a screenshot preserves the viewport and inline styles needed for hydration', async () => {
    const page = await openStoryPage({id: 'components-badge--default'});
    const inlineStyle = 'padding-right:calc(10px - 1px);font-family:inherit;caret-color:transparent';
    await page.setContent(
        `<div style="min-height:200vh"><input aria-label="Name" style="${inlineStyle}"></div>`
    );
    const input = await screen.findByRole('textbox', {name: 'Name'});
    await input.focus();

    const screenshot = await page.screenshot();
    const PNG_WIDTH_OFFSET = 16;
    const PNG_HEIGHT_OFFSET = 20;

    expect(await input.getAttribute('style')).toBe(inlineStyle);
    expect({
        width: screenshot.readUInt32BE(PNG_WIDTH_OFFSET),
        height: screenshot.readUInt32BE(PNG_HEIGHT_OFFSET),
    }).toEqual(page.viewportSize());
});
