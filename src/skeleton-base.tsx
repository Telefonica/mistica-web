import {useIsInverseVariant} from './theme-variant-context';
import * as React from 'react';
import classnames from 'classnames';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

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

    return (
        <div
            className={classnames(
                className,
                sprinkles({
                    background: isInverse
                        ? vars.colors.backgroundSkeletonInverse
                        : vars.colors.backgroundSkeleton,
                })
            )}
            style={{
                borderRadius: radius,
                width,
                height,
            }}
            aria-hidden
        />
    );
};

export default SkeletonBase;
