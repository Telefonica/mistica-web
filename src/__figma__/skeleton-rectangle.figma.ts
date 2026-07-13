// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169-7531
// source=src/skeletons.tsx
// component=SkeletonRectangle
import figma from 'figma';

const instance = figma.selectedInstance;

// "noBorderRadius" is a VARIANT (False | True) mapping onto the boolean code prop.
const noBorderRadius = instance.getEnum('noBorderRadius', {True: true, False: false});

export default {
    example: figma.code`
        <SkeletonRectangle ${noBorderRadius ? 'noBorderRadius' : ''} height={100} />
    `,
    imports: ['import {SkeletonRectangle} from "@telefonica/mistica";'],
    id: 'skeleton-rectangle',
    metadata: {nestable: false},
};
