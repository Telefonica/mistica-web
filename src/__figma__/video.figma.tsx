import React from 'react';
import Video from '../video';
import figma from '@figma/code-connect';

const videoProps = {
    loop: figma.boolean('Loop'),
    muted: figma.boolean('Muted'),
    autoPlay: figma.boolean('Autoplay'),
    // aspectRatio: figma.enum('Image Fill', {
    //     '16:9': '16:9',
    //     '1:1': '1:1',
    //     '4:3': '4:3',
    // }),
};

// Desktop
figma.connect(
    Video,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1801%3A4548',
    {
        props: videoProps,
        example: (props) => (
            <Video
                src="https://example.com/video.mp4"
                // aspectRatio={props.aspectRatio}
                loop={props.loop}
                muted={props.muted}
                autoPlay={props.autoPlay}
            />
        ),
    }
);

// Mobile
figma.connect(
    Video,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=2615%3A8435',
    {
        props: videoProps,
        example: (props) => (
            <Video
                src="https://example.com/video.mp4"
                // aspectRatio={props.aspectRatio}
                loop={props.loop}
                muted={props.muted}
                autoPlay={props.autoPlay}
            />
        ),
    }
);
