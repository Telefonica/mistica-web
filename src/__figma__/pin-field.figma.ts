// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=13264-3773
// source=src/pin-field.tsx
// component=PinField
import figma from 'figma';

const instance = figma.selectedInstance;

// "Helper text" is a BOOLEAN toggling the helper text layer of the same name.
const hasHelperText = instance.getBoolean('Helper text');
const helperTextLayer = instance.findText('Helper text');
const helperText = helperTextLayer.type === 'TEXT' ? helperTextLayer.textContent : '';

// "Length" is a Figma VARIANT (6 | 5 | 4 | 3 | 2) mapping onto the numeric `length` prop.
const length = instance.getEnum('Length', {'6': 6, '5': 5, '4': 4, '3': 3, '2': 2});

// These states are Figma VARIANTs (not BOOLEAN properties) but map onto boolean code props.
const error = instance.getEnum('Error', {False: false, True: true});
const disabled = instance.getEnum('Disabled', {False: false, True: true});
const readOnly = instance.getEnum('Read only', {False: false, True: true});
const hideCode = instance.getEnum('Hide Pin', {False: false, True: true});

export default {
    example: figma.code`
        <PinField
            name="pin-field"
            aria-label="PIN"
            ${length ? figma.code`length={${length}}` : ''}
            ${hasHelperText ? figma.code`helperText="${helperText}"` : ''}
            ${hideCode ? 'hideCode' : ''}
            ${error ? 'error' : ''}
            ${disabled ? 'disabled' : ''}
            ${readOnly ? 'readOnly' : ''}
        />
    `,
    imports: ['import {PinField} from "@telefonica/mistica";'],
    id: 'pin-field',
    metadata: {nestable: false},
};
