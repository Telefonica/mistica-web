import {openStoryPage, screen, ssimScreenshotConfig} from '../test-utils';

test('Hero (default)', async () => {
    await openStoryPage({
        id: 'components-hero-component--default',
        device: 'MOBILE_IOS',
        args: {
            media: 'image',
            headlineType: 'promo',
            headline: 'Hero',
            pretitle: 'Pretitle',
            title: 'Title',
            description: 'This is a long description with a long text to see how this works',
            withExtra: false,
            actions: 'button and link',
            background: 'default',
            height: '100vh',
            aspectRatio: '16:9',
        },
    });

    const heroDefault = await screen.findByTestId('hero');
    expect(await heroDefault.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);

    await openStoryPage({
        id: 'components-hero-component--default',
        device: 'MOBILE_IOS',
        args: {
            media: 'image',
            headlineType: 'promo',
            headline: 'Hero',
            pretitle: 'Pretitle',
            title: 'Title',
            withExtra: true,
            actions: 'button and link',
            background: 'brand',
            height: '100vh',
            aspectRatio: '16:9',
        },
    });

    const heroBrand = await screen.findByTestId('hero');
    expect(await heroBrand.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test('Hero desktop', async () => {
    await openStoryPage({
        id: 'components-hero-component--default',
        device: 'DESKTOP',
        args: {
            media: 'image',
            headlineType: 'promo',
            headline: 'Hero',
            pretitle: 'Pretitle',
            title: 'Title',
            description: 'This is a long description with a long text to see how this works',
            withExtra: false,
            actions: 'button and link',
            background: 'default',
            height: '100vh',
            aspectRatio: '16:9',
            desktopMediaPosition: 'left',
        },
    });

    const heroDefault = await screen.findByTestId('hero');
    expect(await heroDefault.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);

    await openStoryPage({
        id: 'components-hero-component--default',
        device: 'DESKTOP',
        args: {
            media: 'image',
            headlineType: 'promo',
            headline: 'Hero',
            pretitle: 'Pretitle',
            title: 'Title',
            withExtra: true,
            actions: 'button and link',
            background: 'brand',
            height: '100vh',
            aspectRatio: '16:9',
            desktopMediaPosition: 'right',
        },
    });

    const heroBrand = await screen.findByTestId('hero');
    expect(await heroBrand.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test('Hero slideshow (mobile)', async () => {
    await openStoryPage({
        id: 'components-hero-slideshow--default',
        device: 'MOBILE_IOS',
    });

    const slideshowMobile = await screen.findByTestId('hero');
    expect(await slideshowMobile.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test('Hero slideshow (desktop)', async () => {
    await openStoryPage({
        id: 'components-hero-slideshow--default',
        device: 'DESKTOP',
    });

    const slideshowDesktop = await screen.findByTestId('hero');
    expect(await slideshowDesktop.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});
