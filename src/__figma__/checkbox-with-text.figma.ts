// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1958-4596
// source=src/checkbox.tsx
// component=Checkbox
import figma from 'figma';

const instance = figma.selectedInstance;

const childrenLayer = instance.findText('Children');
const children = childrenLayer.type === 'TEXT' ? childrenLayer.textContent : '';

// "Disabled" is a VARIANT (False | True) mapping onto the `disabled` boolean prop.
const disabled = instance.getEnum('Disabled', {True: true, False: false});

// The checked state lives on the nested "Checkbox [D]" instance ("State" VARIANT).
const checkboxInstance = instance.findInstance('Checkbox [D]');
let defaultChecked;
if (checkboxInstance.type === 'INSTANCE') {
    defaultChecked = checkboxInstance.getEnum('State', {True: true, False: false});
}

export default {
    example: figma.code`
        <Checkbox
            name="checkbox"
            ${defaultChecked ? 'defaultChecked' : ''}
            ${disabled ? 'disabled' : ''}
        >
            ${children}
        </Checkbox>
    `,
    imports: ['import {Checkbox} from "@telefonica/mistica";'],
    id: 'checkbox-with-text',
    metadata: {nestable: false},
};
