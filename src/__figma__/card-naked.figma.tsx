import React from 'react';
import {NakedCard} from '../card-naked';
import figma from '@figma/code-connect';

figma.connect(
    NakedCard,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10867%3A12291',
    {
        props: {
            title: figma.boolean('Title', {
                true: 'Title',
                false: undefined,
            }),
            pretitle: figma.boolean('Pretitle', {
                true: 'Pretitle',
                false: undefined,
            }),
            subtitle: figma.boolean('Subtitle', {
                true: 'Subtitle',
                false: undefined,
            }),
            description: figma.boolean('Description', {
                true: 'Description',
                false: undefined,
            }),
            size: figma.enum('Size', {
                Default: 'default',
                Snap: 'snap',
                Display: 'display',
            }),
        },
        example: (props) => (
            <NakedCard
                title={props.title}
                pretitle={props.pretitle}
                subtitle={props.subtitle}
                description={props.description}
                size={props.size}
                imageSrc="https://example.com/image.jpg"
                onPress={() => {}}
            />
        ),
    }
);
