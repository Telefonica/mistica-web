import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`MediaCard in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-mediacard--default',
            device,
        });

        const mediaCard = await screen.findByTestId('media-card');

        await expectScreenshot(mediaCard);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`MediaCard with large fontSize in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-mediacard--default',
            device,
        });

        await setRootFontSize(32);

        const mediaCard = await screen.findByTestId('media-card');

        await expectScreenshot(mediaCard);
    });
}

test('MediaCard group', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--group',
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

test('MediaCard with body ', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--default',
        device: 'MOBILE_IOS',
        args: {
            slot: true,
            actions: 'button and link',
        },
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

test('MediaCard with body closeable', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--default',
        device: 'MOBILE_IOS',
        args: {
            slot: true,
            actions: 'button and link',
            closable: true,
        },
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

test('MediaCard with top actions', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--default',
        device: 'MOBILE_IOS',
        args: {
            slot: true,
            actions: 'button and link',
            topAction: true,
        },
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`MediaCard with asset in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'private-deprecated-card-stories-mediacard--default',
            device,
            args: {
                asset: 'circle with icon',
            },
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}
