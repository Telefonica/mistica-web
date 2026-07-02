import {CYBER_SKIN, getCyberSkin} from '../community/skins/cyber-skin';
import {openStoryPage, screen} from '../test-utils';

import type {ElementHandle, StoryArgs} from '../test-utils';

const STORY_ID = 'components-pagination--default';
const MOBILE_TARGET_SIZE = 48;
const ELLIPSIS_CONTENT_SIZE = 32;
const getRgbColor = (hexColor: string): string => {
    const color = hexColor.replace('#', '');
    const channels = [0, 2, 4].map((start) => parseInt(color.slice(start, start + 2), 16));
    return `rgb(${channels.join(', ')})`;
};

const expectBoundingBox = async (
    element: ElementHandle,
    expectedBox: {width?: number; height?: number; minWidth?: number}
) => {
    const box = await element.boundingBox();

    if (!box) {
        throw Error('Element bounding box should be available');
    }

    if (expectedBox.width !== undefined) {
        expect(box.width).toBe(expectedBox.width);
    }
    if (expectedBox.minWidth !== undefined) {
        expect(box.width).toBeGreaterThanOrEqual(expectedBox.minWidth);
    }
    if (expectedBox.height !== undefined) {
        expect(box.height).toBe(expectedBox.height);
    }

    return box;
};

test('Pagination interactive items have 48px targets on mobile', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS',
        args: {totalPages: 9, currentPage: 3},
    });

    const previous = await screen.findByRole('button', {name: 'Página anterior'});
    const page = await screen.findByRole('button', {name: 'Ir a la página 2'});
    const currentPage = await screen.findByRole('button', {name: 'Página 3, página actual'});
    const next = await screen.findByRole('button', {name: 'Página siguiente'});

    for (const target of [page, currentPage]) {
        await expectBoundingBox(target, {width: MOBILE_TARGET_SIZE, height: MOBILE_TARGET_SIZE});
    }

    for (const target of [previous, next]) {
        await expectBoundingBox(target, {minWidth: MOBILE_TARGET_SIZE, height: MOBILE_TARGET_SIZE});
    }
});

test('Pagination ellipses are non-interactive and keep the mobile layout size', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS',
        args: {totalPages: 20, currentPage: 10, surroundingPageCount: 1},
    });

    const pagination = await screen.findByRole('navigation');
    const ellipses = await pagination.$$('li[aria-hidden="true"]');

    expect(ellipses).toHaveLength(2);

    for (const ellipsis of ellipses) {
        const content = await ellipsis.$('span');

        if (!content) {
            throw Error('Ellipsis content should be available');
        }

        await expectBoundingBox(ellipsis, {width: MOBILE_TARGET_SIZE, height: MOBILE_TARGET_SIZE});
        await expectBoundingBox(content, {width: ELLIPSIS_CONTENT_SIZE, height: ELLIPSIS_CONTENT_SIZE});
        expect(await ellipsis.evaluate((element) => (element as HTMLElement).tabIndex)).toBe(-1);
    }
});

const cyberColors = getCyberSkin().colors;
const ELLIPSIS_COLOR_CASES: ReadonlyArray<{variantOutside: StoryArgs['variantOutside']; color: string}> = [
    {variantOutside: 'default', color: getRgbColor(cyberColors.textSecondary)},
    {variantOutside: 'brand', color: getRgbColor(cyberColors.textButtonSecondaryBrand)},
    {variantOutside: 'negative', color: getRgbColor(cyberColors.textButtonSecondaryNegative)},
    {variantOutside: 'alternative', color: getRgbColor(cyberColors.textSecondary)},
];

test.each(ELLIPSIS_COLOR_CASES)('Pagination ellipsis color in $variantOutside context', async (testCase) => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        skin: CYBER_SKIN,
        args: {
            totalPages: 20,
            currentPage: 10,
            surroundingPageCount: 1,
            variantOutside: testCase.variantOutside,
        },
    });

    const pagination = await screen.findByRole('navigation');
    const ellipsis = await pagination.$('li[aria-hidden="true"] span');

    if (!ellipsis) {
        throw Error('Ellipsis should be available');
    }

    expect(await ellipsis.evaluate((element) => getComputedStyle(element).color)).toBe(testCase.color);
});

test('Pagination hides the page list when configured', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {totalPages: 9, currentPage: 3, hidePageList: true, navigationControls: 'buttonLink'},
    });

    const pagination = await screen.findByRole('navigation');
    const pageList = await pagination.$('ol');

    expect(pageList).toBeNull();
});
