import {openStoryPage, screen} from '../test-utils';
import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID'];

test.each(DEVICES)('Buttons - normal (%s)', async (device) => {
    await openStoryPage({
        section: 'Components/Touchables/Button',
        name: 'Type Of Buttons',
        device,
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - disabled (%s)', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Touchables/Button',
        name: 'Type Of Buttons',
        device,
    });

    const story = await screen.findByTestId('content');
    await page.click(await screen.findByLabelText('Disabled'));

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - spinner (%s)', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Touchables/Button',
        name: 'Type Of Buttons',
        device,
    });

    const story = await screen.findByTestId('content');
    await page.click(await screen.findByLabelText('Show Spinner'));

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - small (%s)', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Touchables/Button',
        name: 'Type Of Buttons',
        device,
    });

    const story = await screen.findByTestId('content');
    await page.click(await screen.findByLabelText('Small'));

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
