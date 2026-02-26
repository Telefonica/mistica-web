import React from 'react';
import TextLink from '../text-link';
import figma from '@figma/code-connect';

const textLinkProps = {
    disabled: figma.enum('State', {
        Disabled: true,
    }),
    underline: figma.enum('Underline', {
        Always: 'always',
        onHover: 'on hover',
    }),
};

// Desktop
figma.connect(
    TextLink,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5150%3A4201',
    {
        props: textLinkProps,
        example: (props) => (
            <TextLink underline={props.underline} disabled={props.disabled} onPress={() => {}}>
                Link text
            </TextLink>
        ),
    }
);

// Mobile
figma.connect(
    TextLink,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=9511%3A6607',
    {
        props: textLinkProps,
        example: (props) => (
            <TextLink underline={props.underline} disabled={props.disabled} onPress={() => {}}>
                Link text
            </TextLink>
        ),
    }
);
