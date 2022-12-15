import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import {SkeletonText} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Text',
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
                data-testid="skeleton-text"
            >
                <SkeletonText ariaLabel={ariaLabel} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Text';

Default.args = {
    inverse: false,
    ariaLabel: '',
};
