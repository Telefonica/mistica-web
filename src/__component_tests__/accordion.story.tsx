import * as React from 'react';
import {Text3, AccordionItem, Accordion, Text2} from '..';

export const Panels = ({
    mode = 'uncontrolled',
}: {
    mode?: 'uncontrolled' | 'controlled' | 'default' | 'single';
}): JSX.Element => {
    const [index, setIndex] = React.useState<Array<number>>([0, 2]);
    return (
        <Accordion
            {...(mode === 'single'
                ? {singleOpen: true}
                : {
                      singleOpen: false,
                      index: mode === 'controlled' ? index : undefined,
                      defaultIndex: mode === 'default' ? [0, 2] : undefined,
                  })}
            onChange={(item, value) =>
                setIndex((index) => (value ? [...index, item] : index.filter((i) => i !== item)))
            }
        >
            {[1, 2, 3].map((i) => (
                <AccordionItem
                    key={i}
                    title={`Title ${i}`}
                    content={<Text3 regular>{`Content ${i}`}</Text3>}
                />
            ))}
        </Accordion>
    );
};
export const HeaderOrder = (): JSX.Element => (
    <Accordion>
        <AccordionItem
            title="Title"
            subtitle="Subtitle"
            detail="Detail"
            right={<span>Right content</span>}
            asset={<img src="/decorative.svg" alt="Decorative asset" />}
            content={<Text3 regular>Panel content</Text3>}
        />
    </Accordion>
);
export const CustomLabels = (): JSX.Element => (
    <>
        <Accordion>
            <AccordionItem
                title="Title 1"
                content={<Text3 regular>Content 1</Text3>}
                aria-label="Custom label 1"
            />
            <AccordionItem
                title="Title 2"
                content={<Text3 regular>Content 2</Text3>}
                aria-labelledby="item2-id"
            />
        </Accordion>
        <Text2 regular id="item2-id">
            Custom label 2
        </Text2>
    </>
);
