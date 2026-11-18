import {openStoryPage, screen, waitFor} from '../test-utils';

const DESKTOP_VIEWPORT_INSET = 40;
const MOBILE_VIEWPORT_INSET = 8;
const WIDE_TABLET_VIEWPORT = {width: 1000, height: 700};
const OPPOSITE_EDGE = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'} as const;

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
    ['default', 'bottom'],
    ['bottom-center', 'bottom'],
    ['top-center', 'top'],
] as const)('Snackbar position=%s is centered on desktop', async (givenPosition, expectedClosestVertical) => {
    const getInsets = await openSnackbar(givenPosition);

    await waitFor(async () => {
        const insets = await getInsets();

        expect(insets[expectedClosestVertical]).toBeCloseTo(DESKTOP_VIEWPORT_INSET);
        expect(insets[expectedClosestVertical]).toBeLessThan(insets[OPPOSITE_EDGE[expectedClosestVertical]]);
        expect(insets.left).toBeCloseTo(insets.right);
    });
});

test.each([
    ['bottom-left', 'bottom', 'left'],
    ['bottom-right', 'bottom', 'right'],
    ['top-left', 'top', 'left'],
    ['top-right', 'top', 'right'],
] as const)(
    'Snackbar position=%s is anchored to a corner on desktop',
    async (givenPosition, expectedClosestVertical, expectedClosestHorizontal) => {
        const getInsets = await openSnackbar(givenPosition);

        await waitFor(async () => {
            const insets = await getInsets();

            expect(insets[expectedClosestVertical]).toBeCloseTo(DESKTOP_VIEWPORT_INSET);
            expect(insets[expectedClosestHorizontal]).toBeCloseTo(DESKTOP_VIEWPORT_INSET);
            expect(insets[expectedClosestVertical]).toBeLessThan(
                insets[OPPOSITE_EDGE[expectedClosestVertical]]
            );
            expect(insets[expectedClosestHorizontal]).toBeLessThan(
                insets[OPPOSITE_EDGE[expectedClosestHorizontal]]
            );
        });
    }
);

test.each([{device: 'MOBILE_IOS_SMALL'}, {device: 'TABLET', viewport: WIDE_TABLET_VIEWPORT}] as const)(
    'Snackbar fills the bottom with position=top-right on $device',
    async (viewport) => {
        const getInsets = await openSnackbar('top-right', viewport);

        await waitFor(async () => {
            const {top, bottom, left, right} = await getInsets();

            expect(bottom).toBeCloseTo(MOBILE_VIEWPORT_INSET);
            expect(bottom).toBeLessThan(top);
            expect(left).toBeCloseTo(MOBILE_VIEWPORT_INSET);
            expect(right).toBeCloseTo(MOBILE_VIEWPORT_INSET);
        });
    }
);
