import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'TABLET', 'DESKTOP'];
const assets = ['Icon', 'Image', 'img'];
const createCases = () => {
    const cases = [];
    for (const device of devices) {
        for (const asset of assets) {
            cases.push([device, asset]);
        }
    }
    return cases;
};

test.each(devices)('EmptyState in %s with image', async (device) => {
    await openStoryPage({
        id: 'patterns-empty-states-emptystate--with-image',
        device,
    });

    const emptyState = await screen.findByTestId('empty-state-with-image');
    const image = await emptyState.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(createCases())('EmptyState in %s with %s asset', async (device, asset) => {
    await openStoryPage({
        id: 'patterns-empty-states-emptystate--with-icon',
        device: device as Device,
        args: {asset},
    });

    const emptyState = await screen.findByTestId('empty-state-with-icon');
    const image = await emptyState.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(devices)('EmptyState in %s with small image', async (device) => {
    await openStoryPage({
        id: 'patterns-empty-states-emptystate--with-small-image',
        device,
    });

    const emptyState = await screen.findByTestId('empty-state-with-small-image');
    const image = await emptyState.screenshot();

    expect(image).toMatchImageSnapshot();
});
