'use client';
import lottie from 'lottie-web/build/player/lottie_light';
import * as React from 'react';

import type {
    AnimationConfigWithData,
    AnimationItem,
    AnimationDirection,
    AnimationSegment,
    RendererType,
    AnimationEventName,
} from 'lottie-web/build/player/lottie_light';
import type {Listener, LottieOptions, LottieRefCurrentProps, PartialListener} from '../types';

const useLottie = <T extends RendererType = 'svg'>(
    props: LottieOptions<T>,
    style?: React.CSSProperties
): {View: React.ReactElement} & LottieRefCurrentProps => {
    const {
        animationData,
        loop,
        autoplay,
        initialSegment,

        onComplete,
        onLoopComplete,
        onEnterFrame,
        onSegmentStart,
        onConfigReady,
        onDataReady,
        onDataFailed,
        onLoadedImages,
        onDOMLoaded,
        onDestroy,

        // Specified here to take them out from the 'rest'
        lottieRef,
        renderer,
        name,
        assetsPath,
        rendererSettings,

        // TODO: find a better way to extract the html props to avoid specifying
        //  all the props that we want to exclude (as you can see above)
        ...rest
    } = props;

    const [animationLoaded, setAnimationLoaded] = React.useState(false);
    const animationInstanceRef = React.useRef<AnimationItem>();
    const animationContainer = React.useRef<HTMLDivElement>(null);

    /*
          ======================================
              INTERACTION METHODS
          ======================================
       */

    /**
     * Play
     */
    const play = (): void => {
        animationInstanceRef.current?.play();
    };

    /**
     * Stop
     */
    const stop = (): void => {
        animationInstanceRef.current?.stop();
    };

    /**
     * Pause
     */
    const pause = (): void => {
        animationInstanceRef.current?.pause();
    };

    /**
     * Set animation speed
     * @param speed
     */
    const setSpeed = (speed: number): void => {
        animationInstanceRef.current?.setSpeed(speed);
    };

    /**
     * Got to frame and play
     * @param value
     * @param isFrame
     */
    const goToAndPlay = (value: number, isFrame?: boolean): void => {
        animationInstanceRef.current?.goToAndPlay(value, isFrame);
    };

    /**
     * Got to frame and stop
     * @param value
     * @param isFrame
     */
    const goToAndStop = (value: number, isFrame?: boolean): void => {
        animationInstanceRef.current?.goToAndStop(value, isFrame);
    };

    /**
     * Set animation direction
     * @param direction
     */
    const setDirection = (direction: AnimationDirection): void => {
        animationInstanceRef.current?.setDirection(direction);
    };

    /**
     * Play animation segments
     * @param segments
     * @param forceFlag
     */
    const playSegments = (
        segments: AnimationSegment | Array<AnimationSegment>,
        forceFlag?: boolean
    ): void => {
        animationInstanceRef.current?.playSegments(segments, forceFlag);
    };

    /**
     * Set sub frames
     * @param useSubFrames
     */
    const setSubframe = (useSubFrames: boolean): void => {
        animationInstanceRef.current?.setSubframe(useSubFrames);
    };

    /**
     * Get animation duration
     * @param inFrames
     */
    const getDuration = (inFrames?: boolean): number | undefined =>
        animationInstanceRef.current?.getDuration(inFrames);

    /**
     * Destroy animation
     */
    const destroy = (): void => {
        animationInstanceRef.current?.destroy();

        // Removing the reference to the animation so separate cleanups are skipped.
        // Without it the internal `lottie-react` instance throws exceptions as it already cleared itself on destroy.
        animationInstanceRef.current = undefined;
    };

    /*
          ======================================
              LOTTIE
          ======================================
       */

    /**
     * Load a new animation, and if it's the case, destroy the previous one
     * @param {Object} forcedConfigs
     */
    const loadAnimation = (forcedConfigs = {}) => {
        // Return if the container ref is null
        if (!animationContainer.current) {
            return;
        }

        // Destroy any previous instance
        animationInstanceRef.current?.destroy();

        // Build the animation configuration
        const config: AnimationConfigWithData<T> = {
            ...props,
            ...forcedConfigs,
            container: animationContainer.current,
        };

        // Save the animation instance
        animationInstanceRef.current = lottie.loadAnimation(config);

        setAnimationLoaded(!!animationInstanceRef.current);

        // Return a function that will clean up
        return () => {
            animationInstanceRef.current?.destroy();
            animationInstanceRef.current = undefined;
        };
    };

    /**
     * (Re)Initialize when animation data changed
     */
    React.useEffect(() => {
        const onUnmount = loadAnimation();

        // Clean up on unmount
        return () => onUnmount?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationData, loop]);

    // Update the autoplay state
    React.useEffect(() => {
        if (!animationInstanceRef.current) {
            return;
        }

        animationInstanceRef.current.autoplay = !!autoplay;
    }, [autoplay]);

    // Update the initial segment state
    React.useEffect(() => {
        if (!animationInstanceRef.current) {
            return;
        }

        // When null should reset to default animation length
        if (!initialSegment) {
            animationInstanceRef.current.resetSegments(true);
            return;
        }

        // If it's not a valid segment, do nothing
        if (!Array.isArray(initialSegment) || !initialSegment.length) {
            return;
        }

        // If the current position it's not in the new segment
        // set the current position to start
        if (
            animationInstanceRef.current.currentRawFrame < initialSegment[0] ||
            animationInstanceRef.current.currentRawFrame > initialSegment[1]
        ) {
            animationInstanceRef.current.currentRawFrame = initialSegment[0];
        }

        // Update the segment
        animationInstanceRef.current.setSegment(initialSegment[0], initialSegment[1]);
    }, [initialSegment]);

    /*
          ======================================
              EVENTS
          ======================================
       */

    /**
     * Reinitialize listener on change
     */
    React.useEffect(() => {
        const partialListeners: Array<PartialListener> = [
            {name: 'complete', handler: onComplete},
            {name: 'loopComplete', handler: onLoopComplete},
            {name: 'enterFrame', handler: onEnterFrame},
            {name: 'segmentStart', handler: onSegmentStart},
            {name: 'config_ready', handler: onConfigReady},
            {name: 'data_ready', handler: onDataReady},
            {name: 'data_failed', handler: onDataFailed},
            {name: 'loaded_images', handler: onLoadedImages},
            {name: 'DOMLoaded', handler: onDOMLoaded},
            {name: 'destroy', handler: onDestroy},
        ];

        const listeners = partialListeners.filter(
            (listener: PartialListener): listener is Listener => listener.handler !== null
        );

        if (!listeners.length) {
            return;
        }

        const deregisterList = listeners.map((listener: Listener) => {
            // In Mistica we only use these two events. If we try to add the event listener for all the other
            // events from the listeners array, some runtime errors appear (and TS complains about wrong types).
            const misticaAnimationEvents: Array<AnimationEventName> = ['complete', 'loopComplete'];

            if (misticaAnimationEvents.some((value) => listener.name === value)) {
                animationInstanceRef.current?.addEventListener(listener.name, listener.handler);
            }

            // Return a function to deregister this listener
            return () => {
                if (misticaAnimationEvents.some((value) => listener.name === value)) {
                    animationInstanceRef.current?.removeEventListener(listener.name, listener.handler);
                }
            };
        });

        // Deregister listeners on unmount
        return () => {
            deregisterList.forEach((deregister) => deregister());
        };
    }, [
        onComplete,
        onLoopComplete,
        onEnterFrame,
        onSegmentStart,
        onConfigReady,
        onDataReady,
        onDataFailed,
        onLoadedImages,
        onDOMLoaded,
        onDestroy,
    ]);

    /**
     * Build the animation view
     */
    const View = <div style={style} ref={animationContainer} {...rest} />;

    return {
        View,
        play,
        stop,
        pause,
        setSpeed,
        goToAndStop,
        goToAndPlay,
        setDirection,
        playSegments,
        setSubframe,
        getDuration,
        destroy,
        animationContainerRef: animationContainer,
        animationLoaded,
        animationItem: animationInstanceRef.current,
    };
};

export default useLottie;