import * as React from 'react';
import {createUseStyles} from '..';

const useStyles = createUseStyles(() => ({
    circle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ({backgroundColor}) => backgroundColor,
        backgroundImage: ({backgroundImage}) => `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: ({size}) => size,
        height: ({size}) => size,
        borderRadius: '50%',
    },
}));

type Props = {
    backgroundColor?: string;
    backgroundImage?: string;
    size?: number | string;
    children?: React.ReactElement<any>;
};

const Circle: React.FC<Props> = ({children, backgroundColor, backgroundImage, size}) => {
    const classes = useStyles({backgroundColor, backgroundImage, size});
    return <div className={classes.circle}>{children}</div>;
};

export default Circle;
