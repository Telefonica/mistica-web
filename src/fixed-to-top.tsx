// @flow
import * as React from 'react';

export const TopDistanceContext: React.Context<number> = React.createContext(0);

type Props = {
    children: (topDistance: number) => React.Node,
    // The height of the element to be positioned fixed to top
    height: number,
};

const FixedToTop = ({children, height}: Props): React.Node => {
    const top = React.useContext(TopDistanceContext);
    return <TopDistanceContext.Provider value={top + height}>{children(top)}</TopDistanceContext.Provider>;
};

export default FixedToTop;
