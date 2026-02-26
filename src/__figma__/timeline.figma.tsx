import React from 'react';
import {Timeline, TimelineItem} from '../timeline';
import figma from '@figma/code-connect';

figma.connect(
    Timeline,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=26097%3A1822',
    {
        props: {
            orientation: figma.enum('Orientation', {
                Vertical: 'vertical',
                Horizontal: 'horizontal',
            }),
        },
        example: (props) => (
            <Timeline orientation={props.orientation}>
                <TimelineItem state="completed" asset={{kind: 'dot'}}>
                    Completed step
                </TimelineItem>
                <TimelineItem state="active" asset={{kind: 'dot'}}>
                    Active step
                </TimelineItem>
                <TimelineItem state="inactive" asset={{kind: 'dot'}}>
                    Inactive step
                </TimelineItem>
            </Timeline>
        ),
    }
);
