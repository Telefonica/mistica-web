// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=183-5534
// source=src/switch-component.tsx
// component=Switch
import figma from 'figma';

const instance = figma.selectedInstance;

// "State" and "Disabled" are Figma VARIANTs (not BOOLEAN properties) mapping onto
// the boolean `defaultChecked` and `disabled` code props.
const checked = instance.getEnum('State', {On: true, Off: false});
const disabled = instance.getEnum('Disabled', {True: true, False: false});

export default {
    example: figma.code`
        <Switch
            name="switch"
            defaultChecked={${checked}}
            ${disabled ? 'disabled' : ''}
            onChange={() => {}}
        >
            Label
        </Switch>
    `,
    imports: ['import {Switch} from "@telefonica/mistica";'],
    id: 'switch',
    metadata: {nestable: false},
};
