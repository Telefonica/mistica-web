import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP', 'LARGE_DESKTOP'] as const;

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Image with srcSet is responsive (${testCase})`, async () => {
        await openStoryPage({
            id: 'private-image-image-with-srcset-attribute-is-responsive--default',
            device,
        });

        const element = await screen.findByTestId('content');
        await expectScreenshot(element);
    });
}
