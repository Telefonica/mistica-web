import React from 'react';
import Table from '../table';
import figma from '@figma/code-connect';

const tableRowProps = {
    // rowVerticalAlign: figma.enum('Content alignment', {
    //     Top: 'top',
    //     Center: 'middle',
    // }),
};

// Desktop - Table row
figma.connect(
    Table,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880%3A1222',
    {
        props: tableRowProps,
        example: (props) => (
            <Table
                heading={['Column 1', 'Column 2', 'Column 3']}
                content={[
                    ['Cell 1', 'Cell 2', 'Cell 3'],
                    ['Cell 4', 'Cell 5', 'Cell 6'],
                ]}
                // rowVerticalAlign={props.rowVerticalAlign}
            />
        ),
    }
);

// Table container
figma.connect(
    Table,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880%3A1248',
    {
        props: {
            boxed: figma.boolean('Boxed'),
        },
        example: (props) => (
            <Table heading={['Column 1', 'Column 2']} content={[['Cell 1', 'Cell 2']]} boxed={props.boxed} />
        ),
    }
);

// Header cell
figma.connect(
    Table,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880%3A1197',
    {
        props: {
            columnTextAlign: figma.enum('Content align', {
                Left: 'left',
                Right: 'right',
            }),
        },
        example: (props) => (
            <Table heading={['Header']} content={[['Cell']]} columnTextAlign={props.columnTextAlign} />
        ),
    }
);

// Body cell
figma.connect(
    Table,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880%3A1176',
    {
        props: {
            columnTextAlign: figma.enum('Content align', {
                Left: 'left',
                Right: 'right',
            }),
        },
        example: (props) => (
            <Table heading={['Header']} content={[['Cell']]} columnTextAlign={props.columnTextAlign} />
        ),
    }
);

// Actions cell
figma.connect(
    Table,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18880%3A1209',
    {
        props: {},
        example: () => (
            <Table
                heading={['Header']}
                content={[
                    {
                        cells: ['Cell'],
                        actions: [{Icon: () => null, onPress: () => {}, label: 'Action'}],
                    },
                ]}
            />
        ),
    }
);

// Mobile
figma.connect(
    Table,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=39455%3A1048',
    {
        props: tableRowProps,
        example: (props) => (
            <Table
                heading={['Column 1', 'Column 2', 'Column 3']}
                content={[
                    ['Cell 1', 'Cell 2', 'Cell 3'],
                    ['Cell 4', 'Cell 5', 'Cell 6'],
                ]}
                // rowVerticalAlign={props.rowVerticalAlign}
            />
        ),
    }
);
