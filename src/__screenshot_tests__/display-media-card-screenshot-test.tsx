import {openStoryPage, screen} from '../test-utils';

test('DisplayMediaCard', async () => {
    await openStoryPage({
        id: 'components-cards-display-media-card--default',
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayMediaCard with top actions', async () => {
    await openStoryPage({
        id: 'components-cards-display-media-card--default',
        args: {withTopAction: true, closable: true},
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayMediaCard group', async () => {
    const page = await openStoryPage({
        id: 'components-cards-display-media-card--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('DisplayMediaCard with video', async () => {
    await openStoryPage({
        id: 'components-cards-display-media-card--default',
        args: {background: 'video'},
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayMediaCard with asset', async () => {
    await openStoryPage({
        id: 'components-cards-display-media-card--default',
        args: {asset: 'circle with icon'},
    });

    const displayMediaCard = await screen.findByTestId('display-media-card');

    const image = await displayMediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});
