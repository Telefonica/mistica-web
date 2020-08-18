import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';
import type {ElementHandle} from 'puppeteer';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('Default textfield appears properly on %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Forms/FormFields',
        name: 'Variants',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('Default textfield appears properly (focus) on %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Forms/FormFields',
        name: 'Variants',
        device,
    });

    page.click(await screen.findByLabelText('Normal field (opcional)'));

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('Default textfield appears properly (typing) on %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Forms/FormFields',
        name: 'Variants',
        device,
    });

    await page.type(await screen.findByLabelText('Normal field (opcional)'), 'hello moto', {delay: 100});

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('Default textfield appears properly (typing and blur) on %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Forms/FormFields',
        name: 'Variants',
        device,
    });

    await page.type(await screen.findByLabelText('Normal field (opcional)'), 'hello moto', {delay: 100});
    await page.click((await screen.findAllByLabelText('Multiline'))[0]);

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

const screenshotField = async (element: ElementHandle) => {
    const parentElement = (await element.$x('..'))[0];
    return parentElement.screenshot();
};

test('Search text field', async () => {
    const page = await openStoryPage({
        section: 'Components|Forms/FormFields',
        name: 'Types (controlled)',
    });

    const field = await screen.findByLabelText('Search');

    const emptyScreenshot = await screenshotField(field);
    expect(emptyScreenshot).toMatchImageSnapshot();

    await page.type(field, 'hello moto', {delay: 100});
    const filledScreenshot = await screenshotField(field);
    expect(filledScreenshot).toMatchImageSnapshot();
});
