// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=15428-8878
// source=src/select.tsx
// component=Select
import figma from 'figma';

const instance = figma.selectedInstance;

// "Helper text" is a BOOLEAN property toggling the helper text.
const hasHelperText = instance.getBoolean('Helper text');

// These states are Figma VARIANTs but map onto boolean code props.
const error = instance.getEnum('Error', {No: false, Yes: true});
const disabled = instance.getEnum('Disabled', {False: false, True: true});

export default {
    example: figma.code`
        <Select
            label="Label"
            name="select"
            ${hasHelperText ? figma.code`helperText="Helper text"` : ''}
            ${error ? 'error' : ''}
            ${disabled ? 'disabled' : ''}
            options={[
                {value: '1', text: 'Option 1'},
                {value: '2', text: 'Option 2'},
            ]}
        />
    `,
    imports: ['import {Select} from "@telefonica/mistica";'],
    id: 'select-mobile',
    metadata: {nestable: false},
};
