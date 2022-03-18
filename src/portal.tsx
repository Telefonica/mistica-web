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

export const Portal: React.FC<Props> = ({children, className}) => {
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!container) {
            const newContainer = document.createElement('div');
            setContainer(newContainer);
            document.body.appendChild(newContainer);
        }

        return () => {
            if (container) {
                document.body.removeChild(container);
            }
        };
    }, [container]);

    React.useEffect(() => {
        if (container && className) {
            container.classList.add(className);
        }

        return () => {
            if (container && className) {
                container.classList.remove(className);
            }
        };
    }, [className, container]);

    return container && ReactDOM.createPortal(children, container);
};
