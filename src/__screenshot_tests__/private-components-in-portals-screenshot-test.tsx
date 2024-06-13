import {openStoryPage} from '../test-utils';

const DEVICES = ['DESKTOP'] as const;

test.each(DEVICES)('Components with portals render properly (%s)', async (device) => {
    await openStoryPage({
        id: 'private-components-inside-portals--default',
        device,
    });
});
