// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880-1197
// source=src/table.tsx
// component=Table
import figma from 'figma';

const instance = figma.selectedInstance;

const headerLayer = instance.findText('HEADER');
const header = headerLayer.type === 'TEXT' ? headerLayer.textContent : 'Header';

// "Content align" VARIANT maps onto the `columnTextAlign` prop.
const columnTextAlign = instance.getEnum('Content align', {Left: 'left', Right: 'right'});

export default {
    example: figma.code`
        <Table
            heading={['${header}']}
            content={[['Cell']]}
            columnTextAlign="${columnTextAlign}"
        />
    `,
    imports: ['import {Table} from "@telefonica/mistica";'],
    id: 'table-header-cell',
    metadata: {nestable: false},
};
