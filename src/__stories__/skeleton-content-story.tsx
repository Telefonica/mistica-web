import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import SkeletonContent from '../skeleton-content';

export default {
    title: 'Components/Skeletons/Skeleton Content',
};

type Args = {
    height: number;
    inverse: boolean;
    disableAnimation: boolean;
};

export const Default: StoryComponent<Args> = ({height, disableAnimation, inverse}) => {
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
                data-testid="skeleton-content"
            >
                <SkeletonContent height={height} disableAnimation={disableAnimation} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Content';

Default.args = {
    height: 100,
    inverse: false,
    disableAnimation: false,
};
