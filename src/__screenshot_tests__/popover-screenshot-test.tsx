import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const POPOVER_POSITIONS = ['top', 'bottom', 'left', 'right'];

for (const testCase of POPOVER_POSITIONS) {
    const position = testCase;
    test(`Popover - position = ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'components-popover--default',
            device: 'DESKTOP',
            args: {position, slot: true},
        });

        await (await screen.findByTestId('target')).click();

        await expectScreenshot(page);
    });
}

test('Popover - appears properly on mobile', async () => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByTestId('target')).click();

    await expectScreenshot(page);
});

test('Popover - inverse', async () => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'MOBILE_IOS',
        args: {variantOutside: 'brand'},
    });

    await (await screen.findByTestId('target')).click();

    await expectScreenshot(page);
});

for (const testCase of ['top', 'bottom', 'left', 'right'].flatMap((position) =>
    ['start', 'end'].map((alignment) => ({position, alignment}))
)) {
    const args = testCase;
    test(`Popover - position=${testCase.position} alignment=${testCase.alignment}`, async () => {
        const page = await openStoryPage({
            id: 'components-popover--default',
            device: 'DESKTOP',
            args,
        });

        await (await screen.findByRole('button', {name: 'Popover target'})).click();
        await expectScreenshot(page);
    });
}
