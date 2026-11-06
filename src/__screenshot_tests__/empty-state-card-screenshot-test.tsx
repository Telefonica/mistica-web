import {test, expectScreenshot} from '../test-utils/playwright';
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

for (const testCase of createCases()) {
    const [device, asset, actions] = testCase;
    test(`EmptyState ${JSON.stringify(testCase[0])} ${JSON.stringify(testCase[1])} ${JSON.stringify(testCase[2])}`, async () => {
        await openStoryPage({
            id: 'patterns-empty-states-emptystatecard--default',
            device: device as Device,
            args: {asset, actions},
        });

        const emptyState = await screen.findByTestId('empty-state-card');
        await expectScreenshot(emptyState);
    });
}
