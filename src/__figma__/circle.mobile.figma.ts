// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=19075-9350
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
    id: 'circle-mobile',
    metadata: {nestable: false},
};
