// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169-7529
// source=src/skeletons.tsx
// component=SkeletonLine
import figma from 'figma';

// The Figma node exposes only a "Theme context" VARIANT which has no
// correspondence in the code component props.

export default {
    example: figma.code`
        <SkeletonLine />
    `,
    imports: ['import {SkeletonLine} from "@telefonica/mistica";'],
    id: 'skeleton-line',
    metadata: {nestable: false},
};
