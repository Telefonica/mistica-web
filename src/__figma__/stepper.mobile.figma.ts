// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=1369-6481
// source=src/stepper.tsx
// component=Stepper
import figma from 'figma';

// The Figma node exposes only a "Steps" VARIANT (2 | 3 | 4 | 5) which has no
// direct code-prop correspondence; `steps` and `currentIndex` are provided as a
// static example.

export default {
    example: figma.code`
        <Stepper steps={['Step 1', 'Step 2', 'Step 3']} currentIndex={0} />
    `,
    imports: ['import {Stepper} from "@telefonica/mistica";'],
    id: 'stepper-mobile',
    metadata: {nestable: false},
};
