import React from 'react';
import {InfoRating, Rating} from '../../rating';
import figma from '@figma/code-connect';

figma.connect(
    InfoRating,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=20507%3A971',
    {
        props: {
            size: figma.enum('Size', {
                '≤ 16 px': 16,
                '> 16px - 24px': 24,
                '> 24px': 32,
            }),
        },
        example: (props) => <InfoRating value={3} size={props.size} />,
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
