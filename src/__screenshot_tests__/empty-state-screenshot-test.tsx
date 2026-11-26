import {test, expectScreenshot} from '../test-utils/playwright';
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

for (const testCase of devices) {
    const device = testCase;
    test(`EmptyState in ${testCase} with image`, async () => {
        await openStoryPage({
            id: 'patterns-empty-states-emptystate--with-image',
            device,
        });

        const emptyState = await screen.findByTestId('empty-state-with-image');
        await expectScreenshot(emptyState);
    });
}

for (const testCase of createCases()) {
    const [device, asset, actions] = testCase;
    test(`EmptyState in ${testCase[0]} with ${testCase[1]} asset and actions = ${testCase[2]}`, async () => {
        await openStoryPage({
            id: 'patterns-empty-states-emptystate--with-icon',
            device: device as Device,
            args: {asset, actions},
        });

        const emptyState = await screen.findByTestId('empty-state-with-icon');
        await expectScreenshot(emptyState);
    });
}

for (const testCase of devices) {
    const device = testCase;
    test(`EmptyState in ${testCase} with small image`, async () => {
        await openStoryPage({
            id: 'patterns-empty-states-emptystate--with-small-image',
            device,
        });

        const emptyState = await screen.findByTestId('empty-state-with-small-image');
        await expectScreenshot(emptyState);
    });
}
