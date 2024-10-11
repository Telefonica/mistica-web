import * as React from 'react';
import Lottie from 'lottie-react';
import Loader from './loader';

import type {LottieComponentProps} from 'lottie-react';
import type {ExclusifyUnion} from '../../src/utils/utility-types';

type Props = Omit<LottieComponentProps, 'animationData'> &
    ExclusifyUnion<{animationData: unknown} | {animationUrl: string}>;

const Animation = ({animationData, animationUrl = '', ...props}: Props): JSX.Element | null => {
    if (animationData) {
        return <Lottie animationData={animationData} {...props} />;
    }
    return (
        <Loader
            load={animationUrl}
            render={(animationData) => <Lottie animationData={animationData} {...props} />}
        />
    );
};

export default Animation;
