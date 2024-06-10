import {openStoryPage} from '../test-utils';

const cases = [
    [
        'desktop with background image',
        {
            device: 'DESKTOP',
            args: {background: 'image'},
        },
    ],
    [
        'desktop with background video',
        {
            device: 'DESKTOP',
            args: {background: 'video'},
        },
    ],
    [
        'desktop with variant inverse',
        {
            device: 'DESKTOP',
            args: {background: 'color from skin', variant: 'inverse'},
        },
    ],
    [
        'desktop with variant alternative',
        {
            device: 'DESKTOP',
            args: {background: 'color from skin', variant: 'alternative'},
        },
    ],
    [
        'desktop with variant default',
        {
            device: 'DESKTOP',
            args: {background: 'color from skin', variant: 'default'},
        },
    ],
    [
        'desktop with extra and sideExtra',
        {
            device: 'DESKTOP',
            args: {withExtra: true, withSideExtra: true},
        },
    ],
    [
        'mobile with extra and sideExtra',
        {
            device: 'MOBILE_IOS',
            args: {withExtra: true, withSideExtra: true},
        },
    ],
    [
        'tablet with extra and sideExtra',
        {
            device: 'TABLET',
            args: {withExtra: true, withSideExtra: true},
        },
    ],
    [
        'desktop centered',
        {
            device: 'DESKTOP',
            args: {centered: true},
        },
    ],
    [
        'mobile centered',
        {
            device: 'MOBILE_IOS',
            args: {centered: true},
        },
    ],
    [
        'desktop centered with extra and sideExtra',
        {
            device: 'DESKTOP',
            args: {centered: true, withExtra: true, withSideExtra: true},
        },
    ],
    [
        'mobile centered with extra and sideExtra',
        {
            device: 'MOBILE_IOS',
            args: {centered: true, withExtra: true, withSideExtra: true},
        },
    ],
    [
        'desktop one button',
        {
            device: 'DESKTOP',
            args: {actions: 'button'},
        },
    ],
    [
        'desktop one link',
        {
            device: 'DESKTOP',
            args: {actions: 'link'},
        },
    ],
    [
        'desktop long text',
        {
            device: 'DESKTOP',
            args: {
                title: 'Long title '.repeat(10),
                description: 'This is a long description with a long text to see how this works'.repeat(10),
            },
        },
    ],
    [
        'desktop long text with sideExtra',
        {
            device: 'DESKTOP',
            args: {
                title: 'Long title '.repeat(10),
                description: 'This is a long description with a long text to see how this works'.repeat(10),
                withSideExtra: true,
            },
        },
    ],
    [
        'mobile long text',
        {
            device: 'MOBILE_IOS',
            args: {
                title: 'Long title '.repeat(10),
                description: 'This is a long description with a long text to see how this works'.repeat(10),
            },
        },
    ],
    [
        'desktop 16:9 aspect ratio',
        {
            device: 'DESKTOP',
            args: {
                aspectRatio: '16 9',
            },
        },
    ],
    [
        'mobile 7:10 aspect ratio',
        {
            device: 'MOBILE_IOS',
            args: {
                aspectRatio: '7 10',
            },
        },
    ],
    [
        'mobile minHeight 100vh',
        {
            device: 'MOBILE_IOS',
            args: {
                minHeight: '100vh',
            },
        },
    ],
    [
        'desktop minimal',
        {
            device: 'DESKTOP',
            args: {
                headline: '',
                pretitle: '',
                title: 'Title',
                description: '',
                actions: 'button',
            },
        },
    ],
    [
        'mobile minimal',
        {
            device: 'MOBILE_IOS',
            args: {
                headline: '',
                pretitle: '',
                title: 'Title',
                description: '',
                actions: 'button',
            },
        },
    ],
] as const;

test.each(cases)('CoverHero %s', async (_name, {device, args}) => {
    const page = await openStoryPage({
        id: 'components-hero-coverhero--default',
        device,
        args,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
