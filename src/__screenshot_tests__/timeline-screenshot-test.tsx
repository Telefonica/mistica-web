import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const ASSET_TYPES = ['dot', 'number', 'icon', 'circled-icon'];

for (const testCase of ASSET_TYPES) {
    const asset = testCase;
    test(`Timeline ${testCase} asset`, async () => {
        await openStoryPage({
            id: 'components-timeline--timeline-story',
            args: {orientation: 'vertical', items: 3, activeItem: 1, asset},
        });

        const timer = await screen.findByRole('list');

        await expectScreenshot(timer);
    });
}

test('Timeline horizontal', async () => {
    await openStoryPage({
        id: 'components-timeline--timeline-story',
        args: {orientation: 'horizontal', items: 3, activeItem: 1, asset: 'dot'},
    });

    const timer = await screen.findByRole('list');

    await expectScreenshot(timer);
});
