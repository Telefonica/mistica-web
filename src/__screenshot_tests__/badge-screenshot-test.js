// @flow
import {openStoryPage} from '../test-utils';

test('Badge UI package', async () => {
    const page = await openStoryPage({
        section: 'Components|Badge',
        name: 'badge',
        device: 'MOBILE_IOS',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
