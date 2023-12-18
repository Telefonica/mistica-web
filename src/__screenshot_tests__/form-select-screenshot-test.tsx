import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<Device> = ['DESKTOP', 'MOBILE_IOS'];

test.each(devices)('Select elements on the initial state appear properly on %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-select--default',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test('Select elements on a selected state appear properly on DESKTOP', async () => {
    const page = await openStoryPage({
        id: 'components-select--default',
        device: 'DESKTOP',
    });

    const select = await screen.findByLabelText('Select a fruit (opcional)');
    await select.click();
    const selectOptions = await screen.findAllByRole('option', {name: 'Apple'});
    // take the last one because the options are displayed in a portal, at the end of the body
    await selectOptions?.at(-1)?.click();

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test('Select elements on a selected state appear properly on MOBILE_IOS', async () => {
    const page = await openStoryPage({
        id: 'components-select--default',
        device: 'MOBILE_IOS',
    });

    const select = (await screen.findAllByRole('combobox'))[0];
    await select.select('apple');

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test('Select elements on a selected state appear properly on DESKTOP with long texts', async () => {
    const page = await openStoryPage({
        id: 'components-select--default',
        device: 'DESKTOP',
    });

    const select = await screen.findByLabelText('Select a fruit (opcional)');
    await select.click();
    const selectOptions = await screen.findAllByRole('option', {
        name: 'A very very long text value for this option',
    });
    // take the last one because the options are displayed in a portal, at the end of the body
    await selectOptions?.at(-1)?.click();

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test('Select elements on a selected state appear properly on MOBILE_IOS with long texts', async () => {
    const page = await openStoryPage({
        id: 'components-select--default',
        device: 'MOBILE_IOS',
    });

    const select = (await screen.findAllByRole('combobox'))[0];
    await select.select('longValue');

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test('Display all options', async () => {
    const page = await openStoryPage({id: 'components-select--default'});

    const story = await screen.findByTestId('select-story');

    await page.click(await screen.findByLabelText('Select a fruit (opcional)'));

    expect(await story.screenshot()).toMatchImageSnapshot();
});
