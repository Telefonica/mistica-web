import * as React from 'react';
import {useScreenSize} from './hooks';

import type {ContainerType} from './utils/types';

const ContainerTypeContext = React.createContext<ContainerType | null>(null);

export const useContainerType = (): ContainerType => {
    const containerType = React.useContext(ContainerTypeContext);
    const {isTablet, isDesktopOrBigger, isLargeDesktop} = useScreenSize();

    if (containerType) {
        return containerType;
    }
    if (isLargeDesktop) {
        return 'desktop-wide-column';
    }
    if (isDesktopOrBigger) {
        return 'desktop-medium-column';
    }
    if (isTablet) {
        return 'tablet-column';
    }
    return 'mobile-column';
};

export default ContainerTypeContext;
