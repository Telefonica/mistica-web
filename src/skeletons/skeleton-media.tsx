// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161

import * as React from 'react';
import {createUseStyles} from '../jss';
import {useIsInverseVariant} from '../theme-variant-context';
import {useAnimation} from './styles';

type MediaStylesProps = {
    height?: string | number;
    isInverse: boolean;
};

const useMediaStyles = createUseStyles(({colors}) => ({
    row: {
        borderRadius: 8,
        height: ({height = 8}: MediaStylesProps) => height,
        width: 'content-initial',
        background: ({isInverse}: MediaStylesProps) =>
            isInverse ? colors.backgroundSkeletonInverse : colors.backgroundSkeleton,
    },
}));

type SkeletonContentProps = {
    height: string | number;
    ariaValueText?: string;
    disableAnimation?: boolean;
};

const SkeletonMedia: React.FC<SkeletonContentProps> = ({
    height,
    ariaValueText,
    disableAnimation = false,
}: SkeletonContentProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const classes = useMediaStyles({height, isInverse, disableAnimation});
    const animationClasses = useAnimation({disableAnimation});

    return (
        <div
            className={`${classes.row} ${animationClasses.animation}`}
            aria-valuetext={ariaValueText}
            role="progressbar"
            tabIndex={0}
            aria-busy
            aria-valuemin={0}
            aria-valuemax={100}
        />
    );
};

export default SkeletonMedia;
