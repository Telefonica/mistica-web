import React from 'react';
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
    const rootElemRef = React.useRef(document.createElement('div'));
    React.useEffect(() => {
        const modalRoot = document.body;
        const divRef = rootElemRef.current;
        if (className) {
            divRef.classList.add(className);
        }

        modalRoot.appendChild(divRef);

        return () => {
            modalRoot.removeChild(divRef);
        };
    }, [className]);

    return ReactDOM.createPortal(children, rootElemRef.current);
};
export default Portal;
