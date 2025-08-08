import {openStoryPage, screen} from '../test-utils';

const ASPECT_RATIO_VALUES = ['1:1', '7:10', '9:10'];

test('DisplayDataCard', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaydatacard--default',
    });

    const displayDataCard = await screen.findByTestId('display-data-card');

    const image = await displayDataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayDataCard with top actions', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaydatacard--default',
        args: {topAction: true, closable: true},
    });

    const displayDataCard = await screen.findByTestId('display-data-card');

    const image = await displayDataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayDataCard with top actions without asset', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaydatacard--default',
        args: {topAction: true, closable: true, asset: 'none'},
    });

    const displayDataCard = await screen.findByTestId('display-data-card');

    const image = await displayDataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayDataCard with top actions inverse', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaydatacard--default',
        args: {topAction: true, closable: true, isInverse: true},
    });

    const displayDataCard = await screen.findByTestId('display-data-card');

    const image = await displayDataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(ASPECT_RATIO_VALUES)('DisplayDataCard with aspect ratio %s', async (aspectRatio) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-displaydatacard--default',
        device: 'MOBILE_IOS',
        args: {aspectRatio: aspectRatio.replace(':', ' ')},
    });

    const displayDataCard = await screen.findByTestId('display-data-card');

    const image = await displayDataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DisplayDataCard group', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-displaydatacard--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
