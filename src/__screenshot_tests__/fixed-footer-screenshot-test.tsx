import {screen, openStoryPage} from '../test-utils';

test('Dialog over fixed footer', async () => {
    const page = await openStoryPage({
        id: 'layout-fixed-footer-layout--dialog-over-fixed-footer',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByText('Open dialog')).click();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Fixed footer with relative position when height is smaller than the footer itself', async () => {
    const page = await openStoryPage({
        id: 'layout-fixed-footer-layout--more-complex-footer',
        device: 'MOBILE_IOS_SMALL',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

    await page.setViewport({
        width: 564,
        height: 100,
        deviceScaleFactor: 1,
        isMobile: true,
        isLandscape: false,
        hasTouch: true,
    });

    const imageOverflow = await page.screenshot({fullPage: false});
    expect(imageOverflow).toMatchImageSnapshot();

    await (await screen.findByRole('button', {name: 'Load more text'})).evaluate((el) => el.scrollIntoView());
    const imageOverflowScrolled = await page.screenshot({fullPage: false});
    expect(imageOverflowScrolled).toMatchImageSnapshot();
});
