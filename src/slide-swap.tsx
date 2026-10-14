'use client';
import * as React from 'react';
import classNames from 'classnames';
import * as styles from './slide-swap.css';
import ScreenReaderOnly from './screen-reader-only';
import {useIsomorphicLayoutEffect} from './hooks';
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
     * Called once the swap transition ends (in both directions). Useful to unmount expensive content
     * (like a Spinner) once it is hidden. Not called when `duration` is 0, as there is no transition.
     */
    onTransitionEnd?: () => void;
    /**
     * Announces the text of the content that becomes visible to screen readers on every swap, using a
     * polite live region. Nothing is announced on mount. Disabled by default, as not every swap is
     * meaningful (e.g. decorative icons) and some consumers, like Button, handle their own announcements.
     */
    announceSwap?: boolean;
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
    onTransitionEnd,
    announceSwap = false,
    className,
    dataAttributes,
}: Props): JSX.Element => {
    const primaryContentRef = React.useRef<HTMLDivElement>(null);
    const swappedContentRef = React.useRef<HTMLDivElement>(null);
    const lastShowSwappedContentRef = React.useRef(showSwappedContent);
    const [announcement, setAnnouncement] = React.useState('');

    // aria-hidden doesn't prevent the hidden content from receiving focus. The styles hide it once its
    // transition ends, and inert also blocks it while it fades out. The attribute is set through the DOM
    // because React 18 doesn't support the `inert` prop
    useIsomorphicLayoutEffect(() => {
        primaryContentRef.current?.toggleAttribute('inert', showSwappedContent);
        swappedContentRef.current?.toggleAttribute('inert', !showSwappedContent);
    }, [showSwappedContent]);

    React.useEffect(() => {
        // compare with the previous value instead of skipping the first run, so nothing is announced on
        // mount even when effects run twice (React StrictMode)
        if (lastShowSwappedContentRef.current === showSwappedContent) {
            return;
        }
        lastShowSwappedContentRef.current = showSwappedContent;
        if (announceSwap) {
            const visibleContent = showSwappedContent ? swappedContentRef.current : primaryContentRef.current;
            setAnnouncement(visibleContent?.textContent?.trim() ?? '');
        }
    }, [showSwappedContent, announceSwap]);

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
            <div
                ref={primaryContentRef}
                aria-hidden={showSwappedContent ? true : undefined}
                className={styles.primaryContent}
            >
                {children}
            </div>
            <div
                ref={swappedContentRef}
                aria-hidden={showSwappedContent ? undefined : true}
                className={styles.swappedContent}
                onTransitionEnd={(event) => {
                    // ignore transitions from the content itself and fire only once per swap
                    if (event.target === event.currentTarget && event.propertyName === 'opacity') {
                        onTransitionEnd?.();
                    }
                }}
            >
                {swappedContent}
            </div>
            {announceSwap && (
                // always mounted while enabled, so screen readers pick up its changes
                <ScreenReaderOnly>
                    <div role="status" aria-live="polite">
                        {announcement}
                    </div>
                </ScreenReaderOnly>
            )}
        </div>
    );
};

export default SlideSwap;
