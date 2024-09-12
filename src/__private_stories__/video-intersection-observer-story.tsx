import * as React from 'react';
import beachVideo from '../__stories__/videos/beach.mp4';
import beachImg from '../__stories__/images/beach.jpg';
import Video from '../video';
import {useIsInViewport} from '../hooks';
import Stack from '../stack';
import {Title3} from '../title';
import {Text3} from '../text';
import {vars} from '../skins/skin-contract.css';

import type {VideoElement} from '../video';

export default {
    title: 'Private/Video with intersection observer',
};

const VIDEO_SRC = beachVideo;
const POSTER_SRC = beachImg;

export const Default: StoryComponent = () => {
    const videoRef = React.useRef<VideoElement>(null);
    const inViewport = useIsInViewport(videoRef, false, {threshold: 0.5});

    React.useEffect(() => {
        if (inViewport) videoRef.current?.play();
        else videoRef.current?.load();
    }, [inViewport]);

    return (
        <Stack space={16}>
            <Stack space={8}>
                <Title3>Video component with intersection observer</Title3>
                <Text3 regular as="p">
                    As you scroll down, the video should start playing automatically as soon as 50% of its
                    height becomes visible in the viewport. When 50% of the video leaves the viewport, the
                    poster should be displayed instead.
                </Text3>
            </Stack>
            <div style={{paddingBottom: 1000, paddingTop: 1000, border: `1px solid ${vars.colors.border}`}}>
                <Video autoPlay={inViewport} src={VIDEO_SRC} poster={POSTER_SRC} ref={videoRef} />
            </div>
        </Stack>
    );
};
Default.storyName = 'Video with intersection observer';
