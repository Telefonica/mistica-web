import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import {SkeletonRow} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Row',
};

type Args = {
    inverse: boolean;
    ariaLabel: string;
};

export const Default: StoryComponent<Args> = ({inverse, ariaLabel}) => {
    const {colors} = useTheme();

    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{background: inverse ? colors.backgroundBrand : colors.background}}
                data-testid="skeleton-row"
            >
                <SkeletonRow ariaLabel={ariaLabel} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Row';

Default.args = {
    inverse: false,
    ariaLabel: '',
};
