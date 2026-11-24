'use client';
import * as React from 'react';
import ReactDOM from 'react-dom';
import ThemeContext, {THEME_SCOPE_ATTRIBUTE, ThemeScopeContext} from './theme-context';
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
    const themeScope = React.useContext(ThemeScopeContext);

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

    if (!container) {
        return null;
    }

    // The container lives in the body, out of the element of a ThemeContextProvider with `as` and out of the DOM
    // subtree of a DensityProvider, so it does not inherit their css vars. The attributes make their rules match
    // the wrapper too. React writes them together with the children, before any layout effect of the children
    // can measure them. display: contents keeps the wrapper out of the layout of the container.
    return ReactDOM.createPortal(
        <div
            {...{[THEME_SCOPE_ATTRIBUTE]: themeScope ?? undefined, [DENSITY_ATTRIBUTE]: density}}
            style={{display: 'contents'}}
        >
            {children}
        </div>,
        container
    );
};
