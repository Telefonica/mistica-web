// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=0-2728
// source=src/stepper.tsx
// component=Stepper
import figma from 'figma';

// The Figma node exposes no properties that map onto the code component props
// (`steps` and `currentIndex`); they are provided as a static example.

export default {
    example: figma.code`
        <Stepper steps={['Step 1', 'Step 2', 'Step 3']} currentIndex={0} />
    `,
    imports: ['import {Stepper} from "@telefonica/mistica";'],
    id: 'stepper',
    metadata: {nestable: false},
};
