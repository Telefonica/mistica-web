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
    const rootElemRef: MutableRefObject<HTMLElement | null> = React.useRef(null);
    const [, setIsReady] = React.useState(false);

    React.useEffect(() => {
        const divRef = document.createElement('div');
        rootElemRef.current = divRef;
        const modalRoot = document.body;

        modalRoot.appendChild(divRef);
        setIsReady(true);

        return () => {
            modalRoot.removeChild(divRef);
        };
    }, []);

    React.useEffect(() => {
        const divRef = rootElemRef.current;
        if (divRef && className) {
            divRef.classList.add(className);
        }

        return () => {
            if (divRef && className) {
                divRef.classList.remove(className);
            }
        };
    }, [className]);

    return rootElemRef.current && ReactDOM.createPortal(children, rootElemRef.current);
};
export default Portal;
