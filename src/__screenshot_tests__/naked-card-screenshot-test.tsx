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
