import * as React from 'react';
import {Stack, ButtonPrimary, Inline, Video, Text3, Title3} from '..';
import beachVideo from './videos/beach.mp4';
import subtitlesExampleEn from './videos/test-subtitles-en.vtt';
import subtitlesExampleEs from './videos/test-subtitles-es.vtt';
import beachImg from './images/beach.jpg';

import type {AspectRatio} from '../video';
import type {VideoElement} from '..';

const typeOptions = ['width and height', 'width and aspect ratio', 'full width'];

export default {
    title: 'Components/Primitives/Video',
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
const SUBTITLES_SRC_EN = subtitlesExampleEn;
const SUBTITLES_SRC_ES = subtitlesExampleEs;

type Args = {
    type: 'width and height' | 'width and aspect ratio' | 'full width';
    width: number;
    height: number;
    aspectRatio: string;
    autoPlay: boolean;
    poster: boolean;
    emptySource: boolean;
};

export const Default: StoryComponent<Args> = ({
    type,
    width,
    height,
    aspectRatio,
    autoPlay,
    poster,
    emptySource,
}) => {
    const [enSubtitlesVisible, setEnSubtitlesVisible] = React.useState(true);
    const [esSubtitlesVisible, setEsSubtitlesVisible] = React.useState(false);
    const videoRef = React.useRef<VideoElement>(null);

    const toggleSubtitles = (index: number) => {
        const next = index === 0 ? !enSubtitlesVisible : !esSubtitlesVisible;
        videoRef.current?.setTrackMode(index, next ? 'showing' : 'disabled');
        if (index === 0) {
            setEnSubtitlesVisible(next);
        } else {
            setEsSubtitlesVisible(next);
        }
    };

    const props = {
        width: type !== 'full width' ? width : undefined,
        height: type === 'width and height' ? height : undefined,
        aspectRatio:
            type !== 'width and height'
                ? aspectRatio === '0'
                    ? 0
                    : (aspectRatio.replace(' ', ':') as AspectRatio)
                : undefined,
        poster: poster ? POSTER_SRC : undefined,
        autoPlay,
        dataAttributes: {testid: 'video'},
    };

    const video = (
        <Video
            src={!emptySource ? VIDEO_SRC : ''}
            {...props}
            ref={videoRef}
            tracks={[
                {
                    src: SUBTITLES_SRC_EN,
                    kind: 'subtitles',
                    srcLang: 'en',
                    label: 'English',
                    default: true,
                },
                {
                    src: SUBTITLES_SRC_ES,
                    kind: 'subtitles',
                    srcLang: 'es',
                    label: 'Spanish',
                },
            ]}
        />
    );

    return (
        <Stack space={32}>
            <Stack space={8}>
                <Title3>Video component issues/limitations</Title3>
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
                            videoRef.current?.play();
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
                        Pause
                    </ButtonPrimary>
                    <ButtonPrimary
                        small
                        onPress={() => {
                            videoRef.current?.stop();
                        }}
                    >
                        Stop
                    </ButtonPrimary>
                    <ButtonPrimary small onPress={() => toggleSubtitles(0)}>
                        {enSubtitlesVisible ? 'Hide EN subtitles' : 'Show EN subtitles'}
                    </ButtonPrimary>
                    <ButtonPrimary small onPress={() => toggleSubtitles(1)}>
                        {esSubtitlesVisible ? 'Hide ES subtitles' : 'Show ES subtitles'}
                    </ButtonPrimary>
                </Inline>

                {video}
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
    poster: true,
    emptySource: false,
};
