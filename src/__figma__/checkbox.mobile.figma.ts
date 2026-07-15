// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=3114-10236
// source=src/checkbox.tsx
// component=Checkbox
import figma from 'figma';

const instance = figma.selectedInstance;

const childrenLayer = instance.findText('I agree to sell my soul with this link');
const children = childrenLayer.type === 'TEXT' ? childrenLayer.textContent : '';

// "Disabled" is a VARIANT (Off | On) mapping onto the `disabled` boolean prop.
const disabled = instance.getEnum('Disabled', {On: true, Off: false});

// The checked state lives on the nested "iOS/Checkbox" instance ("State" VARIANT).
const checkboxInstance = instance.findInstance('iOS/Checkbox');
let defaultChecked;
if (checkboxInstance.type === 'INSTANCE') {
    defaultChecked = checkboxInstance.getEnum('State', {On: true, Off: false});
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
    id: 'checkbox-mobile',
    metadata: {nestable: false},
};
