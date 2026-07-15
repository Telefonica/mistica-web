// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=39455-1048
// source=src/table.tsx
// component=Table
import figma from 'figma';

const instance = figma.selectedInstance;

// "Boxed" and "Collapse rows" are VARIANTs mapping onto the `boxed` and `responsive`
// code props respectively.
const boxed = instance.getEnum('Boxed', {True: true, False: false});
const collapseRows = instance.getEnum('Collapse rows', {True: true, False: false});

export default {
    example: figma.code`
        <Table
            heading={['Column 1', 'Column 2', 'Column 3']}
            content={[
                ['Cell 1', 'Cell 2', 'Cell 3'],
                ['Cell 4', 'Cell 5', 'Cell 6'],
            ]}
            ${boxed ? 'boxed' : ''}
            ${collapseRows ? 'responsive="collapse-rows"' : ''}
        />
    `,
    imports: ['import {Table} from "@telefonica/mistica";'],
    id: 'table-mobile',
    metadata: {nestable: false},
};
