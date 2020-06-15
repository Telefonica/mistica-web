// @flow
import {openStoryPage} from '../test-utils';

test('Stack ', async () => {
    const page = await openStoryPage({
        section: 'Components|Layouts/Stack',
        name: 'Stack',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
