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
                style={{
                    padding: 16,
                    width: '50%',
                    background: inverse ? colors.backgroundBrand : colors.background,
                    // prevent line-height from affecting the height of the container;
                    // happens when changing the base font size
                    lineHeight: 0,
                }}
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
