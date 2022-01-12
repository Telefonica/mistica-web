import * as React from 'react';
import {createUseStyles} from './jss';

const useStyles = createUseStyles(() => ({
    video: {
        borderRadius: 4,
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

type Source = {
    type?: string; // video/webm, video/mp4, etc.
    src: string;
};

type Props = {
    width?: number | string;
    height?: number | string;
    /** accepts multiple sources */
    src: string | Array<string> | Source | Array<Source>;
    /** defaults to true */
    loop?: boolean;
    /** defaults to true */
    muted?: boolean;
    /** defaults to true */
    autoPlay?: boolean;
    fallbackImageUrl?: string;
    children?: void;
};

const Video: React.FC<Props> = ({
    width,
    height,
    fallbackImageUrl,
    autoPlay = true,
    muted = true,
    loop = true,
}) => {
    const classes = useStyles();
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (autoPlay) {
            videoRef.current?.play();
        }
    });

    return (
        <video
            ref={videoRef}
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            width={width}
            height={height}
            poster={fallbackImageUrl}
            className={classes.video}
        ></video>
    );
};

export default Video;
