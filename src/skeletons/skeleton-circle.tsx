// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161
import * as React from 'react';
import {useIsInverseVariant} from '../theme-variant-context';
import {useAnimation} from './styles';
import {createUseStyles} from '../jss';

type CircleStyleProps = {
    size: number;
    isInverse: boolean;
};

const useCircleStyle = createUseStyles(({colors}) => ({
    circle: {
        borderRadius: '50%',
        height: ({size}: CircleStyleProps) => size,
        width: ({size}: CircleStyleProps) => size,
        background: ({isInverse}: CircleStyleProps) =>
            isInverse ? colors.backgroundSkeletonInverse : colors.backgroundSkeleton,
    },
}));

type SkeletonCircleProps = {
    size?: string | number;
    ariaValueText?: string;
    disableAnimation?: boolean;
};

const SkeletonCircle = ({size = 40, disableAnimation, ariaValueText}: SkeletonCircleProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const animationClasses = useAnimation({disableAnimation});
    const classes = useCircleStyle({size, isInverse});

    return (
        <div
            className={`${classes.circle} ${animationClasses.animation}`}
            aria-valuetext={ariaValueText}
            role="progressbar"
            tabIndex={0}
            aria-busy
            aria-valuemin={0}
            aria-valuemax={100}
        />
    );
};

export default SkeletonCircle;
