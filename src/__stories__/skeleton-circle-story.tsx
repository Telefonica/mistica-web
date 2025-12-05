import * as React from 'react';
import {ResponsiveLayout, Box} from '..';
import {SkeletonCircle} from '../skeletons';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Skeletons/SkeletonCircle',
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
    size: number;
    variantOutside: Variant;
    ariaValueText: string;
};

export const Default: StoryComponent<Args> = ({size, variantOutside, ariaValueText}) => {
    return (
        <ResponsiveLayout variant={variantOutside}>
            <Box paddingY={16}>
                <SkeletonCircle
                    dataAttributes={{testid: 'skeleton-circle'}}
                    size={size}
                    ariaLabel={ariaValueText}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'SkeletonCircle';

Default.args = {
    size: 40,
    variantOutside: 'default',
    ariaValueText: '',
};
