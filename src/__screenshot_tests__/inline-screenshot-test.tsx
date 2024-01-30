import {openStoryPage} from '../test-utils';

test('Inline ', async () => {
    const page = await openStoryPage({id: 'layout-inline--default'});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Inline wrap', async () => {
    const page = await openStoryPage({id: 'layout-inline--wrap'});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

// This test is unstable (https://jira.tid.es/browse/WEB-1648)
// eslint-disable-next-line jest/no-disabled-tests
test.skip('Inline negative space', async () => {
    const page = await openStoryPage({id: 'layout-inline--negative-space'});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
