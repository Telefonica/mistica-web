import {openStoryPage, screen, waitFor} from '../test-utils';

import type {StoryArgs} from '../test-utils';

const viewport = {width: 1000, height: 800};
const positions = ['top', 'bottom', 'left', 'right'] as const;
const alignments = ['start', 'middle', 'end'] as const;
const ARROW_SIZE = 20;
const BORDER_RADIUS = 8;
const LONG_DESCRIPTION = 'A long description that wraps onto several lines '.repeat(100);

const openTooltip = async (component: string, args: StoryArgs = {}, testViewport = viewport) => {
    const page = await openStoryPage({
        id: `components-${component.toLowerCase()}--default`,
        device: 'DESKTOP',
        viewport: testViewport,
        args,
    });
    const target = await screen.findByRole('button', {name: `${component} target`});
    await target.click();
    const tooltip = await screen.findByRole('tooltip');
    const getBounds = async () => ({
        target: await target.evaluate((element) => element.getBoundingClientRect().toJSON()),
        tooltip: await tooltip.evaluate((element) =>
            element.firstElementChild?.firstElementChild?.getBoundingClientRect().toJSON()
        ),
    });
    return {page, tooltip, getBounds};
};

const expectPosition = (position: string, target: DOMRect, tooltip: DOMRect) => {
    switch (position) {
        case 'top':
            expect(tooltip.bottom).toBeLessThan(target.top);
            break;
        case 'bottom':
            expect(tooltip.top).toBeGreaterThan(target.bottom);
            break;
        case 'left':
            expect(tooltip.right).toBeLessThan(target.left);
            break;
        default:
            expect(tooltip.left).toBeGreaterThan(target.right);
    }
};

describe.each(['Tooltip', 'Popover'])('%s positioning', (component) => {
    test.each(positions.flatMap((position) => alignments.map((alignment) => ({position, alignment}))))(
        'position=$position alignment=$alignment',
        async ({position, alignment}) => {
            const {tooltip, getBounds} = await openTooltip(component, {position, alignment});
            await waitFor(async () => {
                const bounds = await getBounds();
                expectPosition(position, bounds.target, bounds.tooltip);
                const isVertical = position === 'top' || position === 'bottom';
                const start = isVertical ? 'left' : 'top';
                const end = isVertical ? 'right' : 'bottom';
                if (alignment === 'middle') {
                    expect((bounds.tooltip[start] + bounds.tooltip[end]) / 2).toBeCloseTo(
                        (bounds.target[start] + bounds.target[end]) / 2,
                        0
                    );
                } else {
                    const edge = alignment === 'start' ? start : end;
                    expect(bounds.tooltip[edge]).toBeCloseTo(bounds.target[edge], 1);
                }
                const arrowOffset = await tooltip.evaluate((element, vertical) => {
                    const arrow = element.firstElementChild?.firstElementChild?.lastElementChild;
                    return arrow instanceof HTMLElement
                        ? vertical
                            ? arrow.offsetLeft
                            : arrow.offsetTop
                        : -1;
                }, isVertical);
                expect(arrowOffset).toBeGreaterThanOrEqual(BORDER_RADIUS);
                expect(arrowOffset + ARROW_SIZE).toBeLessThanOrEqual(
                    (isVertical ? bounds.tooltip.width : bounds.tooltip.height) - BORDER_RADIUS
                );
            });
        }
    );

    test.each`
        position    | targetHorizontalPosition | targetVerticalPosition | expectedPosition
        ${'top'}    | ${'center'}              | ${'top'}               | ${'bottom'}
        ${'bottom'} | ${'center'}              | ${'bottom'}            | ${'top'}
        ${'left'}   | ${'left'}                | ${'center'}            | ${'right'}
        ${'right'}  | ${'right'}               | ${'center'}            | ${'left'}
    `('flips from $position to $expectedPosition', async ({expectedPosition, ...args}) => {
        const {getBounds} = await openTooltip(component, args);
        await waitFor(async () => {
            const {target, tooltip} = await getBounds();
            expectPosition(expectedPosition, target, tooltip);
        });
    });

    test.each(positions.flatMap((position) => alignments.map((alignment) => ({position, alignment}))))(
        'shifts within position=$position with alignment=$alignment',
        async ({position, alignment}) => {
            const isVertical = position === 'top' || position === 'bottom';
            const {getBounds} = await openTooltip(component, {
                position,
                alignment,
                targetHorizontalPosition: isVertical ? (alignment === 'start' ? 'right' : 'left') : 'center',
                targetVerticalPosition: isVertical ? 'center' : alignment === 'start' ? 'bottom' : 'top',
            });
            await waitFor(async () => {
                const {target, tooltip} = await getBounds();
                expectPosition(position, target, tooltip);
                if (alignment === 'start') {
                    expect(isVertical ? tooltip.right : tooltip.bottom).toBeCloseTo(
                        isVertical ? viewport.width : viewport.height,
                        1
                    );
                } else {
                    expect(isVertical ? tooltip.left : tooltip.top).toBeCloseTo(0);
                }
            });
        }
    );

    test.each(
        ['left', 'right'].flatMap((position) =>
            ['top', 'bottom'].map((targetVerticalPosition) => ({position, targetVerticalPosition}))
        )
    )('falls back vertically from $position near $targetVerticalPosition', async (args) => {
        const width = 360;
        const {getBounds} = await openTooltip(
            component,
            {...args, description: LONG_DESCRIPTION},
            {...viewport, width}
        );
        await waitFor(async () => {
            const {target, tooltip} = await getBounds();
            expectPosition(args.targetVerticalPosition === 'top' ? 'bottom' : 'top', target, tooltip);
            expect(tooltip.left).toBeGreaterThanOrEqual(0);
            expect(tooltip.right).toBeLessThanOrEqual(width);
            expect(tooltip.top).toBeGreaterThanOrEqual(0);
            expect(tooltip.bottom).toBeLessThanOrEqual(viewport.height);
        });
    });

    test.each(positions)('scrolls tall content in %s', async (position) => {
        const {tooltip, getBounds} = await openTooltip(
            component,
            {position, description: LONG_DESCRIPTION},
            {...viewport, width: 1400}
        );
        await waitFor(async () => {
            const bounds = await getBounds();
            expectPosition(position, bounds.target, bounds.tooltip);
            expect(bounds.tooltip.top).toBeGreaterThanOrEqual(0);
            expect(bounds.tooltip.bottom).toBeLessThanOrEqual(viewport.height);
        });
        expect(
            await tooltip.evaluate((element) => {
                const content = element.firstElementChild?.firstElementChild?.firstElementChild;
                if (!(content instanceof HTMLElement)) {
                    return false;
                }
                content.scrollTop = content.scrollHeight;
                return content.scrollHeight > content.clientHeight && content.scrollTop > 0;
            })
        ).toBe(true);
    });
});
