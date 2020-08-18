import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<[Device, string?]> = [
    ['DESKTOP', undefined],
    ['MOBILE_IOS', 'iPhone'],
];

test.each(devices)(
    'Select elements on the initial state appear properly on %s',
    async (device, userAgent) => {
        const page = await openStoryPage({
            section: 'Components|Forms/FormSelect',
            name: 'FormSelect',
            device,
            userAgent,
        });

        const image = await page.screenshot({fullPage: true});
        expect(image).toMatchImageSnapshot();
    }
);

test.each(devices)('Select elements on a selected state appear properly on %s', async (device, userAgent) => {
    const page = await openStoryPage({
        section: 'Components|Forms/FormSelect',
        name: 'FormSelect',
        device,
        userAgent,
    });

    if (device === 'MOBILE_IOS') {
        // @ts-expect-error Property 'select' does not exist on type 'PageApi'.
        await page.select('select', 'apple');
    } else {
        const select = await screen.findByLabelText('(opcional)');
        await select.click();
        const selectOption = await screen.findByText('Apple');
        await selectOption.click();
    }

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
