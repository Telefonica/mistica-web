import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('Tag in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Others/Tag',
        name: 'Tag',
        device,
    });

    const tag = await screen.findByTestId('tag');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('Tag with large fontSize in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Others/Tag',
        name: 'Tag',
        device,
    });

    await setRootFontSize(32);

    const tag = await screen.findByTestId('tag');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});
