import * as React from 'react';
import * as styles from './screen-reader-only.css';
import {getPrefixedDataAttributes} from './utils/dom';
import classnames from 'classnames';

import type {DataAttributes} from './utils/types';

type Props = {
    children: React.ReactNode;
    className?: string;
    dataAttributes?: DataAttributes;
};

const ScreenReaderOnly = ({children, className, dataAttributes}: Props): JSX.Element => {
    const prefixedDataAttributes = getPrefixedDataAttributes(dataAttributes, 'ScreenReaderOnly');

    if (React.Children.count(children) === 1) {
        const element = React.Children.only(children);
        if (React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement, {
                className: classnames(element.props.className, styles.screenReaderOnly, className),
                ...prefixedDataAttributes,
            });
        }
    }
    return (
        <div className={classnames(styles.screenReaderOnly, className)} {...prefixedDataAttributes}>
            {children}
        </div>
    );
};

export default ScreenReaderOnly;
