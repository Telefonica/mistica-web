// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=2615-8435
// source=src/video.tsx
// component=Video
import figma from 'figma';

const instance = figma.selectedInstance;

// "Loop" / "Muted" / "Autoplay" are BOOLEANs mapping onto the boolean code props.
const loop = instance.getBoolean('Loop');
const muted = instance.getBoolean('Muted');
const autoPlay = instance.getBoolean('Autoplay');

export default {
    example: figma.code`
        <Video
            src="https://example.com/video.mp4"
            ${loop ? 'loop' : ''}
            ${muted ? 'muted' : ''}
            ${autoPlay ? 'autoPlay' : ''}
        />
    `,
    imports: ['import {Video} from "@telefonica/mistica";'],
    id: 'video-mobile',
    metadata: {nestable: false},
};
