import * as React from 'react';
import {Stack, ButtonPrimary, Inline, Title2, Video, Text3} from '..';
import beachVideo from './videos/beach.mp4';
import beachImg from './images/beach.jpg';

import type {AspectRatio} from '../video';
import type {VideoElement} from '..';

const typeOptions = ['width and height', 'width and aspect ratio', 'full width'];

export default {
    title: 'Components/Primitives/Video',
    component: Video,
    argTypes: {
        type: {
            options: typeOptions,
            control: {type: 'select'},
        },
        width: {
            control: {type: 'range', min: 200, max: 800, step: 10},
            if: {arg: 'type', neq: 'full width'},
        },
        height: {
            control: {type: 'range', min: 200, max: 800, step: 10},
            if: {arg: 'type', eq: 'width and height'},
        },
        aspectRatio: {
            options: ['1 1', '16 9', '4 3', '0'],
            control: {
                type: 'select',
                labels: {
                    '1 1': '1:1',
                    '16 9': '16:9',
                    '4 3': '4:3',
                },
            },
            if: {arg: 'type', neq: 'width and height'},
        },
    },
};

const VIDEO_SRC = beachVideo;
const POSTER_SRC = beachImg;

type Args = {
    type: 'width and height' | 'width and aspect ratio' | 'full width';
    width: number;
    height: number;
    aspectRatio: string;
    autoPlay: boolean;
    withPoster: boolean;
    withErrorFallback: boolean;
};

export const Default: StoryComponent<Args> = ({
    type,
    width,
    height,
    aspectRatio,
    autoPlay,
    withPoster,
    withErrorFallback,
}) => {
    const videoRef = React.useRef<VideoElement>(null);

    const props = {
        width: type !== 'full width' ? width : undefined,
        height: type === 'width and height' ? height : undefined,
        aspectRatio:
            type !== 'width and height'
                ? aspectRatio === '0'
                    ? 0
                    : (aspectRatio.replace(' ', ':') as AspectRatio)
                : undefined,
        poster: withPoster ? POSTER_SRC : undefined,
        autoPlay,
    };

    const video = <Video src={VIDEO_SRC} {...props} ref={videoRef} />;
    /**
     * using src="data:video/webm;" will always trigger an error and show the error fallback
     * https://stackoverflow.com/a/53665311
     * */
    const error = <Video src="data:video/webm;" {...props} />;

    return (
        <Stack space={32} dataAttributes={{testid: 'video'}}>
            <Stack space={8}>
                <Title2>Video component issues/limitations</Title2>
                <Text3 regular as="p">
                    1. Using automatic aspect ratio (`aspectRatio={0}`), if the poster and video have
                    different aspect ratios, the video size will resize when playing/stopping the video. This
                    is how the HTML `video` element works and happens in all browsers.
                </Text3>
                <Text3 regular as="p">
                    2. In Safari, with automatic aspect ratio. On the first video reproduction a strange
                    resize happens. After stoping and playing the same video, it works as expected.
                </Text3>
                <Text3 regular as="p">
                    To avoid these issues always try to use a specific aspect ratio or a fixed width and
                    height.
                </Text3>
            </Stack>

            <Stack space={16}>
                <Inline space={16}>
                    <ButtonPrimary
                        small
                        onPress={() => {
                            if (videoRef.current) {
                                videoRef.current.play();
                            }
                        }}
                    >
                        Play
                    </ButtonPrimary>
                    <ButtonPrimary
                        small
                        onPress={() => {
                            videoRef.current?.pause();
                        }}
                    >
                        Stop
                    </ButtonPrimary>
                </Inline>

                <div style={{display: withErrorFallback ? 'none' : 'block'}}>{video}</div>
                <div style={{display: withErrorFallback ? 'block' : 'none'}}>{error}</div>
            </Stack>
        </Stack>
    );
};

Default.storyName = 'Video';
Default.args = {
    type: 'width and height',
    width: 640,
    height: 420,
    aspectRatio: '1 1',
    autoPlay: true,
    withPoster: true,
    withErrorFallback: false,
};
