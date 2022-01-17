import * as React from 'react';
import {useDisableBorderRadius, RATIO} from './image';
import {createUseStyles} from './jss';
import {combineRefs} from './utils/common';

import type {AspectRatio} from './image';

const useStyles = createUseStyles(() => ({
    video: {
        borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 4),
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover',
    },
}));

type VideoSource = {
    src: string;
    type?: string; // video/webm, video/mp4...
};

/** Transparent 1x1px PNG  */
const TRANSPARENT_PIXEL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC';

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
    /** defaults to none */
    preload?: 'none' | 'metadata' | 'auto';
};

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
    ({width, height, src, poster, autoPlay = true, muted = true, loop = true, preload = 'none'}, ref) => {
        const noBorderRadius = useDisableBorderRadius();
        const classes = useStyles({noBorderRadius});
        const videoRef = React.useRef<HTMLVideoElement | null>(null);

        React.useEffect(() => {
            const video = videoRef.current;
            if (video && autoPlay && video.paused) {
                video.play();
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
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                width={width}
                height={height}
                className={classes.video}
                preload={preload}
                // This transparent pixel fallback avoids showing the ugly "play" image in android webviews
                poster={poster || TRANSPARENT_PIXEL}
            >
                {sources.map(({src, type}, index) => (
                    <source key={index} src={src} type={type} />
                ))}
            </video>
        );
    }
);

export default Video;
