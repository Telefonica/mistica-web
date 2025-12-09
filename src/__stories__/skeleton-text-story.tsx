import * as React from 'react';
import {Box, ResponsiveLayout} from '..';
import {SkeletonText} from '../skeletons';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Skeletons/SkeletonText',
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
    variantOutside: Variant;
    ariaLabel: string;
};

export const Default: StoryComponent<Args> = ({variantOutside, ariaLabel}) => {
    return (
        <ResponsiveLayout variant={variantOutside}>
            <Box paddingY={16}>
                <SkeletonText ariaLabel={ariaLabel} dataAttributes={{testid: 'skeleton-text'}} />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'SkeletonText';

Default.args = {
    variantOutside: 'default',
    ariaLabel: '',
};
