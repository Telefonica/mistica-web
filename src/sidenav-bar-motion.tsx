'use client';
import * as React from 'react';
import {useIsomorphicLayoutEffect} from './hooks';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion)';

/**
 * Whether the user asked the operating system for less motion.
 *
 * Every animated rule of the sidenav already drops its transition through this same media query, so the
 * screen answers on its own. This hook gives the answer to the parts that run in JavaScript instead: the
 * timeouts that keep a box in the document until it finished closing, and the delay after which the
 * sidenav reports that its rail stopped.
 *
 * It reports `false` on the server and for the first render, where no media query exists. A toggle of the
 * sidenav always comes later than that, so the value is settled by the time anything reads it.
 */
// TODO WIP study it if promoting this hook to `src/hooks` and reuse it? `carousel`, `meter`, and `ai-card` inline their
// own one-shot `matchMedia('(prefers-reduced-motion)')` reads; this reactive, SSR-safe version could replace them.
const useIsReducedMotion = (): boolean => {
    const [isReducedMotion, setIsReducedMotion] = React.useState(false);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia?.(REDUCED_MOTION_QUERY);
        if (!mediaQuery) {
            return;
        }
        setIsReducedMotion(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => setIsReducedMotion(event.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return isReducedMotion;
};

/**
 * The width that a text had at rest, so that it can keep it while the rail moves.
 *
 * A label or a section title that takes its width from the layout re-cuts itself as the rail narrows, and
 * a `max-content` width turns a wrapped text into one line at the first frame, which makes its row jump.
 * Freezing the width that the text had at rest keeps its lines while its box folds, so the height of the
 * row animates with the rail.
 *
 * The hook measures the element after every render at rest, and it returns that width while `isFrozen`
 * is true. It returns `undefined` when it has no measurement yet, for example when the sidenav mounted
 * collapsed or on the server: the caller then falls back to `max-content`.
 */
const useRestWidth = (
    isFrozen: boolean
): {ref: React.RefObject<HTMLDivElement | null>; frozenWidth?: number} => {
    const ref = React.useRef<HTMLDivElement>(null);
    const restWidthRef = React.useRef(0);

    // A layout effect reads the width before the browser paints, so the first frame after a collapse
    // already sees the frozen width.
    useIsomorphicLayoutEffect(() => {
        if (!isFrozen && ref.current) {
            restWidthRef.current = ref.current.offsetWidth;
        }
    });

    const frozenWidth = isFrozen && restWidthRef.current > 0 ? restWidthRef.current : undefined;
    return {ref, frozenWidth};
};

export {useIsReducedMotion, useRestWidth};
