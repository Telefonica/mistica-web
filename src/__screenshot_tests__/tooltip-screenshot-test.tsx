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

test.each(getCases())(
    'Tooltip - position = %s, targetHorizontalPosition = %s, targetVerticalPosition = %s',
    async (position, targetHorizontalPosition, targetVerticalPosition) => {
        const page = await openStoryPage({
            id: 'components-tooltip--default',
            device: 'DESKTOP',
            args: {position, targetHorizontalPosition, targetVerticalPosition, extra: true},
        });

        await page.click(await screen.findByTestId('target'));

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test('Tooltip - appears properly on mobible', async () => {
    const page = await openStoryPage({
        id: 'components-tooltip--default',
        device: 'MOBILE_IOS',
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tooltip - inverse', async () => {
    const page = await openStoryPage({
        id: 'components-tooltip--default',
        device: 'MOBILE_IOS',
        args: {inverse: true},
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
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

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tooltip - appears properly when its container is fixed and has overflow hidden', async () => {
    const page = await openStoryPage({
        id: 'private-tooltip--inside-fixed-container',
        device: 'DESKTOP',
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tooltip - active tooltip is closed if another one is opened', async () => {
    const page = await openStoryPage({
        id: 'private-tooltip--multiple-tooltips',
        device: 'DESKTOP',
    });

    await page.click(await screen.findByTestId('target-0'));

    const firstTooltip = await page.screenshot();
    expect(firstTooltip).toMatchImageSnapshot();

    await page.click(await screen.findByTestId('target-1'));

    const secondTooltip = await page.screenshot();
    expect(secondTooltip).toMatchImageSnapshot();

    await page.click(await screen.findByTestId('target-2'));

    const thirdTooltip = await page.screenshot();
    expect(thirdTooltip).toMatchImageSnapshot();
});
