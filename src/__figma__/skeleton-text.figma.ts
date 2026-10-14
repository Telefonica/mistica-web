// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169-7528
// source=src/skeletons.tsx
// component=SkeletonText
import figma from 'figma';

// The Figma node exposes only a "Theme context" VARIANT which has no
// correspondence in the code component props.

export default {
    example: figma.code`
        <SkeletonText />
    `,
    imports: ['import {SkeletonText} from "@telefonica/mistica";'],
    id: 'skeleton-text',
    metadata: {nestable: false},
};
