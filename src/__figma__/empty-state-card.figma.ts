// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=846-4162
// source=src/empty-state-card.tsx
// component=EmptyStateCard
import figma from 'figma';

export default {
    example: figma.code`
        <EmptyStateCard
            title="Title"
            description="Description"
            imageUrl="https://example.com/image.jpg"
        />
    `,
    imports: ['import {EmptyStateCard} from "@telefonica/mistica";'],
    id: 'empty-state-card',
    metadata: {nestable: false},
};
