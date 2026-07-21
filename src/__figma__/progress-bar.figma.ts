// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=571-7442
// source=src/progress-bar.tsx
// component=ProgressBar
import figma from 'figma';

const instance = figma.selectedInstance;

// "Reverse" is a BOOLEAN property mapping onto the `reverse` code prop.
const reverse = instance.getBoolean('Reverse');

// "Progress" is a VARIANT mapping onto the numeric `progressPercent` code prop.
const progressPercent = instance.getEnum('Progress', {
    '0%': 0,
    '10%': 10,
    '20%': 20,
    '30%': 30,
    '40%': 40,
    '50%': 50,
    '60%': 60,
    '70%': 70,
    '80%': 80,
    '90%': 90,
    '100%': 100,
});

export default {
    example: figma.code`
        <ProgressBar progressPercent={${progressPercent}} ${reverse ? 'reverse' : ''} />
    `,
    imports: ['import {ProgressBar} from "@telefonica/mistica";'],
    id: 'progress-bar',
    metadata: {nestable: false},
};
