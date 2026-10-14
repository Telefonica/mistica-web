// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169-7530
// source=src/skeletons.tsx
// component=SkeletonRow
import figma from 'figma';

// The Figma node exposes only a "Theme Context" VARIANT which has no
// correspondence in the code component props.

export default {
    example: figma.code`
        <SkeletonRow />
    `,
    imports: ['import {SkeletonRow} from "@telefonica/mistica";'],
    id: 'skeleton-row',
    metadata: {nestable: false},
};
