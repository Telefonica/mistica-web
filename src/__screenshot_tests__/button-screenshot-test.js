// @flow
import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'];

test.each(DEVICES)('Buttons - normal (%s)', async (device) => {
    await openStoryPage({
        section: 'Components|Button',
        name: 'Type Of Buttons',
        device,
    });

    const story = await screen.getByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - disabled (%s)', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Button',
        name: 'Type Of Buttons',
        device,
    });

    const story = await screen.getByTestId('content');
    await page.click(screen.getByLabelText('disabled'));

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - spinner (%s)', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Button',
        name: 'Type Of Buttons',
        device,
    });

    const story = await screen.getByTestId('content');
    await page.click(screen.getByLabelText('showSpinner'));

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - small (%s)', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Button',
        name: 'Type Of Buttons',
        device,
    });

    const story = await screen.getByTestId('content');
    await page.click(screen.getByLabelText('small'));

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
