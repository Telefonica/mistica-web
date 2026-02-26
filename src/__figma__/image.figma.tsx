import React from 'react';
import Image from '../image';
import figma from '@figma/code-connect';

const imageProps = {
    circular: figma.enum('Type', {
        Circular: true,
    }),
    // aspectRatio: figma.enum('Aspect ratio', {
    //     '1:1': '1:1',
    //     '4:3': '4:3',
    //     '7:10': '7:10',
    //     '16:9': '16:9',
    // }),
    noBorderRadius: figma.boolean('Border radius', {
        true: false,
        false: true,
    }),
    border: figma.boolean('Border'),
};

// Desktop
figma.connect(
    Image,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=569%3A24369',
    {
        props: imageProps,
        example: (props) => (
            <Image
                src="https://example.com/image.jpg"
                aspectRatio={props.aspectRatio}
                circular={props.circular}
                noBorderRadius={props.noBorderRadius}
                border={props.border}
            />
        ),
    }
);

// Mobile
figma.connect(
    Image,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=569%3A24369',
    {
        props: imageProps,
        example: (props) => (
            <Image
                src="https://example.com/image.jpg"
                aspectRatio={props.aspectRatio}
                circular={props.circular}
                noBorderRadius={props.noBorderRadius}
                border={props.border}
            />
        ),
    }
);
