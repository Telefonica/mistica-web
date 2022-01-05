import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<Device> = ['DESKTOP', 'MOBILE_IOS'];

test.each(devices)('Select elements on the initial state appear properly on %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-forms-select--default',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('Select elements on a selected state appear properly on %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-forms-select--default',
        device,
    });

    if (device === 'MOBILE_IOS') {
        const select = (await screen.findAllByRole('combobox'))[0];
        await select.select('apple');
    } else {
        const select = await screen.findByLabelText('Select a fruit (opcional)');
        await select.click();
        const selectOption = (await screen.findAllByText('Apple'))[0];
        await selectOption.click();
    }

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
