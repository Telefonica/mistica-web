// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=30245-13665
// source=src/skip-link.tsx
// component=SkipLink
import figma from 'figma';

const instance = figma.selectedInstance;

// The link label lives in the nested Button Link "Action" text layer.
const labelLayer = instance.findText('Action');
const label = labelLayer.type === 'TEXT' ? labelLayer.textContent : 'Skip to main content';

export default {
    example: figma.code`
        <SkipLink targetId="main-content">${label}</SkipLink>
    `,
    imports: ['import {SkipLink} from "@telefonica/mistica";'],
    id: 'skip-link',
    metadata: {nestable: false},
};
