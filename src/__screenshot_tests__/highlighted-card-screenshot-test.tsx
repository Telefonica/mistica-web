import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('HighlightedCard in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Cards/HighlightedCard',
        name: 'HighlightedCard',
        device,
    });

    const highlightedCard = await screen.findByTestId('highlighted-card');

    const image = await highlightedCard.screenshot();

    expect(image).toMatchImageSnapshot();
});
