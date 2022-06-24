import * as React from 'react';
import {useDisableBorderRadius} from './image';
import {createUseStyles} from './jss';
import {useSupportsAspectRatio} from './utils/aspect-ratio-support';
import {combineRefs} from './utils/common';
import {getPrefixedDataAttributes} from './utils/dom';
import {isRunningAcceptanceTest, isSafari} from './utils/platform';

import type {DataAttributes} from './utils/types';

export type AspectRatio = '1:1' | '16:9' | '12:5' | '4:3';

export const RATIO = {
    '1:1': 1,
    '16:9': 16 / 9,
    '12:5': 12 / 5,
    '4:3': 4 / 3,
};

const useStyles = createUseStyles(() => ({
    video: {
        background: 'transparent',
        display: 'block',
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: '100%',
        '@supports (aspect-ratio: 1 / 1)': {
            aspectRatio: ({aspectRatio}) => aspectRatio ?? 'unset',
        },
        '$wrapper &': {
            borderRadius: 0, // the wrapper sets the border radius
            position: ({aspectRatio}) =>
                // when aspectRatio is 0, we want the video to use the original aspect ratio
                aspectRatio ? 'absolute' : 'static',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
        },
    },
    wrapper: {
        overflow: 'hidden',
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'relative',
        paddingTop: ({aspectRatio, width}) => {
            if (!aspectRatio) {
                return 0;
            }
            if (width && typeof width === 'string' && width.endsWith('%')) {
                return `${Number(width.replace('%', '')) / aspectRatio}%`;
            }
            return `${100 / aspectRatio}%`;
        },
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
    /** defaults to 100% when no width and no height are given */
    width?: string | number;
    height?: string | number;
    /** defaults to 1:1, if both width and height are given, aspectRatio is ignored. To use original video proportions, set aspectRatio to 0 */
    aspectRatio?: AspectRatio | number;
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
    dataAttributes?: DataAttributes;
};

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
    (
        {
            src,
            poster,
            autoPlay = !isRunningAcceptanceTest(), // default true, but disable autoPlay in screenshot tests
            muted = true,
            loop = true,
            preload = 'none',
            aspectRatio = '1:1',
            dataAttributes,
            ...props
        },
        ref
    ) => {
        const supportsAspectRatio = useSupportsAspectRatio();
        const noBorderRadius = useDisableBorderRadius();

        const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];
        // if width or height are numeric, we can calculate the other with the ratio without css
        // if aspect ratio is 0, we use the original video proportions
        const withCssAspectRatio =
            typeof props.width !== 'number' && typeof props.height !== 'number' && ratio !== 0;

        const classes = useStyles({
            aspectRatio: withCssAspectRatio ? ratio : undefined,
            width: props.width,
        });
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

        let width: number | string | undefined = props.width;
        let height = props.height;

        if (props.width !== undefined && props.height !== undefined) {
            width = props.width;
            height = props.height;
        } else if (typeof props.width === 'number') {
            height = ratio ? props.width / ratio : undefined;
        } else if (typeof props.height === 'number') {
            width = ratio ? props.height * ratio : undefined;
        } else {
            width = props.width || '100%';
        }

        /**
         * In safari, when using a video with poster, the transition from pause to play does a flicker,
         * To avoid this, in Safari browsers, instead of using the poster attribute, we use a
         * wrapper with the poster as background image
         */
        const needsWrapper = true || isSafari() || (withCssAspectRatio && !supportsAspectRatio);

        const video = (
            <video
                ref={combineRefs(ref, videoRef)}
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                {...(needsWrapper ? {width: '100%'} : {width, height})}
                className={classes.video}
                preload={preload}
                // This transparent pixel fallback avoids showing the ugly "play" image in android webviews
                poster={poster || TRANSPARENT_PIXEL}
                {...getPrefixedDataAttributes(dataAttributes)}
                style={{
                    // For some reason adding this style with JSS doesn't add the border radius in safari
                    borderRadius: noBorderRadius ? 0 : 4,
                }}
            >
                {sources.map(({src, type}, index) => (
                    <source key={index} src={src} type={type} />
                ))}
            </video>
        );
        if (needsWrapper) {
            return (
                <div
                    style={{
                        width,
                        height,
                        // adding the poster as background image avoids the flicker in Safari
                        backgroundImage: poster ? `url("${poster}")` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: '50% 50%',
                        borderRadius: noBorderRadius ? 0 : 4,
                    }}
                    className={classes.wrapper}
                >
                    {video}
                </div>
            );
        } else {
            return video;
        }
    }
);

export default Video;
