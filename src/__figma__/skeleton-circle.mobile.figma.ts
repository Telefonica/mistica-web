// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=16075-9337
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
    id: 'skeleton-circle-mobile',
    metadata: {nestable: false},
};
