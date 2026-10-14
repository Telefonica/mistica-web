// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=13350-186
// source=src/progress-bar.tsx
// component=ProgressBarStepped
import figma from 'figma';

const instance = figma.selectedInstance;

// "Steps" is a VARIANT mapping onto the numeric `steps` code prop.
const steps = instance.getEnum('Steps', {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
});

// "Current step" is a VARIANT mapping onto the numeric `currentStep` code prop.
const currentStep = instance.getEnum('Current step', {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
});

export default {
    example: figma.code`
        <ProgressBarStepped steps={${steps}} currentStep={${currentStep}} />
    `,
    imports: ['import {ProgressBarStepped} from "@telefonica/mistica";'],
    id: 'progress-bar-stepped',
    metadata: {nestable: false},
};
