import {openStoryPage} from '../test-utils';

test('Private example', async () => {
    const page = await openStoryPage({
        id: 'private-example--default',
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});
