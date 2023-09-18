import * as React from 'react';
import {Stack, Video} from '..';
import beachImg from '../__stories__/images/beach.jpg';
import videoBeach from '../__stories__/videos/beach.mp4';
import videoChema from '../__stories__/videos/video-chema.mp4';

export default {
    title: 'Private/Example',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    return (
        <Stack space={24}>
            <Video src={{src: videoBeach, type: 'video/webm'}} width={640} height={360} />
            <Video src={{src: videoChema, type: 'video/webm'}} width={640} height={360} />
            <video playsInline autoPlay muted loop poster={beachImg} width={640} height={360}>
                <source src={videoChema} type="video/webm" />
                Your browser does not support the video tag.
            </video>

            <Video src={{src: videoChema, type: 'video/webm'}} width={640} height={360} poster={beachImg} />

            <Video src={{src: videoBeach, type: 'video/webm'}} width={640} height={360} />

            <video playsInline autoPlay muted loop poster={beachImg} width={640} height={360}>
                <source src={videoChema} type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </Stack>
    );
};

Default.storyName = 'Example';
