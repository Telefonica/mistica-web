// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880-1248
// source=src/table.tsx
// component=Table
import figma from 'figma';

const instance = figma.selectedInstance;

// "Boxed" is a VARIANT (not a BOOLEAN property) mapping onto the `boxed` code prop.
const boxed = instance.getEnum('Boxed', {True: true, False: false});

export default {
    example: figma.code`
        <Table
            heading={['Column 1', 'Column 2']}
            content={[['Cell 1', 'Cell 2']]}
            ${boxed ? 'boxed' : ''}
        />
    `,
    imports: ['import {Table} from "@telefonica/mistica";'],
    id: 'table-container',
    metadata: {nestable: false},
};
