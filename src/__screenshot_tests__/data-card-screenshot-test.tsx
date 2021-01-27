import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('DataCard in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Cards/DataCard',
        name: 'DataCard',
        device,
    });

    const dataCard = await screen.findByTestId('data-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('DataCard with large fontSize in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Cards/DataCard',
        name: 'DataCard',
        device,
    });

    await setRootFontSize(32);

    const dataCard = await screen.findByTestId('data-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DataCard group', async () => {
    const page = await openStoryPage({
        section: 'Components/Cards/DataCard',
        name: 'DataCard group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('DataCard with body ', async () => {
    const page = await openStoryPage({
        section: 'Components/Cards/DataCard',
        name: 'DataCard with body',
        device: 'MOBILE_IOS',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
