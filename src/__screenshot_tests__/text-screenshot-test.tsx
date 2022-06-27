import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('Text in %s', async (device) => {
    await openStoryPage({
        id: 'components-others-text--text-components',
        device,
    });

    const tag = await screen.findByTestId('text');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Text wrapping', async () => {
    await openStoryPage({
        id: 'components-others-text--text-wrapping',
        device: 'DESKTOP',
    });

    const tag = await screen.findByTestId('text');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});
