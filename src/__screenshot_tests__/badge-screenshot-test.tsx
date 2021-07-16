import {openStoryPage} from '../test-utils';

test('Badge UI package', async () => {
    const page = await openStoryPage({
        id: 'components-hints-badge--badge-story',
        device: 'MOBILE_IOS',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
