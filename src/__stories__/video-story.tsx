import * as React from 'react';
import {Stack, ButtonPrimary, Inline, Title2, Video, Title1} from '..';

export default {
    title: 'Components/Others/Video',
    component: Video,
};

const VIDEO_SRC = 'https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw';
const POSTER_SRC = 'https://i.imgur.com/Fu7RiuY.jpg';

export const Default: StoryComponent = () => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const videoRefWithPoster = React.useRef<HTMLVideoElement | null>(null);

    return (
        <Stack space={64} dataAttributes={{testid: 'video'}}>
            <Stack space={16}>
                <Video
                    ref={videoRef}
                    width="100%"
                    aspectRatio={0}
                    autoPlay={false}
                    src={VIDEO_SRC}
                    poster={POSTER_SRC}
                />
                <Inline space={16}>
                    <ButtonPrimary
                        small
                        onPress={() => {
                            if (videoRef.current) {
                                videoRef.current.currentTime = 0; // play from the beginning
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
                            videoRef.current?.load(); // to force showing the poster again
                        }}
                    >
                        Stop
                    </ButtonPrimary>
                </Inline>
            </Stack>

            {/* <Stack space={16}>
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
    */}
        </Stack>
    );
};

Default.storyName = 'Video';
