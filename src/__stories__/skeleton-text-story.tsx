import * as React from 'react';
import {ThemeVariant, skinVars} from '..';
import {SkeletonText} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Text',
};

type Args = {
    inverse: boolean;
    ariaLabel: string;
};

export const Default: StoryComponent<Args> = ({inverse, ariaLabel}) => {
    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    background: inverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
                    padding: 16,
                }}
            >
                <SkeletonText ariaLabel={ariaLabel} dataAttributes={{testid: 'skeleton-text'}} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Text';

Default.args = {
    inverse: false,
    ariaLabel: '',
};
