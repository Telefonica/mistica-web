import * as React from 'react';
import Lottie from 'lottie-react';

import type {LottieComponentProps} from 'lottie-react';
import type {ExclusifyUnion} from '../../src/utils/utility-types';

type Props = Omit<LottieComponentProps, 'animationData'> &
    ExclusifyUnion<{animationData: unknown} | {animationUrl: string}>;

const Animation = ({animationData: animationDataProp, animationUrl, ...props}: Props): JSX.Element | null => {
    const [animationData, setAnimationData] = React.useState<unknown>();

    React.useLayoutEffect(() => {
        if (animationUrl) {
            fetch(animationUrl)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((jsonData) => setAnimationData(jsonData));
                    }
                })
                .catch(() => {
                    setAnimationData(undefined);
                });
        } else {
            setAnimationData(animationDataProp);
        }
    }, [animationUrl, animationDataProp]);

    return animationData ? <Lottie animationData={animationData} {...props} /> : null;
};

export default Animation;
