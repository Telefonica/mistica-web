import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`NakedCard in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-nakedcard--default',
            device,
        });

        const nakedCard = await screen.findByTestId('naked-card');
        await expectScreenshot(nakedCard);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`NakedCard with large fontSize in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-nakedcard--default',
            device,
        });

        await setRootFontSize(32);

        const nakedCard = await screen.findByTestId('naked-card');
        await expectScreenshot(nakedCard);
    });
}

test('NakedCard group', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-nakedcard--group',
    });

    await expectScreenshot(page, {...{fullPage: true}});
});

test('NakedCard with slot ', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-nakedcard--default',
        device: 'MOBILE_IOS',
        args: {
            slot: true,
            actions: 'button and link',
        },
    });

    const nakedCard = await screen.findByTestId('naked-card');
    await expectScreenshot(nakedCard);
});

test('NakedCard with circular image ', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-nakedcard--default',
        device: 'MOBILE_IOS',
        args: {
            media: 'circular image',
        },
    });

    const nakedCard = await screen.findByTestId('naked-card');
    await expectScreenshot(nakedCard);
});

test('NakedCard without media ', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-nakedcard--default',
        device: 'MOBILE_IOS',
        args: {
            media: 'none',
        },
    });

    const nakedCard = await screen.findByTestId('naked-card');
    await expectScreenshot(nakedCard);
});

test('NakedCard closeable', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-nakedcard--default',
        device: 'MOBILE_IOS',
        args: {
            actions: 'button and link',
            closable: true,
        },
    });

    const nakedCard = await screen.findByTestId('naked-card');
    await expectScreenshot(nakedCard);
});

test('NakedCard with top actions', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-nakedcard--default',
        device: 'MOBILE_IOS',
        args: {
            actions: 'button and link',
            topAction: true,
        },
    });

    const nakedCard = await screen.findByTestId('naked-card');
    await expectScreenshot(nakedCard);
});

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`NakedCard with asset in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-nakedcard--default',
            device,
            args: {
                asset: 'circle with icon',
            },
        });

        const nakedCard = await screen.findByTestId('naked-card');
        await expectScreenshot(nakedCard);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`SmallNakedCard in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-nakedcard--small',
            device,
        });

        const smallNakedCard = await screen.findByTestId('small-naked-card');
        await expectScreenshot(smallNakedCard);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`SmallNakedCard with large fontSize in ${testCase}`, async () => {
        await openStoryPage({
            id: 'private-deprecated-card-stories-nakedcard--small',
            device,
        });

        await setRootFontSize(32);

        const smallNakedCard = await screen.findByTestId('small-naked-card');
        await expectScreenshot(smallNakedCard);
    });
}

test('SmallNakedCard with slot ', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-nakedcard--small',
        device: 'MOBILE_IOS',
        args: {
            slot: true,
            actions: 'button and link',
        },
    });

    const smallNakedCard = await screen.findByTestId('small-naked-card');
    await expectScreenshot(smallNakedCard);
});

test('SmallNakedCard with circular image ', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-nakedcard--small',
        device: 'MOBILE_IOS',
        args: {
            media: 'circular image',
        },
    });

    const smallNakedCard = await screen.findByTestId('small-naked-card');
    await expectScreenshot(smallNakedCard);
});

test('SmallNakedCard without media ', async () => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-nakedcard--small',
        device: 'MOBILE_IOS',
        args: {
            media: 'none',
        },
    });

    const smallNakedCard = await screen.findByTestId('small-naked-card');
    await expectScreenshot(smallNakedCard);
});
