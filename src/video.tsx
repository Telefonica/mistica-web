import * as React from 'react';
import {useDisableBorderRadius} from './image';
import {createUseStyles} from './jss';
import {combineRefs} from './utils/common';

const useStyles = createUseStyles(() => ({
    video: {
        borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 4),
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

type VideoSource = {
    src: string;
    type?: string; // video/webm, video/mp4...
};

export type VideoProps = {
    /** defaults to 100% */
    width?: number | string;
    height?: number | string;
    /** accepts multiple sources */
    src: string | Array<string> | VideoSource | Array<VideoSource>;
    /** defaults to true */
    loop?: boolean;
    /** defaults to true */
    muted?: boolean;
    /** defaults to true */
    autoPlay?: boolean;
    poster?: string;
    children?: void;
};

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
    ({width = '100%', height, src, poster, autoPlay = true, muted = true, loop = true}, ref) => {
        const noBorderRadius = useDisableBorderRadius();
        const classes = useStyles({noBorderRadius});
        const videoRef = React.useRef<HTMLVideoElement | null>(null);

        React.useEffect(() => {
            if (autoPlay && !videoRef.current?.paused) {
                videoRef.current?.play();
            }
        }, [autoPlay]);

        // normalize sources
        const sources: Array<VideoSource> = (Array.isArray(src) ? src : [src]).map((source) => {
            if (typeof source === 'string') {
                return {src: source};
            } else {
                return source;
            }
        });

        return (
            <video
                ref={combineRefs(ref, videoRef)}
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                width={width}
                height={height}
                poster={poster}
                className={classes.video}
            >
                {sources.map(({src, type}, index) => (
                    <source key={index} src={src} type={type} />
                ))}
            </video>
        );
    }
);

export default Video;
