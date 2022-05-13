import * as React from 'react';
import {useIsomorphicLayoutEffect} from '../hooks';

const AspectRatioSupport = React.createContext<boolean>(true);

type Props = {
    children: React.ReactNode;
};

export const AspectRatioSupportProvider: React.FC<Props> = ({children}) => {
    // In SSR (and in first client side render) we assume the browser will support it
    const [isSupported, setIsSupported] = React.useState(true);

    useIsomorphicLayoutEffect(() => {
        try {
            if (!CSS.supports('aspect-ratio', '1 / 1')) {
                setIsSupported(false);
            }
        } catch (e) {
            // CSS.support is not available in old browsers, in that case we asume aspect-ratio is not supported
            setIsSupported(false);
        }
    }, []);

    return <AspectRatioSupport.Provider value={isSupported}>{children}</AspectRatioSupport.Provider>;
};

export const useSupportsAspectRatio = (): boolean => React.useContext(AspectRatioSupport);
