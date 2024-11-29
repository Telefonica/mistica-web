import * as React from 'react';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import {HorizontalMosaic, VerticalMosaic} from '../mosaic';
import {Text2} from '../text';

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

test.each(ITEMS_COUNT)(
    'VerticalMosaic - gridMode passed as a function is correct with %s items',
    (itemsCount) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <VerticalMosaic
                    items={Array.from({length: itemsCount}, (_, index) => ({gridMode}) => (
                        <Text2 regular>{`${index + 1}-${gridMode}`}</Text2>
                    ))}
                />
            </ThemeContextProvider>
        );

        const expectedGridModes = verticalMosaicItemsGridMode[itemsCount - 1];

        expectedGridModes.forEach((gridMode, index) => {
            expect(screen.getByText(`${index + 1}-${gridMode}`)).toBeInTheDocument();
        });
    }
);

test.each(ITEMS_COUNT)(
    'HorizontalMosaic - gridMode passed as a function is correct with %s items',
    (itemsCount) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <HorizontalMosaic
                    items={Array.from({length: itemsCount}, (_, index) => ({gridMode}) => (
                        <Text2 regular>{`${index + 1}-${gridMode}`}</Text2>
                    ))}
                />
            </ThemeContextProvider>
        );

        const expectedGridModes = horizontalMosaicItemsGridMode[itemsCount - 1];

        expectedGridModes.forEach((gridMode, index) => {
            expect(screen.getByText(`${index + 1}-${gridMode}`)).toBeInTheDocument();
        });
    }
);
