import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const ITEMS_COUNT = [1, 2, 3, 4, 5, 6, 7, 8];

for (const testCase of ITEMS_COUNT) {
    const items = testCase;
    test(`HorizontalMosaic - ${testCase} items`, async () => {
        await openStoryPage({
            id: 'components-mosaic--horizontal-mosaic-story',
            device: 'DESKTOP',
            args: {items},
        });

        const story = await screen.findByTestId('horizontal-mosaic');

        await expectScreenshot(story);
    });
}

for (const testCase of ITEMS_COUNT) {
    const items = testCase;
    test(`VerticalMosaic - ${testCase} items`, async () => {
        await openStoryPage({
            id: 'components-mosaic--vertical-mosaic-story',
            device: 'DESKTOP',
            args: {items},
        });

        const story = await screen.findByTestId('vertical-mosaic');

        await expectScreenshot(story);
    });
}

test('HorizontalMosaic - appears properly on mobile', async () => {
    await openStoryPage({
        id: 'components-mosaic--horizontal-mosaic-story',
        device: 'MOBILE_IOS',
    });

    const story = await screen.findByTestId('horizontal-mosaic');

    await expectScreenshot(story);
});

test('VerticalMosaic - appears properly on mobile', async () => {
    await openStoryPage({
        id: 'components-mosaic--vertical-mosaic-story',
        device: 'MOBILE_IOS',
    });

    const story = await screen.findByTestId('vertical-mosaic');

    await expectScreenshot(story);
});
