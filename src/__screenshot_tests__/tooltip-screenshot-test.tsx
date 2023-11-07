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

        await page.click(await screen.findByRole('button'));

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test('Tooltip - inverse', async () => {
    const page = await openStoryPage({
        id: 'components-tooltip--default',
        device: 'DESKTOP',
        args: {inverse: true},
    });

    await page.click(await screen.findByRole('button'));

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

    await page.click(await screen.findByRole('button'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
