// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815-10668
// source=src/community/advanced-data-card.tsx
// component=AdvancedDataCard
import figma from 'figma';

const instance = figma.selectedInstance;

// Each of these is a BOOLEAN toggling the presence of the matching text prop.
const hasTitle = instance.getBoolean('Title');
const hasSubtitle = instance.getBoolean('Subtitle');
const hasPretitle = instance.getBoolean('Pretitle');
const hasDescription = instance.getBoolean('Description');

export default {
    example: figma.code`
        <AdvancedDataCard
            ${hasTitle ? 'title="Title"' : ''}
            ${hasSubtitle ? 'subtitle="Subtitle"' : ''}
            ${hasPretitle ? 'pretitle="Pretitle"' : ''}
            ${hasDescription ? 'description="Description"' : ''}
        />
    `,
    imports: ['import {AdvancedDataCard} from "@telefonica/mistica/community";'],
    id: 'advanced-data-card',
    metadata: {nestable: false},
};
