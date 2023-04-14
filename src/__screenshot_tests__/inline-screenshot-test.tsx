import {openStoryPage, ssimScreenshotConfig} from '../test-utils';

test('Inline ', async () => {
    const page = await openStoryPage({id: 'layout-inline--default'});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Inline wrap', async () => {
    await openStoryPage({id: 'layout-inline--wrap'});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Inline negative space', async () => {
    await openStoryPage({id: 'layout-inline--negative-space'});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(ssimScreenshotConfig);
});
