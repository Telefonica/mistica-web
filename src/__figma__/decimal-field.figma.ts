// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987-7443
// source=src/decimal-field.tsx
// component=DecimalField
import figma from 'figma';

const instance = figma.selectedInstance;

const labelLayer = instance.findText('Label');
const label = labelLayer.type === 'TEXT' ? labelLayer.textContent : '';

// "Helper text" is a BOOLEAN toggling the helper text layer of the same name.
const hasHelperText = instance.getBoolean('Helper text');
const helperTextLayer = instance.findText('Helper text');
const helperText = helperTextLayer.type === 'TEXT' ? helperTextLayer.textContent : '';

// "Prefix" is a BOOLEAN toggling the prefix text layer of the same name.
const hasPrefix = instance.getBoolean('Prefix');
const prefixLayer = instance.findText('Prefix');
const prefix = prefixLayer.type === 'TEXT' ? prefixLayer.textContent : '';

// These states are Figma VARIANTs (not BOOLEAN properties) but map onto boolean code props.
const error = instance.getEnum('Error', {No: false, Yes: true});
const disabled = instance.getEnum('Disabled', {False: false, True: true});
const readOnly = instance.getEnum('Read only', {False: false, True: true});

export default {
    example: figma.code`
        <DecimalField
            name="decimal-field"
            label="${label}"
            ${hasHelperText ? figma.code`helperText="${helperText}"` : ''}
            ${hasPrefix ? figma.code`prefix="${prefix}"` : ''}
            ${error ? 'error' : ''}
            ${disabled ? 'disabled' : ''}
            ${readOnly ? 'readOnly' : ''}
        />
    `,
    imports: ['import {DecimalField} from "@telefonica/mistica";'],
    id: 'decimal-field',
    metadata: {nestable: false},
};
