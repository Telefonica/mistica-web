import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP', 'LARGE_DESKTOP'] as const;

const CASES = [
    'Carousel wrapped in layouts with and without fullWidth',
    'Hero wrapped in multiple layouts',
    'Slideshow with Hero wrapped in layout',
    'Multiple nested layouts',
    'Multiple layouts and reset',
    'Multiple resets without layouts',
    'Alternated layouts and resets ending with layout',
    'Alternated layouts and resets ending with reset',
    'Layout with fullWidth',
    'Layout with fullWidth after reset',
    'Layout after one with fullWidth and reset',
    'Internal layout expands (only in desktop)',
];

for (const testCase of DEVICES) {
    const device = testCase;
    test(`ResponsiveLayout scenarios (${testCase})`, async () => {
        await openStoryPage({
            id: 'private-responsivelayout-scenarios--default',
            device,
        });

        for (const title of CASES) {
            const element = await screen.findByTestId(title);
            await expectScreenshot(element, {
                ...{
                    // https://jira.tid.es/browse/WEB-680
                    maxDiffPixelRatio: title.includes('Carousel') ? 0.00004 : 0,
                },
            });
        }
    });
}
