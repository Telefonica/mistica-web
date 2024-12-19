'use client';
import * as React from 'react';
import ReactDOM from 'react-dom';

/**
 * This component renders the children elements outside the parent component.
 *
 * This is useful for components that need position fixed, for example
 * for menus, alerts, overlays, etc.
 *
 * See https://reactjs.org/docs/portals.html
 */

type Props = {
    children: React.ReactNode;
    className?: string;
};

export const Portal = ({children, className}: Props): JSX.Element | null => {
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

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

    return container && ReactDOM.createPortal(children, container);
};
