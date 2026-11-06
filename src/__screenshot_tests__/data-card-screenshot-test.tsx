import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const ASPECT_RATIO_VALUES = ['1:1', '7:10', '9:10'];

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`DataCard in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-datacard--default',
            device,
        });

        const dataCard = await screen.findByTestId('data-card');

        await expectScreenshot(dataCard);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`DataCard with large fontSize in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-datacard--default',
            device,
        });

        await setRootFontSize(32);

        const dataCard = await screen.findByTestId('data-card');

        await expectScreenshot(dataCard);
    });
}

test('DataCard group', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-datacard--group',
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

test('DataCard with slot content', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-datacard--default',
        device: 'MOBILE_IOS',
        args: {slot: true},
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

test('DataCard closable', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-datacard--default',
        device: 'MOBILE_IOS',
        args: {closable: true},
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

test('DataCard with top actions', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-datacard--default',
        device: 'MOBILE_IOS',
        args: {topAction: true},
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

test('DataCard without icon, with top actions and too long title', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-datacard--default',
        device: 'MOBILE_IOS',
        args: {
            topAction: true,
            asset: 'none',
            title: 'Too long title too long title too long titltoo long title too long title',
        },
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

for (const testCase of ASPECT_RATIO_VALUES) {
    const aspectRatio = testCase;
    test(`DataCard with aspect ratio ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-datacard--default',
            device: 'MOBILE_IOS',
            args: {aspectRatio: aspectRatio.replace(':', ' ')},
        });

        const dataCard = await screen.findByTestId('data-card');

        await expectScreenshot(dataCard);
    });
}

test('DataCard only with headline and title', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-datacard--default',
        device: 'MOBILE_IOS',
        args: {
            asset: 'none',
            headline: 'Priority',
            title: 'Title',
            pretitle: '',
            subtitle: '',
            description: '',
            actions: 'none',
        },
    });

    const dataCard = await screen.findByTestId('data-card');

    await expectScreenshot(dataCard);
});
