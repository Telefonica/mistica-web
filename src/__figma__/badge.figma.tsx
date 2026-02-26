import React from 'react';
import Badge from '../badge';
import figma from '@figma/code-connect';

const badgeProps = {
    value: figma.boolean('+9', {
        true: 15,
        false: figma.boolean('Non-numeric', {
            true: undefined,
            false: 2,
        }),
    }),
};

// Desktop
figma.connect(
    Badge,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2817%3A4076',
    {
        props: badgeProps,
        example: (props) => (
            <Badge value={props.value}>
                {/* The content inside the badge is optional and can be used to display anything. For example <IconHeartRegular /> or <Avatar /> */}
            </Badge>
        ),
    }
);

// Mobile
figma.connect(
    Badge,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=6180%3A9123',
    {
        props: badgeProps,
        example: (props) => (
            <Badge value={props.value}>
                {/* The content inside the badge is optional and can be used to display anything. For example <IconHeartRegular /> or <Avatar /> */}
            </Badge>
        ),
    }
);
