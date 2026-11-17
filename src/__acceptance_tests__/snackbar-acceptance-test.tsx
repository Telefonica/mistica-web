import {openStoryPage, screen, waitFor} from '../test-utils';

const DESKTOP_VIEWPORT_INSET = 40;
const COMPACT_VIEWPORT_INSET = 8;
const WIDE_TABLET_VIEWPORT = {width: 1000, height: 700};

type SnackbarViewport = Pick<Parameters<typeof openStoryPage>[0], 'device' | 'viewport'>;

const openSnackbar = async (position: string, viewport: SnackbarViewport = {}) => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'DESKTOP',
        ...viewport,
        args: {position, persistent: true},
    });
    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');

    return () =>
        snackbar.evaluate((element) => {
            const {top, right, bottom, left} = element.getBoundingClientRect();
            const {clientWidth, clientHeight} = document.documentElement;

            return {top, bottom: clientHeight - bottom, left, right: clientWidth - right};
        });
};

test.each([
    ['default', 'bottom', 'center'],
    ['bottom-center', 'bottom', 'center'],
    ['bottom-left', 'bottom', 'left'],
    ['bottom-right', 'bottom', 'right'],
    ['top-center', 'top', 'center'],
    ['top-left', 'top', 'left'],
    ['top-right', 'top', 'right'],
] as const)('Snackbar position=%s on desktop', async (position, vertical, horizontal) => {
    const getInsets = await openSnackbar(position);

    await waitFor(async () => {
        const insets = await getInsets();

        expect(insets[vertical]).toBeCloseTo(DESKTOP_VIEWPORT_INSET);
        if (horizontal === 'center') {
            expect(insets.left).toBeCloseTo(insets.right);
        } else {
            expect(insets[horizontal]).toBeCloseTo(DESKTOP_VIEWPORT_INSET);
        }
    });
});

test.each([{device: 'MOBILE_IOS_SMALL'}, {device: 'TABLET', viewport: WIDE_TABLET_VIEWPORT}] as const)(
    'Snackbar fills the bottom with position=top-right on $device',
    async (viewport) => {
        const getInsets = await openSnackbar('top-right', viewport);

        await waitFor(async () => {
            const {bottom, left, right} = await getInsets();

            expect(bottom).toBeCloseTo(COMPACT_VIEWPORT_INSET);
            expect(left).toBeCloseTo(COMPACT_VIEWPORT_INSET);
            expect(right).toBeCloseTo(COMPACT_VIEWPORT_INSET);
        });
    }
);
