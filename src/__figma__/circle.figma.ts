// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=569-6503
// source=src/circle.tsx
// component=Circle
import figma from 'figma';

const instance = figma.selectedInstance;

// "Border" is a BOOLEAN toggling the circle border.
const border = instance.getBoolean('Border');

export default {
    example: figma.code`
        <Circle size={40} backgroundColor="brandLow" ${border ? 'border' : ''}>
            Content
        </Circle>
    `,
    imports: ['import {Circle} from "@telefonica/mistica";'],
    id: 'circle',
    metadata: {nestable: false},
};
