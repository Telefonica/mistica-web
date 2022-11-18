import * as React from 'react';
import classnames from 'classnames';
import {useScreenSize} from './hooks';
import {getPrefixedDataAttributes} from './utils/dom';
import ContainerTypeContext from './container-type-context';
import * as styles from './responsive-layout.css';

import type {DataAttributes} from './utils/types';

type Props = {
    children: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
    dataAttributes?: DataAttributes;
};

const ResponsiveLayout: React.FC<Props> = ({children, className, fullWidth, dataAttributes}) => {
    const {isMobile, isTablet} = useScreenSize();

    const containerType = isMobile ? 'mobile-column' : isTablet ? 'tablet-column' : 'desktop-wide-column';

    return (
        <ContainerTypeContext.Provider value={containerType}>
            <div
                className={classnames(styles.container, className)}
                {...getPrefixedDataAttributes(dataAttributes)}
            >
                <div className={fullWidth ? styles.fullWidth : styles.responsiveLayout}>{children}</div>
            </div>
        </ContainerTypeContext.Provider>
    );
};

export default ResponsiveLayout;
