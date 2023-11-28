'use client';
import * as React from 'react';

export type DesktopContainerType = 'small' | 'medium' | 'large';

const DesktopContainerTypeContext = React.createContext<DesktopContainerType | null>(null);

export const useDesktopContainerType = (): DesktopContainerType | null =>
    React.useContext(DesktopContainerTypeContext);

export default ({children, value}: {children: React.ReactNode; value: DesktopContainerType}): JSX.Element => {
    return (
        <DesktopContainerTypeContext.Provider value={value}>{children}</DesktopContainerTypeContext.Provider>
    );
};
