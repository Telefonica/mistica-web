import {useIsInverseVariant} from './theme-variant-context';
import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';

type SkeletonBaseStylesProps = {
    width: string | number;
    height: string | number;
    isInverse: boolean;
    radius: string | number;
};

const useSkeletonBaseStyles = createUseStyles(({colors}) => ({
    skeletonBase: {
        borderRadius: ({radius}: SkeletonBaseStylesProps) => radius,
        height: ({height}: SkeletonBaseStylesProps) => height,
        width: ({width}: SkeletonBaseStylesProps) => width,
        background: ({isInverse}: SkeletonBaseStylesProps) =>
            isInverse ? colors.backgroundSkeletonInverse : colors.backgroundSkeleton,
    },
}));

type SkeletonBaseProps = {
    width?: string | number;
    height?: string | number;
    radius?: string | number;
    className?: string;
};

const SkeletonBase = ({
    width = '100%',
    height = 8,
    radius = 8,
    className,
}: SkeletonBaseProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const classes = useSkeletonBaseStyles({isInverse, width, height, radius});

    return <div className={classnames(classes.skeletonBase, className)} aria-hidden />;
};

export default SkeletonBase;
