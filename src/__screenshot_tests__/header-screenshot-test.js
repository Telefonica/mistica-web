// @flow
import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP'];

test.each(DEVICES)('Header (%s)', async (device) => {
    await openStoryPage({
        section: 'Components|Headers/Header',
        name: 'Header',
        device,
    });

    const story = await screen.getByTestId('header-layout');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Header', async (device) => {
    await openStoryPage({
        section: 'Components|Headers/MainSectionHeader',
        name: 'MainSectionHeader',
        device,
    });

    const story = await screen.getByTestId('header-layout');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
