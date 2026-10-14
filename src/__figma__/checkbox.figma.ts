// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=183-5449
// source=src/checkbox.tsx
// component=Checkbox
import figma from 'figma';

const instance = figma.selectedInstance;

// "State" is a VARIANT (False | True) mapping onto the `defaultChecked` boolean prop.
const state = instance.getEnum('State', {True: true, False: false});

// "Disabled" is a VARIANT (False | True) mapping onto the `disabled` boolean prop.
const disabled = instance.getEnum('Disabled', {True: true, False: false});

export default {
    example: figma.code`
        <Checkbox
            name="checkbox"
            ${state ? 'defaultChecked' : ''}
            ${disabled ? 'disabled' : ''}
        />
    `,
    imports: ['import {Checkbox} from "@telefonica/mistica";'],
    id: 'checkbox',
    metadata: {nestable: false},
};
