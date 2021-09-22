import * as React from 'react';

export const TopDistanceContext: React.Context<number> = React.createContext(0);

export const useTopDistance = (): number => React.useContext(TopDistanceContext);

type Props = {
    children: (topDistance: number) => React.ReactNode;
    // The height of the element to be positioned fixed to top
    height: number;
};

const FixedToTop: React.FC<Props> = ({children, height}) => {
    const top = React.useContext(TopDistanceContext);
    return <TopDistanceContext.Provider value={top + height}>{children(top)}</TopDistanceContext.Provider>;
};

export default FixedToTop;
