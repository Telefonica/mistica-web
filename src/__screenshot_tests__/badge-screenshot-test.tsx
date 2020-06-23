import {openStoryPage} from '../test-utils';

test('Badge UI package', async () => {
    const page = await openStoryPage({
        section: 'Components|Hints/Badge',
        name: 'Badge',
        device: 'MOBILE_IOS',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
