import React from 'react';
import TextLink from '../../text-link';
import figma from '@figma/code-connect';

figma.connect(
    TextLink,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5150%3A4201',
    {
        props: {
            disabled: figma.enum('State', {
                Disabled: true,
            }),
            underline: figma.enum('Underline', {
                Always: 'always',
                onHover: 'on hover',
            }),
        },
        example: (props) => (
            <TextLink underline={props.underline} disabled={props.disabled} onPress={() => {}}>
                Link text
            </TextLink>
        ),
    }
);
