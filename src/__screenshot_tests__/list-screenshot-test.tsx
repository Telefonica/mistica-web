import {openStoryPage, screen} from '../test-utils';
import type {Device} from '../test-utils';

const testDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(testDevices)('Row list - %s', async (device) => {
    await openStoryPage({
        section: 'Components|Lists/RowList',
        name: 'RowList',
        device,
    });

    const badgeCheckbox = await screen.findByLabelText('With badge');
    await badgeCheckbox.click();

    const story = await screen.findByTestId('row-list');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(testDevices)('Boxed row list - %s', async (device) => {
    await openStoryPage({
        section: 'Components|Lists/BoxedRowList',
        name: 'BoxedRowList',
        device,
    });

    const story = await screen.findByTestId('row-list');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
