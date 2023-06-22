import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID', 'DESKTOP'];

test.each(DEVICES)('ButtonGroup (%s)', async (device) => {
    const page = await openStoryPage({
        id: 'components-buttons-button-group--default',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('ButtonGroup - Long text (%s)', async (device) => {
    const page = await openStoryPage({
        id: 'components-buttons-button-group--default',
        device,
        args: {primaryButtonText: 'A very long action text in this button', showLink: false},
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
