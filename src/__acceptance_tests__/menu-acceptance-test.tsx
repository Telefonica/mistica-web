import {openStoryPage, screen, waitFor} from '../test-utils';

import type {StoryArgs} from '../test-utils';

const MENU_OFFSET = 8;
const VIEWPORT_MARGIN = 12;
const viewport = {width: 1000, height: 800};
const placements = ['top', 'bottom', 'left', 'right'] as const;
const alignments = ['start', 'middle', 'end'] as const;

const openMenu = async (args: StoryArgs = {}) => {
    const page = await openStoryPage({
        id: 'components-menu--default',
        device: 'DESKTOP',
        viewport,
        args: {
            horizontalPosition: 'center',
            verticalPosition: 'center',
            menuOptionsCount: 3,
            checkbox: false,
            ...args,
        },
    });
    const target = await screen.findByRole('button', {name: 'Open'});
    await target.click();
    const menu = await screen.findByRole('menu');
    const getBounds = async () => ({
        target: await target.evaluate((element) => element.getBoundingClientRect().toJSON()),
        menu: await menu.evaluate((element) => element.firstElementChild?.getBoundingClientRect().toJSON()),
    });
    return {page, menu, getBounds};
};

const expectPlacement = (placement: string, target: DOMRect, menu: DOMRect) => {
    switch (placement) {
        case 'top':
            expect(target.top - menu.bottom).toBeCloseTo(MENU_OFFSET);
            break;
        case 'bottom':
            expect(menu.top - target.bottom).toBeCloseTo(MENU_OFFSET);
            break;
        case 'left':
            expect(target.left - menu.right).toBeCloseTo(MENU_OFFSET);
            break;
        default:
            expect(menu.left - target.right).toBeCloseTo(MENU_OFFSET);
            break;
    }
};

test.each(placements.flatMap((placement) => alignments.map((alignment) => ({placement, alignment}))))(
    'Menu placement=$placement alignment=$alignment',
    async ({placement, alignment}) => {
        const {getBounds} = await openMenu({placement, alignment});
        await waitFor(async () => {
            const {target, menu} = await getBounds();
            expectPlacement(placement, target, menu);
            const isVertical = placement === 'top' || placement === 'bottom';
            if (alignment === 'start') {
                expect(isVertical ? menu.left : menu.top).toBeCloseTo(isVertical ? target.left : target.top);
            } else if (alignment === 'end') {
                expect(isVertical ? menu.right : menu.bottom).toBeCloseTo(
                    isVertical ? target.right : target.bottom
                );
            } else {
                expect(isVertical ? menu.left + menu.width / 2 : menu.top + menu.height / 2).toBeCloseTo(
                    isVertical ? target.left + target.width / 2 : target.top + target.height / 2,
                    1
                );
            }
        });
    }
);

test.each`
    placement   | horizontalPosition | verticalPosition | expectedPlacement
    ${'top'}    | ${'center'}        | ${'top'}         | ${'bottom'}
    ${'bottom'} | ${'center'}        | ${'bottom'}      | ${'top'}
    ${'left'}   | ${'left'}          | ${'center'}      | ${'right'}
    ${'right'}  | ${'right'}         | ${'center'}      | ${'left'}
`('Menu flips from $placement to $expectedPlacement', async ({expectedPlacement, ...args}) => {
    const {getBounds} = await openMenu({...args, alignment: 'middle'});
    await waitFor(async () => {
        const {target, menu} = await getBounds();
        expectPlacement(expectedPlacement, target, menu);
    });
});

test.each(placements.flatMap((placement) => alignments.map((alignment) => ({placement, alignment}))))(
    'Menu shifts within $placement without changing alignment=$alignment',
    async ({placement, alignment}) => {
        const isVertical = placement === 'top' || placement === 'bottom';
        const {getBounds} = await openMenu({
            placement,
            alignment,
            horizontalPosition: isVertical ? (alignment === 'start' ? 'right' : 'left') : 'center',
            verticalPosition: isVertical ? 'center' : alignment === 'start' ? 'bottom' : 'top',
        });
        await waitFor(async () => {
            const {target, menu} = await getBounds();
            expectPlacement(placement, target, menu);
            if (alignment === 'start') {
                expect(isVertical ? menu.right : menu.bottom).toBeCloseTo(
                    (isVertical ? viewport.width : viewport.height) - VIEWPORT_MARGIN
                );
            } else {
                expect(isVertical ? menu.left : menu.top).toBeCloseTo(VIEWPORT_MARGIN);
            }
        });
    }
);

test.each(placements)('Menu limits height and scrolls in %s', async (placement) => {
    const {menu, getBounds} = await openMenu({placement, menuOptionsCount: 30});
    const bounds = await getBounds();
    expect(bounds.menu.top).toBeGreaterThanOrEqual(VIEWPORT_MARGIN);
    expect(bounds.menu.bottom).toBeLessThanOrEqual(viewport.height - VIEWPORT_MARGIN);
    expect(
        await menu.evaluate((element) => {
            const content = element.firstElementChild;
            return content && content.scrollHeight > content.clientHeight;
        })
    ).toBe(true);
    const lastOption = await screen.findByRole('menuitem', {name: 'Click to close the menu'});
    await lastOption.evaluate((element) => element.scrollIntoView());
    await lastOption.click();
    await screen.findByRole('button', {name: 'Open'});
});

test.each(['left', 'right'])('Menu preserves position=%s', async (horizontalPosition) => {
    const {getBounds} = await openMenu({horizontalPosition, verticalPosition: 'top'});
    const {target, menu} = await getBounds();
    expectPlacement('bottom', target, menu);
    expect(horizontalPosition === 'left' ? menu.left : menu.right).toBeCloseTo(
        horizontalPosition === 'left' ? target.left : target.right
    );
});
