'use client';
import * as React from 'react';

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

export {useIsReducedMotion};
