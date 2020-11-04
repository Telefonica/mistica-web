import {openStoryPage} from '../test-utils';

test('Inline ', async () => {
    const page = await openStoryPage({
        section: 'Components|Layouts/Inline',
        name: 'Inline',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
