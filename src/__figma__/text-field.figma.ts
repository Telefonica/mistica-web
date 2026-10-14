// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987-6924
// source=src/text-field.tsx
// component=TextField
import figma from 'figma';

const instance = figma.selectedInstance;

const labelLayer = instance.findText('Label');
const label = labelLayer.type === 'TEXT' ? labelLayer.textContent : '';

// "Helper text" is a BOOLEAN toggling the helper text layer of the same name.
const hasHelperText = instance.getBoolean('Helper text');
const helperTextLayer = instance.findText('Helper text');
const helperText = helperTextLayer.type === 'TEXT' ? helperTextLayer.textContent : '';

// These states are Figma VARIANTs (not BOOLEAN properties) but map onto boolean code props.
const error = instance.getEnum('Error', {No: false, Yes: true});
const disabled = instance.getEnum('Disabled', {False: false, True: true});
const readOnly = instance.getEnum('Read only', {False: false, True: true});
const multiline = instance.getEnum('Multiline', {False: false, True: true});

// "End icon" BOOLEAN toggles the swappable "Choose icon" instance.
const hasEndIcon = instance.getBoolean('End icon');
const endIcon = hasEndIcon ? instance.getInstanceSwap('Choose icon') : null;
let endIconCode;
if (endIcon && endIcon.type === 'INSTANCE') {
    endIconCode = endIcon.executeTemplate().example;
}

export default {
    example: figma.code`
        <TextField
            name="text-field"
            label="${label}"
            ${hasHelperText ? figma.code`helperText="${helperText}"` : ''}
            ${error ? 'error' : ''}
            ${disabled ? 'disabled' : ''}
            ${readOnly ? 'readOnly' : ''}
            ${multiline ? 'multiline' : ''}
            ${endIconCode ? figma.code`endIcon={${endIconCode}}` : ''}
        />
    `,
    imports: ['import {TextField} from "@telefonica/mistica";'],
    id: 'text-field',
    metadata: {nestable: false},
};
