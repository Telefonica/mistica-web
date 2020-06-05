// @flow
import {openStoryPage} from '../test-utils';

test('Stack ', async () => {
    const page = await openStoryPage({
        section: 'Components|Layout',
        name: 'Stack Example',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
