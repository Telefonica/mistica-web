'use client';
import * as React from 'react';

type OverMediaContextType = {
    isOverMedia: boolean;
};

const OverMediaContext = React.createContext<OverMediaContextType>({
    isOverMedia: false,
});

const OverMediaContextProvider = ({
    children,
    isOverMedia,
}: {
    children: React.ReactNode;
    isOverMedia: boolean;
}): JSX.Element => {
    return <OverMediaContext.Provider value={{isOverMedia}}>{children}</OverMediaContext.Provider>;
};

export const useOverMediaContext = (): OverMediaContextType => React.useContext(OverMediaContext);

export default OverMediaContextProvider;
