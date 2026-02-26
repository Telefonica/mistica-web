import React from 'react';
import Avatar from '../avatar';
import figma from '@figma/code-connect';

const avatarProps = {
    initials: figma.enum('Type', {
        Letters: figma.string('Initials'),
    }),
    src: figma.enum('Type', {
        Image: 'https://picsum.photos/1200/1200',
    }),
    Icon: figma.enum('Type', {
        Icon: figma.children('*'),
    }),
    badge: figma.boolean('Badge', {
        true: figma.nestedProps('Badge', {
            value: figma.boolean('+9', {
                true: 15,
                false: figma.boolean('Non-numeric', {
                    true: true,
                    false: 2,
                }),
            }),
        }),
        false: {value: undefined},
    }),
    border: figma.boolean('Border'),
    size: 64,
};

// Desktop
figma.connect(
    Avatar,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2725%3A4164',
    {
        props: avatarProps,
        example: (props) => (
            <Avatar
                src={props.src}
                size={props.size}
                initials={props.initials}
                Icon={props.Icon}
                badge={props.badge.value}
                border={props.border}
            />
        ),
    }
);

// Mobile
figma.connect(
    Avatar,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=4772%3A9007',
    {
        props: avatarProps,
        example: (props) => (
            <Avatar
                src={props.src}
                size={props.size}
                initials={props.initials}
                Icon={props.Icon}
                badge={props.badge.value}
                border={props.border}
            />
        ),
    }
);
