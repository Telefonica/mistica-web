import * as React from 'react';
import * as styles from './screen-reader-only.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type Props = {
    children: React.ReactNode;
    dataAttributes?: DataAttributes;
};

const ScreenReaderOnly: React.FC<Props> = ({children, dataAttributes}) => {
    if (React.Children.count(children) === 1) {
        const element = React.Children.only(children);
        if (React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement, {
                className: element.props.className
                    ? element.props.className + ' ' + styles.screenReaderOnly
                    : styles.screenReaderOnly,
                ...getPrefixedDataAttributes(dataAttributes),
            });
        }
    }
    return (
        <div className={styles.screenReaderOnly} {...getPrefixedDataAttributes(dataAttributes)}>
            {children}
        </div>
    );
};

export default ScreenReaderOnly;
