import {openStoryPage} from '../test-utils';

test('Switch', async () => {
    const page = await openStoryPage({
        id: 'components-switch--default',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
