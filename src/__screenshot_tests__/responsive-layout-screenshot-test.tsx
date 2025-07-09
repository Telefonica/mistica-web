import {openStoryPage} from '../test-utils';

const TEST_CASES = [
    {id: 'layout-responsive-layout--default', device: 'MOBILE_IOS'},
    {id: 'layout-responsive-layout--default', device: 'TABLET'},
    {id: 'layout-responsive-layout--default', device: 'DESKTOP'},
    {id: 'layout-responsive-layout--default', device: 'DESKTOP', viewport: {width: 1512, height: 770}},
    {id: 'layout-responsive-layout--nested', device: 'MOBILE_IOS'},
    {id: 'layout-responsive-layout--nested', device: 'TABLET'},
    {id: 'layout-responsive-layout--nested', device: 'DESKTOP'},
    {id: 'layout-responsive-layout--nested', device: 'DESKTOP', viewport: {width: 1512, height: 770}},
] as const;

test.each(TEST_CASES)('ResponsiveLayout', async (testCase) => {
    const page = await openStoryPage({
        ...testCase,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
