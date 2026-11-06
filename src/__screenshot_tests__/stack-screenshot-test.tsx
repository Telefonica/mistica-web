import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';

for (const testCase of [{space: 0}, {space: 32}, {space: 'between'}, {space: 'evenly'}] as const) {
    const {space} = testCase;
    test(`Stack space: ${testCase.space}`, async () => {
        const page = await openStoryPage({
            id: 'layout-stack--default',
            args: {space},
            device: 'MOBILE_IOS',
        });

        await expectScreenshot(page, {...{fullPage: true}});
    });
}
