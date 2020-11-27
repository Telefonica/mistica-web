import {openStoryPage, PageApi, screen} from '../test-utils';
import type {Device} from '../test-utils';
import {ElementHandle} from 'puppeteer';

const testDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

const screenshotDifferentControls = async (page: PageApi, list: ElementHandle<Element>) => {
    await page.select(await screen.findByLabelText('Control type'), 'chevron');
    expect(await list.screenshot()).toMatchImageSnapshot();

    await page.select(await screen.findByLabelText('Control type'), 'checkbox');
    await page.click((await screen.findAllByRole('checkbox'))[4]);
    expect(await list.screenshot()).toMatchImageSnapshot();

    await page.select(await screen.findByLabelText('Control type'), 'switch');
    await page.click((await screen.findAllByRole('switch'))[0]);
    expect(await list.screenshot()).toMatchImageSnapshot();

    await page.select(await screen.findByLabelText('Control type'), 'custom element');
    expect(await list.screenshot()).toMatchImageSnapshot();

    await page.select(await screen.findByLabelText('Control type'), 'none');
    expect(await list.screenshot()).toMatchImageSnapshot();
};

test.each(testDevices)('Row list - %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Lists/RowList',
        name: 'RowList',
        device,
    });

    const badgeCheckbox = await screen.findByLabelText('With badge');
    await badgeCheckbox.click();

    const list = await screen.findByTestId('row-list');

    await screenshotDifferentControls(page, list);
});

test.each(testDevices)('Boxed row list - %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Lists/BoxedRowList',
        name: 'BoxedRowList',
        device,
    });

    const list = await screen.findByTestId('row-list');

    await screenshotDifferentControls(page, list);
});
