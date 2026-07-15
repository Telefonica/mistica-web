// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880-1222
// source=src/table.tsx
// component=Table
import figma from 'figma';

const instance = figma.selectedInstance;

// "Content alignment" VARIANT maps onto the `rowVerticalAlign` prop.
const rowVerticalAlign = instance.getEnum('Content alignment', {Top: 'top', Center: 'middle'});

export default {
    example: figma.code`
        <Table
            heading={['Column 1', 'Column 2', 'Column 3']}
            content={[
                ['Cell 1', 'Cell 2', 'Cell 3'],
                ['Cell 4', 'Cell 5', 'Cell 6'],
            ]}
            rowVerticalAlign="${rowVerticalAlign}"
        />
    `,
    imports: ['import {Table} from "@telefonica/mistica";'],
    id: 'table-row',
    metadata: {nestable: false},
};
