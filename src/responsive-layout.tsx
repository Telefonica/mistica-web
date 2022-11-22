import * as React from 'react';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './responsive-layout.css';

import type {DataAttributes} from './utils/types';

type Props = {
    children: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
    dataAttributes?: DataAttributes;
};

const ResponsiveLayout: React.FC<Props> = ({children, className, fullWidth, dataAttributes}) => {
    return (
        <div
            className={classnames(styles.container, className)}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <div className={fullWidth ? styles.fullWidth : styles.responsiveLayout}>{children}</div>
        </div>
    );
};

export default ResponsiveLayout;
