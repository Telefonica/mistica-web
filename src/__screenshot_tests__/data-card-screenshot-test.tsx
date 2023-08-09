import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const ASPECT_RATIO_VALUES = ['1:1', '16:9', '7:10', '9:10'];

test.each(TESTABLE_DEVICES)('DataCard in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-data-card--default',
        device,
    });

    const dataCard = await screen.findByTestId('data-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('DataCard with large fontSize in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-data-card--default',
        device,
    });

    await setRootFontSize(32);

    const dataCard = await screen.findByTestId('data-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DataCard group', async () => {
    const page = await openStoryPage({
        id: 'components-cards-data-card--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('DataCard with extra content', async () => {
    const page = await openStoryPage({
        id: 'components-cards-data-card--default',
        device: 'MOBILE_IOS',
        args: {withExtra: true},
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('DataCard closable', async () => {
    const page = await openStoryPage({
        id: 'components-cards-data-card--default',
        device: 'MOBILE_IOS',
        args: {closable: true},
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('DataCard with top actions', async () => {
    const page = await openStoryPage({
        id: 'components-cards-data-card--default',
        device: 'MOBILE_IOS',
        args: {withTopAction: true},
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('DataCard without icon, with top actions and too long title', async () => {
    const page = await openStoryPage({
        id: 'components-cards-data-card--default',
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

test.each(ASPECT_RATIO_VALUES)('DataCard with aspect ratio %s', async (aspectRatio) => {
    await openStoryPage({
        id: 'components-cards-data-card--default',
        args: {aspectRatio: aspectRatio.replace(':', ' ')},
    });

    const dataCard = await screen.findByTestId('data-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});
