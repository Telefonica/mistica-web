import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const BADGE_VALUE_OPTIONS = ['undefined', '0', '2', '14'];

for (const testCase of BADGE_VALUE_OPTIONS) {
    const value = testCase;
    test(`Badge - value = ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-badge--default',
            device: 'MOBILE_IOS',
            args: {value},
        });

        const story = await screen.findByTestId('content');

        await expectScreenshot(story);
    });
}

test('Badge - over inverse', async () => {
    await openStoryPage({
        id: 'components-badge--default',
        device: 'MOBILE_IOS',
        args: {variantOutside: 'brand'},
    });

    const story = await screen.findByTestId('content');

    await expectScreenshot(story);
});
