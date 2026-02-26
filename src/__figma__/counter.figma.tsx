import React from 'react';
import Counter from '../counter';
import figma from '@figma/code-connect';

figma.connect(
    Counter,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=12021%3A3044',
    {
        props: {
            onRemove: figma.boolean('Remove', {
                true: () => {},
                false: undefined,
            }),
            disabled: figma.boolean('Disabled'),
        },
        example: (props) => (
            <Counter
                defaultValue={1}
                disabled={props.disabled}
                onRemove={props.onRemove}
                onChangeValue={(value) => {}}
            />
        ),
    }
);
