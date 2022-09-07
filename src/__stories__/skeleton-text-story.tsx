import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import SkeletonText from '../skeleton-text';

export default {
    title: 'Components/Skeletons/Skeleton Text',
};

type Args = {
    inverse: boolean;
    disableAnimation: boolean;
    ariaValueText: string;
};

export const Default: StoryComponent<Args> = ({disableAnimation, inverse, ariaValueText}) => {
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
                <SkeletonText disableAnimation={disableAnimation} ariaValueText={ariaValueText} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Text';

Default.args = {
    inverse: false,
    disableAnimation: false,
    ariaValueText: '',
};
