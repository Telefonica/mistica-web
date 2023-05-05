import * as React from 'react';
import Image, {useMediaBorderRadius} from './image';
import {AspectRatioElement} from './utils/aspect-ratio-support';
import {combineRefs} from './utils/common';
import {getPrefixedDataAttributes} from './utils/dom';
import {isRunningAcceptanceTest} from './utils/platform';
import * as styles from './video.css';
import {vars} from './skins/skin-contract.css';

import type {DataAttributes} from './utils/types';

type VideoState = 'loading' | 'loaded' | 'playing' | 'paused' | 'error';

type VideoAction = 'play' | 'finishLoad' | 'pause' | 'fail' | 'reset';

const transitions: Record<VideoState, Partial<Record<VideoAction, VideoState>>> = {
    loading: {
        play: 'playing',
        pause: 'paused',
        fail: 'error',
        finishLoad: 'loaded',
    },

    loaded: {
        play: 'playing',
        pause: 'paused',
        reset: 'loading',
    },

    playing: {
        pause: 'paused',
        reset: 'loading',
    },

    paused: {
        play: 'playing',
        reset: 'loading',
    },

    error: {
        reset: 'loading',
    },
};

const videoReducer = (state: VideoState, action: VideoAction): VideoState =>
    transitions[state][action] || state;

export type AspectRatio = '1:1' | '16:9' | '4:3';

export const RATIO = {
    '1:1': 1,
    '16:9': 16 / 9,
    '4:3': 4 / 3,
};

type VideoSourceWithType = {
    src: string;
    mimeType?: `video/${string}`; // video/webm, video/mp4...
};

export type VideoSource =
    | string
    | ReadonlyArray<string>
    | VideoSourceWithType
    | ReadonlyArray<VideoSourceWithType>;

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
    src: VideoSource;
    /** defaults to true */
    loop?: boolean;
    /** defaults to true */
    muted?: boolean;
    /** defaults to true */
    autoPlay?: boolean | 'streaming' | 'when-loaded';
    /** defaults to 10s */
    loadingTimeout?: number;
    onError?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    poster?: string;
    children?: void;
    /** defaults to auto */
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
            preload = 'auto',
            loadingTimeout = 10000,
            onError,
            onPause,
            onPlay,
            aspectRatio = '1:1',
            dataAttributes,
            ...props
        },
        ref
    ) => {
        const borderRadiusContext = useMediaBorderRadius();
        const [isLoadComplete, setIsLoadComplete] = React.useState(false);

        const [videoStatus, dispatch] = React.useReducer(videoReducer, 'loading');
        const [currentVideoStatus, setCurrentVideoStatus] = React.useState<VideoState>('loading');

        const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];

        const videoRef = React.useRef<HTMLVideoElement | null>(null);

        React.useEffect(() => {
            if (videoStatus !== currentVideoStatus) {
                setCurrentVideoStatus(videoStatus);
                if (videoStatus === 'playing' && onPlay) onPlay();
                if (videoStatus === 'paused' && onPause) onPause();
                if (videoStatus === 'error' && onError) onError();
            }
        }, [videoStatus, currentVideoStatus, onPlay, onPause, onError]);

        React.useEffect(() => {
            const loadingTimeoutId = setTimeout(() => dispatch('fail'), loadingTimeout);
            setIsLoadComplete(false);
            dispatch('reset');
            videoRef.current?.load();

            return () => {
                clearTimeout(loadingTimeoutId);
            };
        }, [src, loadingTimeout]);

        React.useEffect(() => {
            const video = videoRef.current;
            const shouldAutoPlay = autoPlay && !isRunningAcceptanceTest();

            if (isLoadComplete) {
                dispatch('finishLoad');
                if (video && shouldAutoPlay && video.paused) {
                    video.play();
                }
            }
        }, [isLoadComplete, autoPlay]);

        // normalize sources
        const sources: Array<VideoSourceWithType> = (Array.isArray(src) ? src : [src]).map((source) => {
            if (typeof source === 'string') {
                return {src: source};
            } else {
                return source;
            }
        });

        const video = (
            <video
                ref={combineRefs(ref, videoRef)}
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                autoPlay={autoPlay === 'streaming'}
                muted={muted}
                loop={loop}
                className={styles.video}
                preload={preload}
                onError={() => dispatch('fail')}
                onPause={() => dispatch('pause')}
                onPlay={() => dispatch('play')}
                onLoadStart={() => setIsLoadComplete(false)}
                onCanPlay={() => {
                    if (autoPlay === 'streaming') setIsLoadComplete(true);
                }}
                onCanPlayThrough={() => setIsLoadComplete(true)}
                // This transparent pixel fallback avoids showing the ugly "play" image in android webviews
                poster={TRANSPARENT_PIXEL}
                {...getPrefixedDataAttributes(dataAttributes)}
                style={{
                    // For some reason adding this style with classnames doesn't add the border radius in safari
                    borderRadius: !borderRadiusContext ? 0 : vars.borderRadii.container,
                }}
            >
                {sources.map(({src, mimeType}, index) => (
                    <source key={index} src={src} type={mimeType} />
                ))}
            </video>
        );

        const posterElement = (
            <Image
                aspectRatio={aspectRatio}
                width={props.width}
                height={props.height}
                src={poster ?? '//:0'}
            />
        );

        const videoElement =
            ratio || props.width || props.height ? (
                <AspectRatioElement aspectRatio={ratio} width={props.width} height={props.height}>
                    {video}
                </AspectRatioElement>
            ) : (
                video
            );

        const showPoster = videoStatus === 'error' || videoStatus === 'loading' || videoStatus === 'loaded';

        return (
            <>
                <div className={styles.videoContainer} style={{display: showPoster ? 'block' : 'none'}}>
                    {posterElement}
                </div>
                <div className={styles.videoContainer} style={{display: showPoster ? 'none' : 'block'}}>
                    {videoElement}
                </div>
            </>
        );
    }
);

export default Video;
