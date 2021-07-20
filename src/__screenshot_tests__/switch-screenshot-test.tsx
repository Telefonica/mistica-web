import {openStoryPage} from '../test-utils';

test('RadioGroup', async () => {
    await openStoryPage({
        id: 'components-forms-switch--default',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
