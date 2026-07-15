// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=1952-7138
// source=src/switch-component.tsx
// component=Switch
import figma from 'figma';

const instance = figma.selectedInstance;

// "State" and "Disabled" are Figma VARIANTs (not BOOLEAN properties) mapping onto
// the boolean `defaultChecked` and `disabled` code props. On the Mobile node the
// "Disabled" variant uses On/Off options.
const checked = instance.getEnum('State', {On: true, Off: false});
const disabled = instance.getEnum('Disabled', {On: true, Off: false});

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
    id: 'switch-mobile',
    metadata: {nestable: false},
};
