import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import {SkeletonLine} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Line',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    inverse: boolean;
    ariaLabel?: string;
};

export const Default: StoryComponent<Args> = ({inverse, ariaLabel}) => {
    const {colors} = useTheme();

    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    background: inverse ? colors.backgroundBrand : colors.background,
                    display: 'flex',
                    padding: 16,
                }}
            >
                <SkeletonLine dataAttributes={{testid: 'skeleton-line'}} ariaLabel={ariaLabel} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Line';

Default.args = {
    inverse: false,
    ariaLabel: '',
};
