import {openStoryPage, screen} from '../test-utils';

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
            args: {extra: true, sideExtra: true},
        },
    ],
    [
        'mobile with extra and sideExtra',
        {
            device: 'MOBILE_IOS',
            args: {extra: true, sideExtra: true},
        },
    ],
    [
        'tablet with extra and sideExtra',
        {
            device: 'TABLET',
            args: {extra: true, sideExtra: true},
        },
    ],
    [
        'desktop centered',
        {
            device: 'DESKTOP',
            args: {centered: true, actions: 'button secondaryButton and link'},
        },
    ],
    [
        'mobile centered',
        {
            device: 'MOBILE_IOS',
            args: {centered: true, actions: 'button secondaryButton and link'},
        },
    ],
    [
        'desktop centered with extra and sideExtra',
        {
            device: 'DESKTOP',
            args: {
                centered: true,
                extra: true,
                sideExtra: true,
                actions: 'button secondaryButton and link',
            },
        },
    ],
    [
        'mobile centered with extra and sideExtra',
        {
            device: 'MOBILE_IOS',
            args: {
                centered: true,
                extra: true,
                sideExtra: true,
                actions: 'button secondaryButton and link',
            },
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
        'desktop two buttons',
        {
            device: 'DESKTOP',
            args: {actions: 'button and secondaryButton'},
        },
    ],
    [
        'desktop two buttons and link',
        {
            device: 'DESKTOP',
            args: {actions: 'button secondaryButton and link'},
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
                sideExtra: true,
            },
        },
    ],
    [
        'desktop long text centered',
        {
            device: 'DESKTOP',
            args: {
                title: 'Long title '.repeat(10),
                centered: true,
                description: 'This is a long description with a long text to see how this works'.repeat(10),
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
                actions: 'none',
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
                actions: 'none',
            },
        },
    ],
] as const;

test.each(cases)('CoverHero %s', async (_name, {device, args}) => {
    await openStoryPage({
        id: 'components-hero-coverhero--default',
        device,
        args,
    });

    const coverHero = await screen.findByTestId('cover-hero');
    const image = await coverHero.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('CoverHero inside a Slideshow', async () => {
    await openStoryPage({
        id: 'components-hero-coverhero--cover-hero-in-slideshow',
        args: {
            background: 'image',
        },
    });

    const coverHero = await screen.findByTestId('slideshow');
    const image = await coverHero.screenshot();
    expect(image).toMatchImageSnapshot();
});
