import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import SkeletonMedia from '../skeleton-media';

export default {
    title: 'Components/Skeletons/Skeleton Media',
};

type Args = {
    height: number;
    inverse: boolean;
    disableAnimation: boolean;
    ariaValueText: string;
};

export const Default: StoryComponent<Args> = ({height, disableAnimation, inverse, ariaValueText}) => {
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
                data-testid="skeleton-media"
            >
                <SkeletonMedia
                    height={height}
                    disableAnimation={disableAnimation}
                    ariaValueText={ariaValueText}
                />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Media';

Default.args = {
    height: 100,
    inverse: false,
    disableAnimation: false,
    ariaValueText: '',
};
