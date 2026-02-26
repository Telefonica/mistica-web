import React from 'react';
import {BoxedRow, OrderedList, Row, UnorderedList} from '../list';
import figma from '@figma/code-connect';

figma.connect(
    BoxedRow,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1298%3A5658',
    {
        props: {
            nested: figma.nestedProps('List Structure', {
                asset: figma.boolean('Asset', {
                    true: figma.instance('Choose icon'),
                    false: undefined,
                }),
                title: figma.textContent('Title'),
                subtitle: figma.textContent('Subtitle'),
                description: figma.textContent('Description'),
                badge: figma.boolean('Slot', {
                    true: figma.children('Badge*'),
                    false: undefined,
                }),
                extra: figma.boolean('Slot', {
                    true: figma.instance('🔄 Replace Slot'),
                    false: undefined,
                }),
            }),
            disabled: figma.boolean('Disabled'),
            danger: figma.boolean('Danger'),
        },
        example: (props) => (
            <BoxedRow
                title={props.nested.title}
                subtitle={props.nested.subtitle}
                description={props.nested.description}
                badge={props.nested.badge}
                disabled={props.disabled}
                danger={props.danger}
                extra={props.nested.extra}
            />
        ),
    }
);

figma.connect(
    Row,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1298%3A5638',
    {
        props: {
            nested: figma.nestedProps('List Structure', {
                asset: figma.boolean('Asset', {
                    true: figma.children('*'),
                    false: undefined,
                }),
                title: figma.textContent('Title'),
                subtitle: figma.textContent('Subtitle'),
                description: figma.textContent('Description'),
                badge: figma.boolean('Slot', {
                    true: figma.children('Badge*'),
                    false: undefined,
                }),
                extra: figma.boolean('Slot', {
                    true: figma.instance('🔄 Replace Slot'),
                    false: undefined,
                }),
            }),
            disabled: figma.boolean('Disabled'),
            danger: figma.boolean('Danger'),
        },

        example: (props) => (
            <Row
                title={props.nested.title}
                subtitle={props.nested.subtitle}
                description={props.nested.description}
                badge={props.nested.badge}
                disabled={props.disabled}
                danger={props.danger}
                extra={props.nested.extra}
            />
        ),
    }
);

figma.connect(
    OrderedList,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=30872%3A2566',
    {
        props: {},
        example: () => (
            <OrderedList
                items={[{content: 'First item'}, {content: 'Second item'}, {content: 'Third item'}]}
            />
        ),
    }
);

figma.connect(
    UnorderedList,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=30916%3A17448',
    {
        props: {},
        example: () => (
            <UnorderedList
                items={[{content: 'First item'}, {content: 'Second item'}, {content: 'Third item'}]}
            />
        ),
    }
);
