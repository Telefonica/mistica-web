import * as React from 'react';

import {createUseStyles} from './jss';

const useStyles = createUseStyles(() => ({
    image: {
        borderRadius: 4,
        display: 'block',
        objectFit: 'cover',
    },
}));

type AspectRatio = '1:1' | '16:9' | '7:10';

const RATIO = {
    '1:1': 1,
    '16:9': 16 / 9,
    '7:10': 7 / 10,
};

type Props =
    | {
          url: string;
          width: number;
          height?: undefined;
          /** defaults to 1:1 */
          aspectRatio?: AspectRatio;
          children?: void;
      }
    | {
          url: string;
          width?: undefined;
          height: number;
          /** defaults to 1:1 */
          aspectRatio?: AspectRatio;
          children?: void;
      };

const Image: React.FC<Props> = ({url, aspectRatio = '1:1', ...props}) => {
    const classes = useStyles();
    let width = props.width;
    let height = props.height;

    if (props.width !== undefined) {
        height = props.width / RATIO[aspectRatio];
    } else {
        width = props.height * RATIO[aspectRatio];
    }

    return <img src={url} className={classes.image} width={width} height={height} />;
};

export default Image;
