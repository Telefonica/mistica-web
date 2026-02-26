import React from 'react';
import {InfoRating, Rating} from '../rating';
import figma from '@figma/code-connect';

const infoRatingProps = {};

// Desktop
figma.connect(
    InfoRating,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=20507%3A971',
    {
        props: infoRatingProps,
        example: (props) => <InfoRating value={3} />,
    }
);

figma.connect(
    Rating,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=20228%3A4401',
    {
        props: {
            type: figma.enum('Type', {
                Quantitative: 'quantitative',
                Qualititative: 'qualitative',
            }),
            disabled: figma.boolean('Disabled'),
        },
        example: (props) => (
            <Rating type={props.type} disabled={props.disabled} onChangeValue={(value) => {}} />
        ),
    }
);

// Mobile
figma.connect(
    InfoRating,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=42108%3A8419',
    {
        props: infoRatingProps,
        example: (props) => <InfoRating value={3} />,
    }
);
