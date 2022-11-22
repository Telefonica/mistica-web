import * as React from 'react';

export type ContainerType = 'small' | 'medium' | 'large';

const DesktopContainerTypeContext = React.createContext<ContainerType | null>(null);

export const useDesktopContainerType = (): ContainerType | null =>
    React.useContext(DesktopContainerTypeContext);

export default DesktopContainerTypeContext;
