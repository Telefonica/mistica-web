import {openStoryPage} from '../test-utils';
import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'TABLET', 'DESKTOP'];

/**
 * @deprecated
 */
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('EmptyStateScreen component (deprecated)', () => {
    test.each(devices)('EmptyStateScreen with image', async (device) => {
        const page = await openStoryPage({
            id: 'components-screens-emptystatescreen--with-image',
            device,
        });

        const image = await page.screenshot({fullPage: true});

        expect(image).toMatchImageSnapshot();
    });

    test.each(devices)('EmptyStateScreen with icon', async (device) => {
        const page = await openStoryPage({
            id: 'components-screens-emptystatescreen--with-icon',
            device,
        });

        const image = await page.screenshot({fullPage: true});

        expect(image).toMatchImageSnapshot();
    });

    test.each(devices)('EmptyStateScreen with small image', async (device) => {
        const page = await openStoryPage({
            id: 'components-screens-emptystatescreen--with-small-image',
            device,
        });

        const image = await page.screenshot({fullPage: true});

        expect(image).toMatchImageSnapshot();
    });
});
