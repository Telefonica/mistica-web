import {openStoryPage, screen} from '../test-utils';
import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('Default textfield appears properly on %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Forms/TextField',
        name: 'Variants',
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('Default textfield appears properly (focus) on %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Forms/TextField',
        name: 'Variants',
        device,
    });

    page.click(screen.getByLabelText('Normal field (opcional)'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('Default textfield appears properly (typing) on %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Forms/TextField',
        name: 'Variants',
        device,
    });

    await page.type(screen.getByLabelText('Normal field (opcional)'), 'hello moto', {delay: 100});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('Default textfield appears properly (typing and blur) on %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Forms/TextField',
        name: 'Variants',
        device,
    });

    await page.type(screen.getByLabelText('Normal field (opcional)'), 'hello moto', {delay: 100});
    await page.click((await screen.getAllByLabelText('Multiline (opcional)'))[0]);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
