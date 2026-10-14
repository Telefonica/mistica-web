// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169-7532
// source=src/skeletons.tsx
// component=SkeletonCircle
import figma from 'figma';

// The Figma node exposes only a "Theme context" VARIANT which has no
// correspondence in the code component props.

export default {
    example: figma.code`
        <SkeletonCircle size={48} />
    `,
    imports: ['import {SkeletonCircle} from "@telefonica/mistica";'],
    id: 'skeleton-circle',
    metadata: {nestable: false},
};
