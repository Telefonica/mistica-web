import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'TABLET', 'DESKTOP'];
const assets = ['Icon', 'Image', 'img'];
const actions = ['button and link', 'button', 'link', 'none'];
const createCases = () => {
    const cases = [];
    for (const device of devices) {
        for (const asset of assets) {
            for (const action of actions) {
                cases.push([device, asset, action]);
            }
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

test.each(createCases())(
    'EmptyState in %s with %s asset and actions = %s',
    async (device, asset, actions) => {
        await openStoryPage({
            id: 'patterns-empty-states-emptystate--with-icon',
            device: device as Device,
            args: {asset, actions},
        });

        const emptyState = await screen.findByTestId('empty-state-with-icon');
        const image = await emptyState.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);

test.each(devices)('EmptyState in %s with small image', async (device) => {
    await openStoryPage({
        id: 'patterns-empty-states-emptystate--with-small-image',
        device,
    });

    const emptyState = await screen.findByTestId('empty-state-with-small-image');
    const image = await emptyState.screenshot();

    expect(image).toMatchImageSnapshot();
});
