// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=1952-7125
// source=src/radio-button.tsx
// component=RadioButton
import figma from 'figma';

const instance = figma.selectedInstance;

// "Disabled" is a VARIANT (Off | On). The `disabled` prop lives on RadioGroup.
const disabled = instance.getEnum('Disabled', {Off: false, On: true});

export default {
    example: figma.code`
        <RadioGroup name="radio-group" defaultValue="option-1" ${disabled ? 'disabled' : ''}>
            <RadioButton value="option-1">Option 1</RadioButton>
            <RadioButton value="option-2">Option 2</RadioButton>
        </RadioGroup>
    `,
    imports: ['import {RadioButton, RadioGroup} from "@telefonica/mistica";'],
    id: 'radio-button-mobile',
    metadata: {nestable: false},
};
