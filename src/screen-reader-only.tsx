import * as React from 'react';
import * as styles from './screen-reader-only.css';

type Props = {children: React.ReactNode | string};

const ScreenReaderOnly: React.FC<Props> = ({children}) => {
    if (React.Children.count(children) === 1) {
        const element = React.Children.only(children);
        if (React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement, {
                className: element.props.className
                    ? element.props.className + ' ' + styles.screenReaderOnly
                    : styles.screenReaderOnly,
            });
        }
    }
    return <div className={styles.screenReaderOnly}>{children}</div>;
};

export default ScreenReaderOnly;
