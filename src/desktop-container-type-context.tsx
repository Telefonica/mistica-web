import * as React from 'react';

export type DesktopContainerType = 'small' | 'medium' | 'large';

const DesktopContainerTypeContext = React.createContext<DesktopContainerType | null>(null);

export const useDesktopContainerType = (): DesktopContainerType | null =>
    React.useContext(DesktopContainerTypeContext);

export default DesktopContainerTypeContext;
