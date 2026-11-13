import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const CASES = [
    {size: 100, background: 'color'},
    {size: 40, background: 'color', children: true},
    {size: 40, background: 'color', children: true, border: true},
    {size: 100, background: 'image'},
    {size: 100, background: 'custom'},
    {size: 40, background: 'custom', children: true},
] as const;

for (const testCase of CASES) {
    const args = testCase;
    test(`Circle - ${JSON.stringify(testCase)}`, async () => {
        await openStoryPage({
            id: 'components-primitives-circle--default',
            args,
        });

        const story = await screen.findByTestId('circle');

        await expectScreenshot(story);
    });
}
