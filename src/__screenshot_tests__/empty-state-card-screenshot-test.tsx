import {openStoryPage, screen} from '../test-utils';
import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const assetTypes = ['icon', 'image'];
const actionTypes = ['button', 'link', 'button & link'];

test.each(devices)('EmptyState', async (device) => {
    const page = await openStoryPage({
        id: 'components-cards-emptystatecard--default',
        device,
    });

    for (const assetType of assetTypes) {
        await page.select(await screen.findByLabelText('asset'), assetType);
        for (const actionType of actionTypes) {
            await page.select(await screen.findByLabelText('actions'), actionType);

            const emptyState = await screen.findByTestId('empty-state-card');
            const image = await emptyState.screenshot();

            expect(image).toMatchImageSnapshot();
        }
    }
});
