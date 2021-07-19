import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('HighlightedCard in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-highlightedcard--default',
        device,
    });

    const highlightedCard = await screen.findByTestId('highlighted-card');

    const image = await highlightedCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('HighlightedCard with large fontSize in %s', async (device) => {
    await openStoryPage({
        id: 'components-cards-highlightedcard--default',
        device,
    });

    await setRootFontSize(32);

    const highlightedCard = await screen.findByTestId('highlighted-card');

    const image = await highlightedCard.screenshot();

    expect(image).toMatchImageSnapshot();
});
