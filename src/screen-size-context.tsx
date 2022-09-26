import * as React from 'react';

export type ScreenSizeContextType = {
    isMobile: boolean;
    isTablet: boolean;
    isTabletOrBigger: boolean;
    isTabletOrSmaller: boolean;
    isDesktopOrBigger: boolean;
    isLargueDesktop: boolean;
};

const ScreenSizeContext = React.createContext<ScreenSizeContextType>({
    isMobile: false,
    isTablet: false,
    isTabletOrBigger: false,
    isTabletOrSmaller: false,
    isDesktopOrBigger: false,
    isLargueDesktop: false,
});

export default ScreenSizeContext;
