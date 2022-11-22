// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161
import * as React from 'react';
import SkeletonBase from './skeleton-base';
import Stack from './stack';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './skeletons.css';

import type {DataAttributes} from './utils/types';

type SkeletonAnimationProps = {
    children: React.ReactNode;
    ariaLabel?: string;
    dataAttributes?: DataAttributes;
};

const SkeletonAnimation = ({children, ariaLabel, dataAttributes}: SkeletonAnimationProps) => {
    return (
        <div
            className={styles.animation}
            role="status"
            aria-busy
            aria-hidden={ariaLabel === undefined}
            aria-label={ariaLabel}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {children}
        </div>
    );
};

type SkeletonLineProps = {
    width?: string | number;
    ariaLabel?: string;
    dataAttributes?: DataAttributes;
};

export const SkeletonLine = ({width = '100%', ariaLabel, dataAttributes}: SkeletonLineProps): JSX.Element => {
    return (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <SkeletonBase width={width} />
        </SkeletonAnimation>
    );
};

type SkeletonTextProps = Omit<SkeletonLineProps, 'width'>;

export const SkeletonText = ({ariaLabel, dataAttributes}: SkeletonTextProps): JSX.Element => {
    return (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <Stack space={16}>
                <SkeletonBase />
                <SkeletonBase />
                <SkeletonBase width="75%" />
            </Stack>
        </SkeletonAnimation>
    );
};

type SkeletonCircleProps = Omit<SkeletonLineProps, 'width'> & {size?: number | string};

export const SkeletonCircle = ({ariaLabel, size = 40, dataAttributes}: SkeletonCircleProps): JSX.Element => {
    return (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <SkeletonBase height={size} width={size} radius="50%" />
        </SkeletonAnimation>
    );
};

type SkeletonRowProps = SkeletonLineProps;

export const SkeletonRow = ({width = '100%', ariaLabel, dataAttributes}: SkeletonRowProps): JSX.Element => {
    return (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <div className={styles.row}>
                <SkeletonBase height={40} width={40} radius="50%" className={styles.circle} />
                <SkeletonBase width={width} className={styles.line} />
            </div>
        </SkeletonAnimation>
    );
};

type SkeletonRectangleProps = {
    ariaLabel?: string;
    dataAttributes?: DataAttributes;
    width?: number | string;
    height?: number | string;
};

export const SkeletonRectangle = ({
    width = '100%',
    height = '100%',
    ariaLabel,
    dataAttributes,
}: SkeletonRectangleProps): JSX.Element => {
    return (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <SkeletonBase height={height} width={width} />
        </SkeletonAnimation>
    );
};
