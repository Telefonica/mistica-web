import * as React from 'react';
import {SkeletonRectangle} from '../skeletons';
import {Box, ResponsiveLayout} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Skeletons/SkeletonRectangle',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    height: string;
    width: string;
    variantOutside: Variant;
    ariaLabel: string;
};

const getSize = (n: number | string) => (Number.isNaN(+n) ? n : +n);

export const Default: StoryComponent<Args> = ({height, width, variantOutside, ariaLabel}) => {
    return (
        <ResponsiveLayout variant={variantOutside}>
            <Box paddingY={16}>
                <SkeletonRectangle
                    height={getSize(height)}
                    width={getSize(width)}
                    ariaLabel={ariaLabel}
                    dataAttributes={{testid: 'skeleton-rectangle'}}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'SkeletonRectangle';

Default.args = {
    height: '100',
    width: '100',
    variantOutside: 'default',
    ariaLabel: '',
};
