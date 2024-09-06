import type * as React from 'react';
import type {
    AnimationConfigWithData,
    AnimationDirection,
    AnimationEventCallback,
    AnimationEventName,
    AnimationItem,
    AnimationSegment,
    RendererType,
} from 'lottie-web/build/player/lottie_light';

export type LottieRefCurrentProps = {
    play: () => void;
    stop: () => void;
    pause: () => void;
    setSpeed: (speed: number) => void;
    goToAndStop: (value: number, isFrame?: boolean) => void;
    goToAndPlay: (value: number, isFrame?: boolean) => void;
    setDirection: (direction: AnimationDirection) => void;
    playSegments: (segments: AnimationSegment | Array<AnimationSegment>, forceFlag?: boolean) => void;
    setSubframe: (useSubFrames: boolean) => void;
    getDuration: (inFrames?: boolean) => number | undefined;
    destroy: () => void;
    animationContainerRef: React.RefObject<HTMLDivElement>;
    animationLoaded: boolean;
    animationItem: AnimationItem | undefined;
};

export type LottieRef = React.MutableRefObject<LottieRefCurrentProps | null>;

export type LottieOptions<T extends RendererType = 'svg'> = Omit<
    AnimationConfigWithData<T>,
    'container' | 'animationData'
> & {
    animationData: unknown;
    lottieRef?: LottieRef;
    onComplete?: React.AnimationEventHandler | null;
    onLoopComplete?: React.AnimationEventHandler | null;
    onEnterFrame?: React.AnimationEventHandler | null;
    onSegmentStart?: React.AnimationEventHandler | null;
    onConfigReady?: React.AnimationEventHandler | null;
    onDataReady?: React.AnimationEventHandler | null;
    onDataFailed?: React.AnimationEventHandler | null;
    onLoadedImages?: React.AnimationEventHandler | null;
    onDOMLoaded?: React.AnimationEventHandler | null;
    onDestroy?: React.AnimationEventHandler | null;
} & Omit<React.HTMLProps<HTMLDivElement>, 'loop'>;

export type PartialLottieOptions = Omit<LottieOptions, 'animationData'> & {
    animationData?: LottieOptions['animationData'];
};

// Interactivity
export type Axis = 'x' | 'y';
export type Position = {[key in Axis]: number | [number, number]};

export type Action = {
    type: 'seek' | 'play' | 'stop' | 'loop';
    frames: [number] | [number, number];
    visibility?: [number, number];
    position?: Position;
};

export type InteractivityProps = {
    lottieObj: {View: React.ReactElement} & LottieRefCurrentProps;
    actions: Array<Action>;
    mode: 'scroll' | 'cursor';
};

export type LottieComponentProps = LottieOptions & {
    interactivity?: Omit<InteractivityProps, 'lottieObj'>;
};

export type PartialLottieComponentProps = Omit<LottieComponentProps, 'animationData'> & {
    animationData?: LottieOptions['animationData'];
};

export type Listener = {
    name: AnimationEventName;
    handler: AnimationEventCallback;
};
export type PartialListener = Omit<Listener, 'handler'> & {
    handler?: Listener['handler'] | null;
};
