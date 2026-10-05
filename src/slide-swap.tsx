'use client';
import * as React from 'react';
import classNames from 'classnames';
import * as styles from './slide-swap.css';
import {applyCssVars} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

const DEFAULT_DURATION = 300;
const OFFSET = '2rem';

type Props = {
    /** content shown when `showSwappedContent` is false */
    children: React.ReactNode;
    /** content shown when `showSwappedContent` is true */
    swappedContent: React.ReactNode;
    showSwappedContent: boolean;
    /** direction in which `children` leaves the container. Defaults to 'up' */
    direction?: 'up' | 'down';
    align?: 'left' | 'center' | 'right';
    /** transition duration in milliseconds */
    duration?: number;
    className?: string;
    dataAttributes?: DataAttributes;
};

/**
 * Swaps two contents with a vertical slide + fade transition, the same animation used by Button
 * when it shows its spinner.
 *
 * Both contents share the same grid cell, so the container is sized to fit the largest one and
 * doesn't resize while the transition runs.
 */
const SlideSwap = ({
    children,
    swappedContent,
    showSwappedContent,
    direction = 'up',
    align = 'center',
    duration = DEFAULT_DURATION,
    className,
    dataAttributes,
}: Props): JSX.Element => {
    return (
        <div
            {...getPrefixedDataAttributes({testid: 'SlideSwap', ...dataAttributes})}
            className={classNames(styles.wrapper, styles.align[align], className, {
                [styles.isSwapped]: showSwappedContent,
            })}
            style={applyCssVars({
                [styles.vars.duration]: `${duration}ms`,
                [styles.vars.offset]: direction === 'up' ? OFFSET : `-${OFFSET}`,
            })}
        >
            <div aria-hidden={showSwappedContent ? true : undefined} className={styles.primaryContent}>
                {children}
            </div>
            <div
                aria-hidden={showSwappedContent ? undefined : true}
                className={styles.swappedContent}
            >
                {swappedContent}
            </div>
        </div>
    );
};

export default SlideSwap;
