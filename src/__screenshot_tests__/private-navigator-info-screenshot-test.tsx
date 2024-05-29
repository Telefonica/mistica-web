import {openStoryPage} from '../test-utils';

test('Navigator info', async () => {
    const page = await openStoryPage({
        id: 'private-navigator-info--default',
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});
