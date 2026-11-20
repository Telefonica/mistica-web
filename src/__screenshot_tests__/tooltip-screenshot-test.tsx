import {test, expectScreenshot} from '../test-utils/playwright';
import {VIVO_SKIN} from '../skins/constants';
import {openStoryPage, screen} from '../test-utils';

const TARGET_HORIZONTAL_POSITIONS = ['left', 'center', 'right'];
const TARGET_VERTICAL_POSITIONS = ['top', 'center', 'bottom'];
const TOOLTIP_POSITIONS = ['top', 'bottom', 'left', 'right'];

const getCases = () => {
    const cases = [];

    for (const position of TOOLTIP_POSITIONS) {
        for (const targetHorizontalPosition of TARGET_HORIZONTAL_POSITIONS) {
            for (const targetVerticalPosition of TARGET_VERTICAL_POSITIONS) {
                cases.push([position, targetHorizontalPosition, targetVerticalPosition]);
            }
        }
    }
    return cases;
};

for (const testCase of getCases()) {
    const [position, targetHorizontalPosition, targetVerticalPosition] = testCase;
    test(`Tooltip - position = ${testCase[0]}, targetHorizontalPosition = ${testCase[1]}, targetVerticalPosition = ${testCase[2]}`, async () => {
        const page = await openStoryPage({
            id: 'components-tooltip--default',
            device: 'DESKTOP',
            args: {position, targetHorizontalPosition, targetVerticalPosition, slot: true},
        });

        await (await screen.findByTestId('target')).click();

        await expectScreenshot(page);
    });
}

test('Tooltip - appears properly on mobile', async () => {
    const page = await openStoryPage({
        id: 'components-tooltip--default',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByTestId('target')).click();

    await expectScreenshot(page);
});

test('Tooltip - inverse', async () => {
    const page = await openStoryPage({
        id: 'components-tooltip--default',
        device: 'MOBILE_IOS',
        args: {variantOutside: 'brand'},
    });

    await (await screen.findByTestId('target')).click();

    await expectScreenshot(page);
});

test('Tooltip - max width is 496px', async () => {
    const page = await openStoryPage({
        id: 'components-tooltip--default',
        device: 'DESKTOP',
        args: {
            description:
                'This is a really long long long description that should be wrapped because it exceeds the maximum tooltip width',
        },
    });

    await (await screen.findByTestId('target')).click();

    await expectScreenshot(page);
});

test('Tooltip - content is centered if width is small', async () => {
    const page = await openStoryPage({
        id: 'components-tooltip--default',
        device: 'MOBILE_IOS',
        args: {title: '', description: 'A'},
    });

    await (await screen.findByTestId('target')).click();

    await expectScreenshot(page);
});

test('Tooltip - appears properly when its container is fixed and has overflow hidden', async () => {
    const page = await openStoryPage({
        id: 'private-tooltip--inside-fixed-container',
        device: 'DESKTOP',
    });

    await (await screen.findByTestId('target')).click();

    await expectScreenshot(page);
});

test('Tooltip - active tooltip is closed if another one is opened', async () => {
    const page = await openStoryPage({
        id: 'private-tooltip--multiple-tooltips',
        device: 'DESKTOP',
    });

    await (await screen.findByTestId('target-0')).click();

    await expectScreenshot(page);

    await (await screen.findByTestId('target-1')).click();

    await expectScreenshot(page);

    await (await screen.findByTestId('target-2')).click();

    await expectScreenshot(page);
});

test('Tooltip - with targetStyle', async () => {
    const page = await openStoryPage({
        id: 'private-tooltip--with-target-styles',
        device: 'DESKTOP',
    });

    await expectScreenshot(page);

    await (await screen.findByTestId('target-0')).click();

    await expectScreenshot(page);

    await (await screen.findByTestId('target-1')).click();

    await expectScreenshot(page);
});

/**
 * when using Vivo_new skin, the tooltip border radius is bigger than in other skins, so it's useful
 * to check that the tooltip's arrow is displayed properly in this scenario.
 */
test('Tooltip - arrow appears properly in Vivo skin when target is close to viewport edges', async () => {
    const page = await openStoryPage({
        id: 'components-tooltip--default',
        args: {targetHorizontalPosition: 'left', targetVerticalPosition: 'top'},
        skin: VIVO_SKIN,
    });

    await (await screen.findByTestId('target')).click();

    await expectScreenshot(page);
});

for (const testCase of ['top', 'bottom', 'left', 'right'].flatMap((position) =>
    ['start', 'end'].map((alignment) => ({position, alignment}))
)) {
    const args = testCase;
    test(`Tooltip - position=${testCase.position} alignment=${testCase.alignment}`, async () => {
        const page = await openStoryPage({
            id: 'components-tooltip--default',
            device: 'DESKTOP',
            args,
        });

        await (await screen.findByRole('button', {name: 'Tooltip target'})).click();
        await expectScreenshot(page);
    });
}

for (const testCase of ['top', 'left']) {
    const position = testCase;
    test(`Tooltip - small content with Vivo corners in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'components-tooltip--default',
            device: 'DESKTOP',
            skin: VIVO_SKIN,
            args: {position, alignment: 'start', title: '', description: 'A'},
        });
        await (await screen.findByRole('button', {name: 'Tooltip target'})).click();
        await expectScreenshot(page);
    });
}
