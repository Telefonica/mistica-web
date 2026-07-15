// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=15428-8877
// source=src/search-field.tsx
// component=SearchField
import figma from 'figma';

const instance = figma.selectedInstance;

const labelLayer = instance.findText('Label');
const label = labelLayer.type === 'TEXT' ? labelLayer.textContent : '';

// "Helper text" is a BOOLEAN toggling the helper text layer of the same name.
const hasHelperText = instance.getBoolean('Helper text');
const helperTextLayer = instance.findText('Helper text');
const helperText = helperTextLayer.type === 'TEXT' ? helperTextLayer.textContent : '';

// These states are Figma VARIANTs but map onto boolean code props.
const error = instance.getEnum('Error', {No: false, Yes: true});
const disabled = instance.getEnum('Disabled', {False: false, True: true});
const readOnly = instance.getEnum('Read only', {False: false, True: true});

export default {
    example: figma.code`
        <SearchField
            name="search-field"
            label="${label}"
            ${hasHelperText ? figma.code`helperText="${helperText}"` : ''}
            ${error ? 'error' : ''}
            ${disabled ? 'disabled' : ''}
            ${readOnly ? 'readOnly' : ''}
        />
    `,
    imports: ['import {SearchField} from "@telefonica/mistica";'],
    id: 'search-field-mobile',
    metadata: {nestable: false},
};
