// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1801-4548
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
    id: 'video',
    metadata: {nestable: false},
};
