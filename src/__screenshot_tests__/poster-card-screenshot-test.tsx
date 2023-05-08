import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('PosterCard in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-poster-card--default',
        device,
    });

    const dataCard = await screen.findByTestId('poster-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard with large fontSize in mobile', async () => {
    await openStoryPage({
        id: 'components-cards-poster-card--default',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const dataCard = await screen.findByTestId('poster-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('PosterCard group', async () => {
    const page = await openStoryPage({
        id: 'components-cards-poster-card--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('PosterCard closable', async () => {
    const page = await openStoryPage({
        id: 'components-cards-poster-card--default',
        device: 'MOBILE_IOS',
        args: {closable: true},
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('PosterCard with top actions', async () => {
    const page = await openStoryPage({
        id: 'components-cards-poster-card--default',
        device: 'MOBILE_IOS',
        args: {withTopAction: true},
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('PosterCard without icon, with top actions and too long title', async () => {
    const page = await openStoryPage({
        id: 'components-cards-poster-card--default',
        device: 'MOBILE_IOS',
        args: {
            withTopAction: true,
            asset: 'none',
            title: 'Too long title too long title too long titltoo long title too long title',
        },
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('PosterCard is never rendered smaller than 140 x 112', async () => {
    const page = await openStoryPage({
        id: 'components-cards-poster-card--default',
        device: 'DESKTOP',
        args: {
            withTopAction: false,
            asset: 'none',
            title: 'A title',
            width: '1px',
            height: '1px',
        },
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('PosterCard with video', async () => {
    await openStoryPage({
        id: 'components-cards-poster-card--default',
        args: {background: 'video'},
    });

    const posterCard = await screen.findByTestId('poster-card');

    const image = await posterCard.screenshot();

    expect(image).toMatchImageSnapshot();
});
