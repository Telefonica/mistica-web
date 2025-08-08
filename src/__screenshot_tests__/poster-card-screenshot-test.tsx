import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('PosterCard in %s', async (device) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        device,
    });

    const dataCard = await screen.findByTestId('poster-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard with large fontSize in mobile', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const dataCard = await screen.findByTestId('poster-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard group', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('PosterCard closable', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        device: 'MOBILE_IOS',
        args: {closable: true},
    });

    const dataCard = await screen.findByTestId('poster-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard with top actions', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        device: 'MOBILE_IOS',
        args: {topAction: true},
    });

    const dataCard = await screen.findByTestId('poster-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard without icon, with top actions and too long title', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        device: 'MOBILE_IOS',
        args: {
            topAction: true,
            asset: 'none',
            title: 'Too long title too long title too long titltoo long title too long title',
        },
    });

    const dataCard = await screen.findByTestId('poster-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard with video', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        args: {background: 'video'},
    });

    const posterCard = await screen.findByTestId('poster-card');

    const image = await posterCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('PosterCard with asset in %s', async (device) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        device,
        args: {asset: 'circle with icon'},
    });

    const posterCard = await screen.findByTestId('poster-card');

    const image = await posterCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(['inverse', 'alternative', 'default'])('PosterCard with variant %s', async (variant) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        args: {variant, background: 'color from skin'},
    });

    const posterCard = await screen.findByTestId('poster-card');

    const image = await posterCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard with custom background color', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        args: {background: 'custom color', backgroundColorCustom: '#ff0'},
    });

    const posterCard = await screen.findByTestId('poster-card');

    const image = await posterCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard with custom background color inverse', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        args: {background: 'custom color', backgroundColorCustom: '#000', variant: 'inverse'},
    });

    const posterCard = await screen.findByTestId('poster-card');

    const image = await posterCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard with extra content', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        args: {extra: true},
    });

    const posterCard = await screen.findByTestId('poster-card');

    const image = await posterCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each`
    background | inverse
    ${'image'} | ${false}
    ${'image'} | ${true}
    ${'video'} | ${false}
    ${'video'} | ${true}
`('PosterCard with $background, empty source and inverse=$inverse', async ({background, inverse}) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-postercard--default',
        args: {background, emptySource: true, inverse},
    });

    const posterCard = await screen.findByTestId('poster-card');

    const image = await posterCard.screenshot();

    expect(image).toMatchImageSnapshot();
});
