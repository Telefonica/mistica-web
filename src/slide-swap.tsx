'use client';
import * as React from 'react';
import classNames from 'classnames';
import * as styles from './slide-swap.css';
import ScreenReaderOnly from './screen-reader-only';
import {useIsomorphicLayoutEffect} from './hooks';
import {applyCssVars} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

const DEFAULT_DURATION_IN_MS = 300;
const OFFSET = '2rem';
const ANNOUNCEMENT_DURATION_IN_MS = 1000;

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
     * Texts announced to screen readers when each content becomes visible, through a polite live region
     * that is cleared after a second. Nothing is announced on mount, nor for a content without text.
     * Don't set a text for a content that announces itself (e.g. a Spinner with `aria-live`), or screen
     * readers will read both.
     */
    announcements?: {primary?: string; swapped?: string};
    className?: string;
    dataAttributes?: DataAttributes;
};

/**
 * Swaps two contents with a vertical slide + fade transition, the same animation used by Button
 * when it shows its spinner.
 *
 * Both contents share the same grid cell, so the container is sized to fit the largest one and
 * doesn't resize while the transition runs.
 *
 * Only the content that appears is announced, and each content must have one source of announcement:
 * either a text in `announcements`, or a live region of its own. Both contents are always mounted, and
 * screen readers don't reliably announce a live region that only stops being aria-hidden, so a content
 * that announces itself must mount, or change, its live region when it appears.
 */
const SlideSwap = ({
    children,
    swappedContent,
    showSwappedContent,
    direction = 'up',
    align = 'center',
    duration = DEFAULT_DURATION_IN_MS,
    onTransitionEnd,
    announcements,
    className,
    dataAttributes,
}: Props): JSX.Element => {
    const primaryContentRef = React.useRef<HTMLDivElement>(null);
    const swappedContentRef = React.useRef<HTMLDivElement>(null);
    const lastShowSwappedContentRef = React.useRef(showSwappedContent);
    // the id changes on every announcement, so the text node is replaced and screen readers announce it
    // even when the text is the same as the previous one
    const [announcement, setAnnouncement] = React.useState({text: '', id: 0});
    const primaryAnnouncement = announcements?.primary ?? '';
    const swappedAnnouncement = announcements?.swapped ?? '';

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

        const visibleAnnouncement = showSwappedContent ? swappedAnnouncement : primaryAnnouncement;
        // a content without text clears the previous one, so it doesn't describe the content that is gone
        setAnnouncement(({id}) => ({text: visibleAnnouncement, id: id + 1}));
    }, [showSwappedContent, primaryAnnouncement, swappedAnnouncement]);

    // clear the announcement once it has been read, so virtual cursor navigation doesn't find it next to
    // the visible content
    React.useEffect(() => {
        if (!announcement.text) {
            return;
        }
        const timeoutId = setTimeout(
            () => setAnnouncement(({id}) => ({text: '', id})),
            ANNOUNCEMENT_DURATION_IN_MS
        );
        return () => clearTimeout(timeoutId);
    }, [announcement]);

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
            {announcements && (
                // always mounted while there are announcements, so screen readers pick up its changes
                <ScreenReaderOnly>
                    <div role="status" aria-live="polite">
                        <React.Fragment key={announcement.id}>{announcement.text}</React.Fragment>
                    </div>
                </ScreenReaderOnly>
            )}
        </div>
    );
};

export default SlideSwap;
