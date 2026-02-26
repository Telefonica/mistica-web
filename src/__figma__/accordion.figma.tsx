import React from 'react';
import {Accordion, AccordionItem, BoxedAccordion, BoxedAccordionItem} from '../accordion';
import figma from '@figma/code-connect';

const accordionProps = {
    singleOpen: figma.boolean('Auto collapse'),
    asset: figma.boolean('Asset', {
        true: figma.children('*'),
        false: undefined,
    }),
    title: figma.textContent('Title'),
    subtitle: figma.boolean('Subtitle', {
        true: figma.textContent('Subtitle'),
        false: undefined,
    }),
    content: figma.textContent('Body content'),
    detail: figma.boolean('Detail', {
        true: figma.textContent('Detail'),
        false: undefined,
    }),
    right: figma.boolean('Right slot', {
        true: figma.children('*'),
        false: undefined,
    }),
};

// Desktop
figma.connect(
    Accordion,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=13455%3A1028',
    {
        props: accordionProps,
        example: (props) => (
            <Accordion singleOpen={props.singleOpen}>
                <AccordionItem
                    asset={props.asset}
                    title={props.title}
                    subtitle={props.subtitle}
                    content={<Text3 color={skinVars.colors.textSecondary}>{props.content}</Text3>}
                    detail={props.detail}
                    right={props.right}
                />
            </Accordion>
        ),
    }
);

figma.connect(
    BoxedAccordion,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=13418-3207&t=8UVll5NPxiYViFwL-4',
    {
        props: accordionProps,
        example: (props) => (
            <BoxedAccordion singleOpen={props.singleOpen}>
                <BoxedAccordionItem
                    asset={props.asset}
                    title={props.title}
                    subtitle={props.subtitle}
                    content={<Text3 color={skinVars.colors.textSecondary}>{props.content}</Text3>}
                    detail={props.detail}
                    right={props.right}
                />
            </BoxedAccordion>
        ),
    }
);

// Mobile
figma.connect(
    Accordion,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=25050%3A313',
    {
        props: accordionProps,
        example: (props) => (
            <Accordion singleOpen={props.singleOpen}>
                <AccordionItem
                    asset={props.asset}
                    title={props.title}
                    subtitle={props.subtitle}
                    content={<Text3 color={skinVars.colors.textSecondary}>{props.content}</Text3>}
                    detail={props.detail}
                    right={props.right}
                />
            </Accordion>
        ),
    }
);
