import {openStoryPage, screen} from '../test-utils';
import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'TABLET', 'DESKTOP'];

test.each(devices)('EmptyState with image', async (device) => {
    await openStoryPage({
        id: 'components-others-emptystate--with-image',
        device,
    });

    const emptyState = await screen.findByTestId('empty-state-with-image');
    const image = await emptyState.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(devices)('EmptyState with icon', async (device) => {
    await openStoryPage({
        id: 'components-others-emptystate--with-icon',
        device,
    });

    const emptyState = await screen.findByTestId('empty-state-with-icon');
    const image = await emptyState.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(devices)('EmptyState with small image', async (device) => {
    await openStoryPage({
        id: 'components-others-emptystate--with-small-image',
        device,
    });

    const emptyState = await screen.findByTestId('empty-state-with-small-image');
    const image = await emptyState.screenshot();

    expect(image).toMatchImageSnapshot();
});
