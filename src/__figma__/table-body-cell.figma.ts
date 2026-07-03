// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880-1176
// source=src/table.tsx
// component=Table
import figma from 'figma';

const instance = figma.selectedInstance;

const cellLayer = instance.findText('Cell');
const cell = cellLayer.type === 'TEXT' ? cellLayer.textContent : 'Cell';

// "Content align" VARIANT maps onto the `columnTextAlign` prop.
const columnTextAlign = instance.getEnum('Content align', {Left: 'left', Right: 'right'});

export default {
    example: figma.code`
        <Table
            heading={['Header']}
            content={[['${cell}']]}
            columnTextAlign="${columnTextAlign}"
        />
    `,
    imports: ['import {Table} from "@telefonica/mistica";'],
    id: 'table-body-cell',
    metadata: {nestable: false},
};
