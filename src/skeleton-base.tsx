'use client';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './skeletons.css';
import {vars} from './skins/skin-contract.css';

type SkeletonBaseProps = {
    width?: string | number;
    height?: string | number;
    radius?: string | number;
    className?: string;
    noBorderRadius?: boolean;
};

const SkeletonBase = ({
    width = '100%',
    height = 8,
    radius = vars.borderRadii.container,
    className,
    noBorderRadius = false,
}: SkeletonBaseProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();

    return (
        <div
            className={classnames(
                className,
                isInverse ? styles.background.inverse : styles.background.default
            )}
            style={{
                borderRadius: noBorderRadius ? 0 : radius,
                width,
                height,
            }}
            aria-hidden
        />
    );
};

export default SkeletonBase;
