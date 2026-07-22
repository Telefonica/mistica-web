import * as React from 'react';

export type ScreenSizeContextType = Readonly<{
    isMobile: boolean;
    isTablet: boolean;
    isTabletOrBigger: boolean;
    isTabletOrSmaller: boolean;
    isDesktopOrBigger: boolean;
    isLargeDesktop: boolean;
    isExtraLargeDesktop: boolean;
}>;

const ScreenSizeContext = React.createContext<ScreenSizeContextType>({
    isMobile: false,
    isTablet: false,
    isTabletOrBigger: false,
    isTabletOrSmaller: false,
    isDesktopOrBigger: false,
    isLargeDesktop: false,
    isExtraLargeDesktop: false,
});

export default ScreenSizeContext;
