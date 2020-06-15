import * as React from 'react';
import {createUseStyles} from './jss';

const useStyles = createUseStyles(() => ({
    screenReaderOnly: {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: 0,
        userSelect: 'none',
    },
}));

type Props = {children: React.ReactNode};

const ScreenReaderOnly: React.FC<Props> = ({children}) => {
    const classes = useStyles();
    if (React.Children.count(children) === 1) {
        const element = React.Children.only(children);
        if (React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement<any>, {
                className: element.props.className
                    ? element.props.className + ' ' + classes.screenReaderOnly
                    : classes.screenReaderOnly,
            });
        }
    }
    return <div className={classes.screenReaderOnly}>{children}</div>;
};

export default ScreenReaderOnly;
