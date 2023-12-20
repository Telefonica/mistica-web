import {openStoryPage} from '../test-utils';

test.each(['MOBILE_IOS', 'DESKTOP'] as const)('LoadingScreen in %s', async (device) => {
    const page = await openStoryPage({
        id: 'loading-loadingscreen--loading-screen-story',
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(['MOBILE_IOS', 'DESKTOP'] as const)('LoadingScreen inverse in %s', async (device) => {
    const page = await openStoryPage({
        id: 'loading-loadingscreen--loading-screen-story',
        device,
        args: {isInverse: true},
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(['MOBILE_IOS', 'DESKTOP'] as const)('BrandLoadingScreen in %s', async (device) => {
    const page = await openStoryPage({
        id: 'loading-loadingscreen--brand-loading-screen-story',
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
