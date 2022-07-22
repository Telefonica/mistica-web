import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const assets = ['Icon', 'icon as Image', 'icon as img', 'image'];
const actions = ['button', 'link', 'button and link'];

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

test.each(createCases())('EmptyState %p %p %p', async (device, asset, actions) => {
    await openStoryPage({
        id: 'patterns-empty-states-emptystatecard--default',
        device: device as Device,
        args: {asset, actions},
    });

    const emptyState = await screen.findByTestId('empty-state-card');
    const image = await emptyState.screenshot();
    expect(image).toMatchImageSnapshot();
});
