import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('Text in %s', async (device) => {
    await openStoryPage({
        section: 'Components|Others/Text',
        name: 'Text',
        device,
    });

    const tag = await screen.findByTestId('text');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});
