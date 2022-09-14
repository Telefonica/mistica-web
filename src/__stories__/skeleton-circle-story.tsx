import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import {SkeletonCircle} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Circle',
};

type Args = {
    size?: number;
    inverse: boolean;
    disableAnimation: boolean;
    ariaValueText: string;
};

export const Default: StoryComponent<Args> = ({size, disableAnimation, inverse, ariaValueText}) => {
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
                data-testid="skeleton-circle"
            >
                <SkeletonCircle size={size} disableAnimation={disableAnimation} ariaLabel={ariaValueText} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Circle';

Default.args = {
    size: 40,
    inverse: false,
    disableAnimation: false,
    ariaValueText: '',
};
