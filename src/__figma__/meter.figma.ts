// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=22685-442
// source=src/meter.tsx
// component=Meter
import figma from 'figma';

const instance = figma.selectedInstance;

// "Reverse" is a BOOLEAN toggling the `reverse` prop.
const reverse = instance.getBoolean('Reverse');

export default {
    example: figma.code`
        <Meter values={[50, 30, 20]} ${reverse ? 'reverse' : ''} />
    `,
    imports: ['import {Meter} from "@telefonica/mistica";'],
    id: 'meter',
    metadata: {nestable: false},
};
