import * as React from 'react';
import ReactDOM from 'react-dom';

/**
 * @deprecated - to be removed in next major
 */
type PortalNodesContext = {
    portalNodes: Array<HTMLDivElement>;
    setPortalNodes: (
        nodes: Array<HTMLDivElement> | ((prevNodes: Array<HTMLDivElement>) => Array<HTMLDivElement>)
    ) => void;
};

/**
 * @deprecated - to be removed in next major
 */
const PortalNodes = React.createContext<PortalNodesContext>({
    portalNodes: [],
    setPortalNodes: () => {},
});

/**
 * @deprecated - to be removed in next major
 */
export const PortalNodesProvider: React.FC = ({children}) => {
    const [portalNodes, setPortalNodes] = React.useState<Array<HTMLDivElement>>([]);
    return (
        <PortalNodes.Provider
            value={{
                portalNodes,
                setPortalNodes,
            }}
        >
            {children}
        </PortalNodes.Provider>
    );
};

/**
 * @deprecated - to be removed in next major
 */
export const usePortalNodes = (): PortalNodesContext => React.useContext(PortalNodes);

/**
 * This component renders the children elements outside the parent component.
 *
 * This is useful for components that need position fixed, for example
 * for menus, alerts, overlays, etc.
 *
<<<<<<< HEAD
 * see https://reactjs.org/docs/portals.html
=======
 * See https://reactjs.org/docs/portals.html
>>>>>>> origin/master
 */

type Props = {
    children: React.ReactNode;
    className?: string;
};

export const Portal: React.FC<Props> = ({children, className}) => {
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
    const {setPortalNodes} = usePortalNodes();

    React.useEffect(() => {
        if (!container) {
            const newContainer = document.createElement('div');
            setContainer(newContainer);
            setPortalNodes((nodes) => [...nodes, newContainer]);
            document.body.appendChild(newContainer);
        }

        return () => {
            if (container) {
                setPortalNodes((nodes) => nodes.filter((node) => node !== container));
                document.body.removeChild(container);
            }
        };
    }, [container, setPortalNodes]);

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
