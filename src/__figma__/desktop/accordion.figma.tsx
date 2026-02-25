import React from 'react';
import {Accordion, AccordionItem} from '../../accordion';
import figma from '@figma/code-connect';

figma.connect(
    Accordion,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=13455%3A1028',
    {
        props: {
            singleOpen: figma.boolean('Auto collapse'),
        },
        example: (props) => (
            <Accordion singleOpen={props.singleOpen}>
                <AccordionItem title="Title" content="Content" />
                <AccordionItem title="Title" content="Content" />
            </Accordion>
        ),
    }
);
