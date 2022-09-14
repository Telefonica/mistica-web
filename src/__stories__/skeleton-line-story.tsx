import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import {SkeletonLine} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Line',
};

type Args = {
    inverse: boolean;
    disableAnimation: boolean;
    ariaLabel?: string;
};

export const Default: StoryComponent<Args> = ({disableAnimation, inverse, ariaLabel}) => {
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
                data-testid="skeleton-line"
            >
                <SkeletonLine disableAnimation={disableAnimation} ariaLabel={ariaLabel} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Line';

Default.args = {
    inverse: false,
    disableAnimation: false,
    ariaLabel: '',
};
