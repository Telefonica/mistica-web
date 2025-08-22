import {openStoryPage, screen} from '../test-utils';

test('DisplayMediaCard', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaymediacard--default',
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayMediaCard with top actions', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaymediacard--default',
        args: {topAction: true, closable: true},
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayMediaCard group', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-displaymediacard--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('DisplayMediaCard with video', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaymediacard--default',
        args: {background: 'video'},
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayMediaCard with asset', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaymediacard--default',
        args: {asset: 'circle with icon'},
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayMediaCard with extra content', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaymediacard--default',
        args: {extra: true},
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each`
    background | inverse
    ${'image'} | ${false}
    ${'image'} | ${true}
    ${'video'} | ${false}
    ${'video'} | ${true}
`('DisplayMediaCard with $background, empty source and inverse=$inverse', async ({background, inverse}) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaymediacard--default',
        args: {background, emptySource: true, inverse},
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});
