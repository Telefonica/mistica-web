// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=16351-4027
// source=src/icon-button.tsx
// component=ToggleIconButton
import figma from 'figma';

const instance = figma.selectedInstance;

// "Checked" is a VARIANT (false | true) mapping to the boolean `checked` code prop.
const checked = instance.getEnum('Checked', {true: true, false: false});

export default {
    example: figma.code`
        <ToggleIconButton
            checkedProps={{Icon: () => null, 'aria-label': 'checked'}}
            uncheckedProps={{Icon: () => null, 'aria-label': 'unchecked'}}
            ${checked ? 'checked' : ''}
            onChange={() => {}}
        />
    `,
    imports: ['import {ToggleIconButton} from "@telefonica/mistica";'],
    id: 'toggle-icon-button',
    metadata: {nestable: false},
};
