import * as React from 'react';
import {SkeletonRectangle} from '../skeletons';
import {StorySection} from './helpers';

export default {
    title: 'Components/Skeletons/Skeleton Rectangle',
};

type Args = {
    height: number | string;
    width: number | string;
    inverse: boolean;
    ariaLabel: string;
};

export const Default: StoryComponent<Args> = ({height, width, ariaLabel}) => {
    return (
        <div data-testid="skeleton-rectangle">
            <StorySection title="Skeleton Rectangle (Fixed)">
                <SkeletonRectangle ariaLabel={ariaLabel} height={height} width={width} />
            </StorySection>
            <StorySection title="Skeleton Rectangle (AspectRatio)">
                <SkeletonRectangle ariaLabel={ariaLabel} aspectRatio="16:9" />
            </StorySection>
        </div>
    );
};

Default.storyName = 'Skeleton Rectangle';

Default.args = {
    height: '100px',
    width: '50%',
    inverse: false,
    ariaLabel: '',
};
