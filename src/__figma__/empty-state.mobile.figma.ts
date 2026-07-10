// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=765-53
// source=src/empty-state.tsx
// component=EmptyState
import figma from 'figma';

export default {
    example: figma.code`
        <EmptyState title="Title" description="Description" imageUrl="https://example.com/image.png" />
    `,
    imports: ['import {EmptyState} from "@telefonica/mistica";'],
    id: 'empty-state-mobile',
    metadata: {nestable: false},
};
