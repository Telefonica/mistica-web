import * as React from 'react';
import {Box, ResponsiveLayout} from '..';
import {SkeletonLine} from '../skeletons';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Skeletons/SkeletonLine',
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
    width: string;
    ariaLabel?: string;
};

const getSize = (n: number | string) => (Number.isNaN(+n) ? n : +n);

export const Default: StoryComponent<Args> = ({variantOutside, ariaLabel, width}) => {
    return (
        <ResponsiveLayout variant={variantOutside}>
            <Box paddingY={16}>
                <SkeletonLine
                    dataAttributes={{testid: 'skeleton-line'}}
                    width={getSize(width)}
                    ariaLabel={ariaLabel}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'SkeletonLine';

Default.args = {
    variantOutside: 'default',
    width: '100%',
    ariaLabel: '',
};
