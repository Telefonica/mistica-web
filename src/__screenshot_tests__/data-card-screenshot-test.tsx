import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('DataCard in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-datacard--default',
        device,
    });

    const dataCard = await screen.findByTestId('data-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('DataCard with large fontSize in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-datacard--default',
        device,
    });

    await setRootFontSize(32);

    const dataCard = await screen.findByTestId('data-card');

    const image = await dataCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('DataCard group', async () => {
    const page = await openStoryPage({
        id: 'components-cards-datacard--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('DataCard with extra content', async () => {
    const page = await openStoryPage({
        id: 'components-cards-datacard--default',
        device: 'MOBILE_IOS',
        args: {withExtra: true},
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
