// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10556-9670
// source=src/slider.tsx
// component=Slider
import figma from 'figma';

const instance = figma.selectedInstance;

const tooltip = instance.getBoolean('Tooltip');

// "State" is a VARIANT (Activated | Pressed | Disabled); only "Disabled" maps
// onto the boolean `disabled` code prop.
const disabled = instance.getEnum('State', {
    Activated: false,
    Pressed: false,
    Disabled: true,
});

export default {
    example: figma.code`
        <Slider name="slider" ${tooltip ? 'tooltip' : ''} ${disabled ? 'disabled' : ''} />
    `,
    imports: ['import {Slider} from "@telefonica/mistica";'],
    id: 'slider',
    metadata: {nestable: false},
};
