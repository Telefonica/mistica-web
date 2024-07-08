'use client';
import * as React from 'react';
import {ImageContent, ImageError} from './image';
import {AspectRatioContainer} from './utils/aspect-ratio-support';
import {isRunningAcceptanceTest} from './utils/platform';
import * as styles from './video.css';
import * as mediaStyles from './image.css';
import {getPrefixedDataAttributes} from './utils/dom';
import classNames from 'classnames';

import type {DataAttributes} from './utils/types';

type VideoState = 'loading' | 'loaded' | 'playing' | 'paused' | 'error' | 'stopped';

type VideoAction = 'play' | 'finishLoad' | 'pause' | 'fail' | 'reset' | 'stop';

const transitions: Record<VideoState, Partial<Record<VideoAction, VideoState>>> = {
    loading: {
        play: 'playing',
        pause: 'paused',
        fail: 'error',
        finishLoad: 'loaded',
    },

    /**
     * This state represents the scenario when video.load() finishes, but the video isn't played yet. Some browsers don't actually load
     * the video until someone plays it. In this case, we need to show the poster, because we may not have the first frame to display it.
     * https://stackoverflow.com/questions/10235919/the-canplay-canplaythrough-events-for-an-html5-video-are-not-called-on-firefox/26430919#26430919
     */
    loaded: {
        play: 'playing',
        pause: 'paused',
        reset: 'loading',
    },

    playing: {
        pause: 'paused',
        reset: 'loading',
        stop: 'stopped',
    },

    paused: {
        play: 'playing',
        reset: 'loading',
        stop: 'stopped',
    },

    error: {
        reset: 'loading',
    },

    stopped: {
        play: 'playing',
        reset: 'loading',
    },
};

const videoReducer = (state: VideoState, action: VideoAction): VideoState => {
    return transitions[state][action] || state;
};

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
    /** defaults to 0 (original video proportions). If both width and height are given, aspectRatio is ignored.  */
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
    /** Stops the video and shows the poster image (if available) */
    stop: () => void;
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
            aspectRatio = 0,
            dataAttributes,
            ...props
        },
        ref
    ) => {
        const [videoStatus, dispatch] = React.useReducer(videoReducer, 'loading');
        const videoRef = React.useRef<HTMLVideoElement>(null);
        const loadedSource = React.useRef<VideoSource>();
        const posterRef = React.useRef<HTMLDivElement>(null);

        const ratio =
            props.width && props.height
                ? undefined
                : typeof aspectRatio === 'number'
                  ? aspectRatio
                  : RATIO[aspectRatio];

        const handleError = React.useCallback(() => {
            if (videoStatus === 'loading') {
                dispatch('fail');
                onError?.();
            }
        }, [onError, videoStatus]);

        React.useEffect(() => {
            if (loadedSource.current !== src) {
                let loadingTimeoutId: NodeJS.Timeout;
                loadedSource.current = src;
                dispatch('reset');

                if (src) {
                    loadingTimeoutId = setTimeout(handleError, loadingTimeout);
                    videoRef.current?.load();
                } else {
                    dispatch('fail');
                }

                return () => {
                    clearTimeout(loadingTimeoutId);
                };
            }
        }, [src, loadingTimeout, handleError]);

        const handleLoadFinish = () => {
            onLoad?.();
            if (videoStatus === 'stopped') {
                // the video was intentionally stopped
                return;
            }
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

        const showPoster = ['error', 'loading', 'loaded', 'stopped'].includes(videoStatus);

        const video = (
            <video
                ref={videoRef}
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                muted={muted}
                loop={loop}
                className={classNames(styles.video, mediaStyles.defaultBorderRadius)}
                preload={preload}
                onError={handleError}
                onPause={() => {
                    onPause?.();
                    dispatch('pause');
                }}
                onTimeUpdate={() => {
                    // The state update is performed here instead of in "onPlay" to avoid flickering when hiding the poster
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
                style={{
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
                    <ImageError className={mediaStyles.defaultBorderRadius} withIcon={hasError} />
                </div>
            ) : undefined;
        }, [aspectRatio, props.height, props.width, hasError, poster, withErrorFallback]);

        return (
            <AspectRatioContainer
                style={{position: 'relative'}}
                aspectRatio={ratio}
                width={props.width}
                height={props.height}
                dataAttributes={getPrefixedDataAttributes(dataAttributes, 'Video')}
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
                            containerElement.play = () => {
                                // old browsers don't return a promise when calling play()
                                // see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play#browser_compatibility
                                return videoRef.current?.play() || Promise.resolve();
                            };
                            containerElement.pause = () => videoRef.current?.pause();
                            containerElement.load = () => {
                                /**
                                 * Hack to avoid a flash when hiding the video and showing the poster.
                                 *
                                 * The flash happens because dispatch('reset') triggers a re-render of the component,
                                 * but it may happen that the call video.load() is called before the re-render takes
                                 * place (for example, safari sometimes batches updates). In this scenario, the frames
                                 * of the video are cleared and a transparent background is shown for a few milliseconds
                                 * (before the poster's width/height are actually set to 100% in the re-render).
                                 *
                                 * To avoid this, we set the poster's styles beforehand and we wait some time before
                                 * triggering the re-render and calling video.load()
                                 */
                                if (posterRef.current?.style) {
                                    posterRef.current.style.width = '100%';
                                    posterRef.current.style.height = '100%';
                                }
                                setTimeout(() => {
                                    dispatch('reset');
                                    videoRef.current?.load();
                                }, 100);
                            };
                            containerElement.setCurrentTime = (time: number) => {
                                if (videoRef.current) {
                                    videoRef.current.currentTime = time;
                                }
                            };
                            containerElement.stop = () => {
                                if (videoRef.current) {
                                    videoRef.current.pause();
                                    videoRef.current.currentTime = 0;
                                    dispatch('stop');
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
                    ref={posterRef}
                    style={{
                        position: ratio !== 0 ? 'absolute' : 'static',
                        width: showPoster ? '100%' : 0,
                        height: showPoster ? '100%' : 0,
                        overflow: 'hidden',
                    }}
                >
                    {posterImage}
                </div>
            </AspectRatioContainer>
        );
    }
);

export default Video;
