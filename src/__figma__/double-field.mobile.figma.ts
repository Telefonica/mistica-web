// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=6097-8587
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
    id: 'double-field-mobile',
    metadata: {nestable: false},
};
