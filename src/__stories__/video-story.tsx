import * as React from 'react';
import {Stack, ButtonPrimary, Inline, Title2, Video, Title1, Text3} from '..';

export default {
    title: 'Components/Primitives/Video',
    component: Video,
};

const VIDEO_SRC =
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-a-beach-with-sea-waves-1087-large.mp4';
const POSTER_SRC =
    'https://mixkit.imgix.net/videos/preview/mixkit-aerial-shot-of-a-beach-with-sea-waves-1087-0.jpg?q=80&auto=format%2Ccompress';

export const Default: StoryComponent = () => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const videoRefWithPoster = React.useRef<HTMLVideoElement | null>(null);

    return (
        <Stack space={64} dataAttributes={{testid: 'video'}}>
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
                <Title2>Auto Play (default)</Title2>
                <Video width={480} height={480 / 2.4} src={VIDEO_SRC} poster={POSTER_SRC} />
            </Stack>

            <Stack space={16}>
                <Title2>Manual Play (without Poster)</Title2>
                <Video
                    width={480}
                    height={480 / 2.4}
                    ref={videoRef}
                    autoPlay={false}
                    src={{src: VIDEO_SRC, type: 'video/mp4'}}
                />
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
                </Inline>
            </Stack>

            <Stack space={16}>
                <Title2>Manual Play (with Poster)</Title2>
                <Video
                    poster={POSTER_SRC}
                    width={480}
                    height={480 / 2.4}
                    ref={videoRefWithPoster}
                    autoPlay={false}
                    src={{src: VIDEO_SRC, type: 'video/mp4'}}
                />
                <Inline space={16}>
                    <ButtonPrimary
                        small
                        onPress={() => {
                            if (videoRefWithPoster.current) {
                                videoRefWithPoster.current.currentTime = 0; // play from the beginning
                                videoRefWithPoster.current.play();
                            }
                        }}
                    >
                        Play
                    </ButtonPrimary>
                    <ButtonPrimary
                        small
                        onPress={() => {
                            videoRefWithPoster.current?.pause();
                            videoRefWithPoster.current?.load(); // to force showing the poster again
                        }}
                    >
                        Stop
                    </ButtonPrimary>
                </Inline>
            </Stack>

            <Stack space={16}>
                <Title2>Aspect ratio</Title2>
                <Title1>16:9</Title1>
                <Video src={VIDEO_SRC} poster={POSTER_SRC} width={480} aspectRatio="16:9" />
                <Title1>4:3</Title1>
                <Video src={VIDEO_SRC} poster={POSTER_SRC} width={480} aspectRatio="4:3" />
                <Title1>0 (keep original aspect ratio)</Title1>
                <Video src={VIDEO_SRC} poster={POSTER_SRC} width={480} aspectRatio={0} />
            </Stack>

            <Stack space={16}>
                <Title2>Aspect ratio width 100%</Title2>
                <Title1>16:9</Title1>
                <Video width="100%" src={VIDEO_SRC} poster={POSTER_SRC} aspectRatio="16:9" />
                <Title1>4:3</Title1>
                <Video width="100%" src={VIDEO_SRC} poster={POSTER_SRC} aspectRatio="4:3" />
                <Title1>0 (keep original aspect ratio)</Title1>
                <Video width="100%" src={VIDEO_SRC} poster={POSTER_SRC} aspectRatio={0} />
            </Stack>
        </Stack>
    );
};

Default.storyName = 'Video';
