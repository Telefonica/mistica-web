import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('NakedCard in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-nakedcard--default',
        device,
    });

    const nakedCard = await screen.findByTestId('naked-card');
    const image = await nakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('NakedCard with large fontSize in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-nakedcard--default',
        device,
    });

    await setRootFontSize(32);

    const nakedCard = await screen.findByTestId('naked-card');
    const image = await nakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test('NakedCard group', async () => {
    const page = await openStoryPage({
        id: 'components-cards-nakedcard--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('NakedCard with extra ', async () => {
    await openStoryPage({
        id: 'components-cards-nakedcard--default',
        device: 'MOBILE_IOS',
        args: {
            withExtra: true,
            actions: 'button and link',
        },
    });

    const nakedCard = await screen.findByTestId('naked-card');
    const image = await nakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test('NakedCard with circular image ', async () => {
    await openStoryPage({
        id: 'components-cards-nakedcard--default',
        device: 'MOBILE_IOS',
        args: {
            media: 'circular image',
        },
    });

    const nakedCard = await screen.findByTestId('naked-card');
    const image = await nakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test('NakedCard closeable', async () => {
    await openStoryPage({
        id: 'components-cards-nakedcard--default',
        device: 'MOBILE_IOS',
        args: {
            actions: 'button and link',
            closable: true,
        },
    });

    const nakedCard = await screen.findByTestId('naked-card');
    const image = await nakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test('NakedCard with top actions', async () => {
    await openStoryPage({
        id: 'components-cards-nakedcard--default',
        device: 'MOBILE_IOS',
        args: {
            actions: 'button and link',
            withTopAction: true,
        },
    });

    const nakedCard = await screen.findByTestId('naked-card');
    const image = await nakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('SmallNakedCard in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-nakedcard--small',
        device,
    });

    const smallNakedCard = await screen.findByTestId('small-naked-card');
    const image = await smallNakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('SmallNakedCard with large fontSize in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-nakedcard--small',
        device,
    });

    await setRootFontSize(32);

    const smallNakedCard = await screen.findByTestId('small-naked-card');
    const image = await smallNakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test('SmallNakedCard with extra ', async () => {
    await openStoryPage({
        id: 'components-cards-nakedcard--small',
        device: 'MOBILE_IOS',
        args: {
            withExtra: true,
            actions: 'button and link',
        },
    });

    const smallNakedCard = await screen.findByTestId('small-naked-card');
    const image = await smallNakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test('SmallNakedCard with circular image ', async () => {
    await openStoryPage({
        id: 'components-cards-nakedcard--small',
        device: 'MOBILE_IOS',
        args: {
            media: 'circular image',
        },
    });

    const smallNakedCard = await screen.findByTestId('small-naked-card');
    const image = await smallNakedCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});
