'use client';
import * as React from 'react';
import ReactDOM from 'react-dom';
import ThemeContext from './theme-context';
import {useIsomorphicLayoutEffect} from './hooks';
import {DENSITY_ATTRIBUTE} from './density/definitions';

/**
 * This component renders the children elements outside the parent component.
 *
 * This is useful for components that need position fixed, for example
 * for menus, alerts, overlays, etc.
 *
 * @see https://react.dev/reference/react-dom/createPortal#usage
 */

type Props = {
    children: React.ReactNode;
    className?: string;
};

export const Portal = ({children, className}: Props): JSX.Element | null => {
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
    // The Portal may render outside a ThemeContextProvider, so it can not use useTheme
    const density = React.useContext(ThemeContext)?.density;

    React.useEffect(() => {
        const newContainer = document.createElement('div');
        newContainer.style.isolation = 'isolate';
        setContainer(newContainer);
        document.body.appendChild(newContainer);

        return () => {
            document.body.removeChild(newContainer);
        };
    }, []);

    React.useEffect(() => {
        const classes = className?.split(' ') || [];
        container?.classList.add(...classes);

        return () => {
            container?.classList.remove(...classes);
        };
    }, [className, container]);

    // The container lives in the body, out of the DOM subtree of a DensityProvider, so it does not inherit the
    // density css vars. The attribute makes the density rules of ThemeContextProvider match the container too.
    // A layout effect sets it before the first paint of the children.
    useIsomorphicLayoutEffect(() => {
        if (!container || !density) {
            return;
        }
        container.setAttribute(DENSITY_ATTRIBUTE, density);

        return () => {
            container.removeAttribute(DENSITY_ATTRIBUTE);
        };
    }, [container, density]);

    return container && ReactDOM.createPortal(children, container);
};
