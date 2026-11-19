import {test, expect} from '../test-utils/playwright';
import {openStoryPage, screen, waitFor} from '../test-utils';

import type {Locator} from '../test-utils';

const DESKTOP_VIEWPORT_INSET = 40;
const MOBILE_VIEWPORT_INSET = 8;
const WIDE_TABLET_VIEWPORT = {width: 1000, height: 700};
const OPPOSITE_EDGE = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'} as const;

type SnackbarViewport = Pick<Parameters<typeof openStoryPage>[0], 'device' | 'viewport'>;

const openStory = (position: string, viewport: SnackbarViewport = {}) =>
    openStoryPage({
        id: 'components-snackbar--default',
        device: 'DESKTOP',
        ...viewport,
        args: {position, persistent: true},
    });

const openSnackbar = async () => {
    const button = await screen.findByRole('button', {name: 'Open Snackbar'});
    await button.click();
    return screen.findByRole('alert');
};

const getInsets = (snackbar: Locator) =>
    snackbar.evaluate((element) => {
        const {top, right, bottom, left} = element.getBoundingClientRect();
        const {clientWidth, clientHeight} = document.documentElement;

        return {top, bottom: clientHeight - bottom, left, right: clientWidth - right};
    });

for (const {givenPosition, expectedClosestVertical} of [
    {givenPosition: 'default', expectedClosestVertical: 'bottom'},
    {givenPosition: 'bottom-center', expectedClosestVertical: 'bottom'},
    {givenPosition: 'top-center', expectedClosestVertical: 'top'},
] as const) {
    test(`Snackbar position=${givenPosition} is centered on desktop`, async () => {
        await openStory(givenPosition);
        const snackbar = await openSnackbar();

        await waitFor(async () => {
            const insets = await getInsets(snackbar);

            expect(insets[expectedClosestVertical]).toBeCloseTo(DESKTOP_VIEWPORT_INSET);
            expect(insets[expectedClosestVertical]).toBeLessThan(
                insets[OPPOSITE_EDGE[expectedClosestVertical]]
            );
            expect(insets.left).toBeCloseTo(insets.right);
        });
    });
}

for (const {givenPosition, expectedClosestVertical, expectedClosestHorizontal} of [
    {givenPosition: 'bottom-left', expectedClosestVertical: 'bottom', expectedClosestHorizontal: 'left'},
    {givenPosition: 'bottom-right', expectedClosestVertical: 'bottom', expectedClosestHorizontal: 'right'},
    {givenPosition: 'top-left', expectedClosestVertical: 'top', expectedClosestHorizontal: 'left'},
    {givenPosition: 'top-right', expectedClosestVertical: 'top', expectedClosestHorizontal: 'right'},
] as const) {
    test(`Snackbar position=${givenPosition} is anchored to a corner on desktop`, async () => {
        await openStory(givenPosition);
        const snackbar = await openSnackbar();

        await waitFor(async () => {
            const insets = await getInsets(snackbar);

            expect(insets[expectedClosestVertical]).toBeCloseTo(DESKTOP_VIEWPORT_INSET);
            expect(insets[expectedClosestHorizontal]).toBeCloseTo(DESKTOP_VIEWPORT_INSET);
            expect(insets[expectedClosestVertical]).toBeLessThan(
                insets[OPPOSITE_EDGE[expectedClosestVertical]]
            );
            expect(insets[expectedClosestHorizontal]).toBeLessThan(
                insets[OPPOSITE_EDGE[expectedClosestHorizontal]]
            );
        });
    });
}

for (const viewport of [
    {device: 'MOBILE_IOS_SMALL'},
    {device: 'TABLET', viewport: WIDE_TABLET_VIEWPORT},
] as const) {
    test(`Snackbar fills the bottom with position=top-right on ${viewport.device}`, async () => {
        await openStory('top-right', viewport);
        const snackbar = await openSnackbar();

        await waitFor(async () => {
            const {top, bottom, left, right} = await getInsets(snackbar);

            expect(bottom).toBeCloseTo(MOBILE_VIEWPORT_INSET);
            expect(bottom).toBeLessThan(top);
            expect(left).toBeCloseTo(MOBILE_VIEWPORT_INSET);
            expect(right).toBeCloseTo(MOBILE_VIEWPORT_INSET);
        });
    });
}
