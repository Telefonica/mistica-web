import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage} from '../test-utils';

for (const testCase of ['MOBILE_IOS', 'DESKTOP'] as const) {
    const device = testCase;
    test(`LoadingScreen in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'patterns-loading--loading-screen-story',
            device,
        });

        await expectScreenshot(page);
    });
}

for (const testCase of ['MOBILE_IOS', 'DESKTOP'] as const) {
    const device = testCase;
    test(`LoadingScreen inverse in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'patterns-loading--loading-screen-story',
            device,
            args: {variant: 'brand'},
        });

        await expectScreenshot(page);
    });
}

for (const testCase of ['MOBILE_IOS', 'DESKTOP'] as const) {
    const device = testCase;
    test(`BrandLoadingScreen in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'patterns-loading--brand-loading-screen-story',
            device,
        });

        await expectScreenshot(page);
    });
}
