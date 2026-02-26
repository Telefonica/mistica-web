import React from 'react';
import Counter from '../counter';
import figma from '@figma/code-connect';

const counterProps = {
    onRemove: figma.boolean('Remove', {
        true: () => {},
        false: undefined,
    }),
    disabled: figma.boolean('Disabled'),
};

// Desktop
figma.connect(
    Counter,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=12021%3A3044',
    {
        props: counterProps,
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

// Mobile
figma.connect(
    Counter,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=24524%3A1267',
    {
        props: counterProps,
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
