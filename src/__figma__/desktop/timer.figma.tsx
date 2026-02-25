import React from 'react';
import {Timer, TextTimer} from '../../timer';
import figma from '@figma/code-connect';

figma.connect(
    Timer,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18327%3A466',
    {
        props: {
            boxed: figma.boolean('Boxed'),
            maxTimeUnit: figma.enum('Max value', {
                Days: 'days',
                Hours: 'hours',
                Minutes: 'minutes',
                Seconds: 'seconds',
            }),
            minTimeUnit: figma.enum('Min value', {
                Seconds: 'seconds',
                Minutes: 'minutes',
                Hours: 'hours',
                Days: 'days',
            }),
        },
        example: (props) => (
            <Timer
                endTimestamp={new Date('2025-12-31T23:59:59')}
                maxTimeUnit={props.maxTimeUnit}
                minTimeUnit={props.minTimeUnit}
                boxed={props.boxed}
            />
        ),
    }
);

figma.connect(
    TextTimer,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18430%3A176',
    {
        props: {
            labelType: figma.enum('Label type', {
                None: 'none',
                Short: 'short',
                Long: 'long',
            }),
            maxTimeUnit: figma.enum('Max value', {
                Days: 'days',
                Hours: 'hours',
                Minutes: 'minutes',
                Seconds: 'seconds',
            }),
            minTimeUnit: figma.enum('Min value', {
                Seconds: 'seconds',
                Minutes: 'minutes',
                Hours: 'hours',
                Days: 'days',
            }),
        },
        example: (props) => (
            <TextTimer
                endTimestamp={new Date('2025-12-31T23:59:59')}
                maxTimeUnit={props.maxTimeUnit}
                minTimeUnit={props.minTimeUnit}
                labelType={props.labelType}
            />
        ),
    }
);
