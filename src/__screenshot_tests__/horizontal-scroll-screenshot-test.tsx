import {openStoryPage} from '../test-utils';

test('HorizontalScroll', async () => {
    const page = await openStoryPage({
        id: 'layout-horizontalscroll--default',
    });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
});
