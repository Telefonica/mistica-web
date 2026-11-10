import * as React from 'react';
import {HorizontalMosaic, VerticalMosaic} from '../mosaic';
import {Text2} from '../text';

export const GridModes = ({itemsCount, vertical}: {itemsCount: number; vertical: boolean}): JSX.Element => {
    const Mosaic = vertical ? VerticalMosaic : HorizontalMosaic;
    return (
        <Mosaic
            items={Array.from({length: itemsCount}, (_, index) => ({gridMode}) => (
                <Text2 regular>{`${index + 1}-${gridMode}`}</Text2>
            ))}
        />
    );
};
