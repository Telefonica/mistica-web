import {openStoryPage, screen} from '../../test-utils';

test.each`
    actions              | footerImage
    ${'none'}            | ${false}
    ${'button'}          | ${false}
    ${'link'}            | ${false}
    ${'button and link'} | ${false}
    ${'none'}            | ${true}
    ${'button'}          | ${true}
    ${'link'}            | ${true}
    ${'button and link'} | ${true}
`('Advanced Data Card actions: $actions - footerImage: $footerImage', async ({actions, footerImage}) => {
    await openStoryPage({
        id: 'community-advanceddatacard--default',
        device: 'MOBILE_IOS',
        args: {actions, footerImage},
    });

    const element = await screen.findByTestId('advanced-data-card');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each`
    extra
    ${0}
    ${1}
    ${3}
`('Advanced Data Card extras: $extra', async ({extra}) => {
    await openStoryPage({
        id: 'community-advanceddatacard--default',
        device: 'MOBILE_IOS',
        args: {extra},
    });

    const element = await screen.findByTestId('advanced-data-card');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Advanced Data Card extras: 3 no divider', async () => {
    await openStoryPage({
        id: 'community-advanceddatacard--default',
        device: 'MOBILE_IOS',
        args: {extra: 3, noExtraDivider: true},
    });

    const element = await screen.findByTestId('advanced-data-card');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Advanced Data Card inside Carousel', async () => {
    await openStoryPage({
        id: 'community-advanceddatacards-in-carousel--default',
        device: 'DESKTOP',
    });

    const element = await screen.findByTestId('advanced-data-card-carousel');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Advanced Data Card without stackingGroup, with top actions and too long title', async () => {
    const page = await openStoryPage({
        id: 'community-advanceddatacard--default',
        device: 'MOBILE_IOS',
        args: {
            stackingGroup: false,
            headline: '',
            pretitle: '',
            title: 'Too long title too long title too long titltoo long title too long title',
        },
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
