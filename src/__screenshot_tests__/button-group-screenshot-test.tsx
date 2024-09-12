import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID', 'DESKTOP'];

test.each(DEVICES)('ButtonGroup (%s)', async (device) => {
    const page = await openStoryPage({
        id: 'components-buttons-buttongroup--default',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('ButtonGroup (%s) - small', async (device) => {
    const page = await openStoryPage({
        id: 'components-buttons-buttongroup--default',
        device,
        args: {small: true},
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('ButtonGroup - Long text (%s)', async (device) => {
    const page = await openStoryPage({
        id: 'components-buttons-buttongroup--default',
        device,
        args: {buttonPrimaryText: 'A very long action text in this button', buttonLink: false},
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
