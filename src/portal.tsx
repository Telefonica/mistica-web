import * as React from 'react';
import ReactDOM from 'react-dom';

/**
 * This component renders the children elements outside the parent component.
 *
 * This is useful for components that need position fixed, for example
 * for menus, alerts, overlays, etc.
 *
 * @see https://reactjs.org/docs/portals.html
 */

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Portal: React.FC<Props> = ({children, className}) => {
    const rootElemRef: React.MutableRefObject<HTMLElement> = React.useRef(null as any);
    const isDOM = typeof document !== 'undefined';

    if (rootElemRef.current === null && isDOM) {
        rootElemRef.current = document.createElement('div');
    }

    React.useEffect(() => {
        const modalRoot = document.body;

        modalRoot.appendChild(rootElemRef.current);

        return () => {
            modalRoot.removeChild(rootElemRef.current);
        };
    }, []);

    React.useEffect(() => {
        const divContainer = rootElemRef.current;

        if (className) {
            divContainer.classList.add(className);
        }

        return () => {
            if (className) {
                divContainer.classList.remove(className);
            }
        };
    }, [className]);

    return isDOM ? ReactDOM.createPortal(children, rootElemRef.current) : null;
};
export default Portal;
