import * as React from 'react';
import {ImageContent, ImageError, useMediaBorderRadius} from './image';
import {AspectRatioElement} from './utils/aspect-ratio-support';
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
    type?: string; // video/webm, video/mp4...
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
    /** defaults to when-loaded. If set to true, behaviour is the same as when the value is equal to when-loaded */
    autoPlay?: boolean | 'streaming' | 'when-loaded';
    /** defaults to 10s */
    loadingTimeout?: number;
    onError?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onLoad?: () => void;
    poster?: string;
    children?: void;
    /** defaults to none */
    preload?: 'none' | 'metadata' | 'auto';
    dataAttributes?: DataAttributes;
};

export interface VideoElement extends HTMLDivElement {
    play: () => Promise<void>;
    pause: () => void;
    load: () => void;
    setCurrentTime: (time: number) => void;
}

const Video = React.forwardRef<VideoElement, VideoProps>(
    (
        {
            src,
            poster,
            autoPlay = 'when-loaded',
            muted = true,
            loop = true,
            preload = 'none',
            loadingTimeout = 10000,
            onLoad,
            onError,
            onPause,
            onPlay,
            aspectRatio = '1:1',
            dataAttributes,
            ...props
        },
        ref
    ) => {
        const [videoStatus, dispatch] = React.useReducer(videoReducer, 'loading');
        const videoRef = React.useRef<HTMLVideoElement | null>(null);
        const loadedSource = React.useRef<VideoSource>();

        const borderRadiusContext = useMediaBorderRadius();
        const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];

        const handleError = React.useCallback(() => {
            if (videoStatus === 'loading') {
                dispatch('fail');
                onError?.();
            }
        }, [onError, videoStatus]);

        React.useEffect(() => {
            if (loadedSource.current !== src) {
                loadedSource.current = src;
                const loadingTimeoutId = setTimeout(handleError, loadingTimeout);
                dispatch('reset');
                videoRef.current?.load();

                return () => {
                    clearTimeout(loadingTimeoutId);
                };
            }
        }, [src, loadingTimeout, handleError]);

        const handleLoadFinish = () => {
            onLoad?.();
            const video = videoRef.current;
            const shouldAutoPlay = autoPlay && !isRunningAcceptanceTest();

            dispatch('finishLoad');
            if (video && shouldAutoPlay && video.paused) {
                video.play();
            }
        };

        // normalize sources
        const sources: Array<VideoSourceWithType> = (Array.isArray(src) ? src : [src]).map((source) => {
            if (typeof source === 'string') {
                return {src: source};
            } else {
                return source;
            }
        });

        const showPoster = videoStatus === 'error' || videoStatus === 'loading' || videoStatus === 'loaded';

        const video = (
            <video
                ref={videoRef}
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                muted={muted}
                loop={loop}
                className={styles.video}
                preload={preload}
                onError={handleError}
                onPause={() => {
                    onPause?.();
                    dispatch('pause');
                }}
                onTimeUpdate={() => {
                    if (videoStatus !== 'playing' && videoRef.current?.currentTime !== 0) {
                        onPlay?.();
                        dispatch('play');
                    }
                }}
                onCanPlay={() => {
                    if (autoPlay === 'streaming') handleLoadFinish();
                }}
                onCanPlayThrough={() => {
                    if (autoPlay !== 'streaming') handleLoadFinish();
                }}
                // This transparent pixel fallback avoids showing the ugly "play" image in android webviews
                poster={TRANSPARENT_PIXEL}
                {...getPrefixedDataAttributes(dataAttributes)}
                style={{
                    // For some reason adding this style with classnames doesn't add the border radius in safari
                    borderRadius: !borderRadiusContext ? 0 : vars.borderRadii.container,
                    visibility: showPoster ? 'hidden' : 'visible',
                    position: showPoster || ratio !== 0 ? 'absolute' : 'static',
                    width: '100%',
                    height: '100%',
                }}
            >
                {sources.map(({src, type}, index) => (
                    <source key={index} src={src} type={type} />
                ))}
            </video>
        );

        const withErrorFallback = !!(ratio !== 0 || (props.width && props.height));
        const hasError = videoStatus === 'error';

        const posterImage = React.useMemo(() => {
            return poster ? (
                <ImageContent
                    aspectRatio={aspectRatio}
                    width={props.width}
                    height={props.height}
                    src={poster}
                />
            ) : withErrorFallback ? (
                <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                    <ImageError noBorderRadius={!borderRadiusContext} withIcon={hasError} />
                </div>
            ) : undefined;
        }, [
            aspectRatio,
            props.height,
            props.width,
            borderRadiusContext,
            hasError,
            poster,
            withErrorFallback,
        ]);

        return (
            <AspectRatioElement
                style={{position: 'relative'}}
                aspectRatio={ratio}
                width={props.width}
                height={props.height}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                    /**
                     * The component forwards this ref instead of the video's one, because sometimes the video
                     * is hidden (when poster is displayed), which may cause problems if its ref is used by an
                     * intersection observer (or any logic that depends on visibility of the video)
                     */
                    ref={(element) => {
                        const containerElement = element ? (element as VideoElement) : null;

                        if (containerElement) {
                            containerElement.play = () => videoRef.current?.play() || Promise.resolve();
                            containerElement.pause = () => videoRef.current?.pause();
                            containerElement.load = () => {
                                dispatch('reset');
                                videoRef.current?.load();
                            };
                            containerElement.setCurrentTime = (time: number) => {
                                if (videoRef.current) {
                                    videoRef.current.currentTime = time;
                                }
                            };
                        }

                        if (typeof ref === 'function') {
                            ref(containerElement);
                        } else if (ref) {
                            ref.current = containerElement;
                        }
                    }}
                />
                {video}
                <div
                    style={{
                        position: ratio !== 0 ? 'absolute' : 'static',
                        width: showPoster ? '100%' : 0,
                        height: showPoster ? '100%' : 0,
                        overflow: 'hidden',
                    }}
                >
                    {posterImage}
                </div>
            </AspectRatioElement>
        );
    }
);

export default Video;
