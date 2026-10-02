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
    /**
     * When true, `swappedContent` is mounted only while it is visible (and during the transition).
     * Useful for expensive content like a Spinner, which is CPU intensive even when it isn't visible.
     * Note that the container may resize when the content gets mounted.
     */
    unmountSwappedContent?: boolean;
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
    unmountSwappedContent = false,
    className,
    dataAttributes,
}: Props): JSX.Element => {
    // This state is needed to not render the swapped content when hidden, but keeping it visible
    // during the show/hide animation.
    // * When showSwappedContent prop is true, state is changed immediately.
    // * When showSwappedContent prop is false, state is changed after the transition ends.
    const [isSwappedContentMounted, setIsSwappedContentMounted] = React.useState(showSwappedContent);

    React.useEffect(() => {
        if (showSwappedContent && !isSwappedContentMounted) {
            setIsSwappedContentMounted(true);
        }
        // without transition there is no transitionend event, so unmount as soon as it gets hidden
        if (!showSwappedContent && isSwappedContentMounted && duration === 0) {
            setIsSwappedContentMounted(false);
        }
    }, [showSwappedContent, isSwappedContentMounted, duration]);

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
                onTransitionEnd={() => {
                    if (!showSwappedContent && isSwappedContentMounted) {
                        setIsSwappedContentMounted(false);
                    }
                }}
            >
                {!unmountSwappedContent || isSwappedContentMounted ? swappedContent : null}
            </div>
        </div>
    );
};

export default SlideSwap;
