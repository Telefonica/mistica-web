// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880-1209
// source=src/table.tsx
// component=Table
import figma from 'figma';

// The Figma node exposes an "Actions" VARIANT (1 | 2) which has no direct code-prop
// correspondence; the row actions are provided as a static example.

export default {
    example: figma.code`
        <Table
            heading={['Header']}
            content={[
                {
                    cells: ['Cell'],
                    actions: [{Icon: () => null, onPress: () => {}, label: 'Action'}],
                },
            ]}
        />
    `,
    imports: ['import {Table} from "@telefonica/mistica";'],
    id: 'table-actions-cell',
    metadata: {nestable: false},
};
