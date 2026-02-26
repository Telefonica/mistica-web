import React from 'react';
import Badge from '../badge';
import figma from '@figma/code-connect';

figma.connect(
    Badge,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2817%3A4076',
    {
        props: {
            value: figma.boolean('+9', {
                true: 15,
                false: figma.boolean('Non-numeric', {
                    true: undefined,
                    false: 2,
                }),
            }),
        },
        example: (props) => (
            <Badge value={props.value}>
                {/* The content inside the badge is optional and can be used to display anything. For example <IconHeartRegular /> or <Avatar /> */}
            </Badge>
        ),
    }
);
