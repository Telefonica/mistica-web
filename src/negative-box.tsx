import * as React from 'react';
import {createUseStyles} from './jss';

const useStyles = createUseStyles(() => ({
    negativeBox: {
        marginLeft: ({marginLeft}) => marginLeft,
        marginRight: ({marginRight}) => marginRight,
    },
}));

type Props = {
    children: React.ReactNode;
    right?: boolean;
    left?: boolean;
};

const NegativeBox: React.FC<Props> = ({left, right, children}) => {
    const marginLeft = left || (!left && !right) ? -16 : undefined;
    const marginRight = right || (!left && !right) ? -16 : undefined;
    const classes = useStyles({marginLeft, marginRight});
    return <div className={classes.negativeBox}>{children}</div>;
};

export default NegativeBox;
