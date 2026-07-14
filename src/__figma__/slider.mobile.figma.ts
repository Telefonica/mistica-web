// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=2373-8535
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
    id: 'slider-mobile',
    metadata: {nestable: false},
};
