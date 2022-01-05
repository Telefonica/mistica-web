import * as React from 'react';
import {createUseStyles} from './jss';

const useStyles = createUseStyles(() => ({
    image: {
        borderRadius: 4,
        display: 'block',
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

type AspectRatio = '1:1' | '16:9' | '7:10';

const RATIO = {
    '1:1': 1,
    '16:9': 16 / 9,
    '7:10': 7 / 10,
};

type Props = {
    url: string;
    width?: number;
    height?: number;
    /** defaults to 1:1 */
    aspectRatio?: AspectRatio;
    /** defaults to empty string */
    alt?: string;
    children?: void;
};

const Image: React.FC<Props> = ({url, aspectRatio = '1:1', alt = '', ...props}) => {
    const classes = useStyles();
    let width = props.width;
    let height = props.height;

    if (props.width !== undefined) {
        height = props.width / RATIO[aspectRatio];
    } else if (props.height !== undefined) {
        width = props.height * RATIO[aspectRatio];
    }

    return <img src={url} className={classes.image} alt={alt} width={width} height={height} />;
};

export default Image;
