// @flow
import {openStoryPage, screen} from '../test-utils';

const testDevices = ['MOBILE_IOS', 'DESKTOP'];

test.each(testDevices)('Row list - %s', async (device) => {
    await openStoryPage({
        section: 'Components|Lists/RowList',
        name: 'RowList',
        device,
    });

    const story = await screen.getByTestId('row-list');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(testDevices)('Boxed row list - %s', async (device) => {
    await openStoryPage({
        section: 'Components|Lists/BoxedRowList',
        name: 'BoxedRowList',
        device,
    });

    const story = await screen.getByTestId('boxed-list');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
