import {test, expectScreenshot} from '../test-utils/playwright';
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

for (const testCase of TEST_CASES) {
    test(`ResponsiveLayout (${JSON.stringify(testCase)})`, async () => {
        const page = await openStoryPage({
            ...testCase,
        });

        await expectScreenshot(page);
    });
}
