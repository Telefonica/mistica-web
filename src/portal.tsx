import * as React from 'react';
import ReactDOM from 'react-dom';

type PortalNodesContext = {
    portalNodes: Array<HTMLDivElement>;
    setPortalNodes: (
        nodes: Array<HTMLDivElement> | ((prevNodes: Array<HTMLDivElement>) => Array<HTMLDivElement>)
    ) => void;
};

const PortalNodes = React.createContext<PortalNodesContext>({
    portalNodes: [],
    setPortalNodes: () => {},
});

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

export const usePortalNodes = (): PortalNodesContext => React.useContext(PortalNodes);

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
