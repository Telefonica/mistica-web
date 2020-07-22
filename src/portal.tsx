import React, {MutableRefObject} from 'react';
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
    const rootElemRef: MutableRefObject<HTMLElement> = React.useRef(null as any);

    React.useEffect(() => {
        const divRef = document.createElement('div');
        rootElemRef.current = divRef;
        const modalRoot = document.body;

        modalRoot.appendChild(divRef);

        return () => {
            modalRoot.removeChild(divRef);
        };
    }, []);

    React.useEffect(() => {
        const divRef = rootElemRef.current;
        if (className) {
            divRef.classList.add(className);
        }

        return () => {
            if (className) {
                divRef.classList.remove(className);
            }
        };
    }, [className]);

    return ReactDOM.createPortal(children, rootElemRef.current);
};
export default Portal;
