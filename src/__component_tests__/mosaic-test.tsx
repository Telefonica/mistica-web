import {test, expect} from '../test-utils/component';

const ITEMS_COUNT = [1, 2, 3, 4, 5, 6];

const verticalMosaicItemsGridMode = [
    // 1 item
    ['horizontal'],

    // 2 items
    ['square', 'square'],

    // 3 items
    ['vertical', 'square', 'square'],

    // 4 items
    ['vertical', 'square', 'square', 'vertical'],

    // 5 items
    ['vertical', 'square', 'square', 'vertical', 'horizontal'],

    // 6 items
    ['vertical', 'square', 'square', 'vertical', 'square', 'square'],
];

const horizontalMosaicItemsGridMode = [
    // 1 item
    ['horizontal'],

    // 2 items
    ['horizontal', 'horizontal'],

    // 3 items
    ['horizontal', 'square', 'square'],

    // 4 items
    ['square', 'square', 'square', 'square'],

    // 5 items
    ['horizontal', 'square', 'square', 'horizontal', 'horizontal'],

    // 6 items
    ['horizontal', 'square', 'square', 'square', 'square', 'horizontal'],
];

for (const vertical of [true, false]) {
    for (const itemsCount of ITEMS_COUNT) {
        test(`${vertical ? 'Vertical' : 'Horizontal'}Mosaic - gridMode passed as a function is correct with ${itemsCount} items`, async ({
            mount,
        }) => {
            const component = await mount('mosaic/GridModes', {itemsCount, vertical});
            const expectedGridModes = (
                vertical ? verticalMosaicItemsGridMode : horizontalMosaicItemsGridMode
            )[itemsCount - 1];
            for (const [index, gridMode] of expectedGridModes.entries()) {
                await expect(component.getByText(`${index + 1}-${gridMode}`, {exact: true})).toHaveCount(1);
            }
        });
    }
}
