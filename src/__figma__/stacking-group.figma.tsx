import React from 'react';
import StackingGroup from '../stacking-group';
import figma from '@figma/code-connect';

figma.connect(
    StackingGroup,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=16746%3A3205',
    {
        props: {
            maxItems: figma.enum('Max. Items', {
                '2': 2,
                '3': 3,
                '4': 4,
                '5': 5,
                '6': 6,
                '7': 7,
                '8': 8,
                '9': 9,
            }),
        },
        example: (props) => (
            <StackingGroup maxItems={props.maxItems} moreItemsStyle={{type: 'circle', size: 40}}>
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
            </StackingGroup>
        ),
    }
);
