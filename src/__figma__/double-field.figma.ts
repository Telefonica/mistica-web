// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2669-4139
// source=src/double-field.tsx
// component=DoubleField
import figma from 'figma';

const instance = figma.selectedInstance;

// "Layout" VARIANT. "Fullwidth" has no code correspondence (→ undefined).
const layout = instance.getEnum('Layout', {
    '50/50': '50/50',
    '40/60': '40/60',
    '60/40': '60/40',
});

export default {
    example: figma.code`
        <DoubleField ${layout ? figma.code`layout="${layout}"` : ''}>
            <div>Field 1</div>
            <div>Field 2</div>
        </DoubleField>
    `,
    imports: ['import {DoubleField} from "@telefonica/mistica";'],
    id: 'double-field',
    metadata: {nestable: false},
};
