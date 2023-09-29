import * as React from 'react';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import {ThemeContextProvider, Text3, AccordionItem, Accordion} from '..';
import {makeTheme} from './test-utils';

const items = [
    {
        title: 'Title 1',
        content: <Text3 regular>Content 1</Text3>,
    },
    {
        title: 'Title 2',
        content: <Text3 regular>Content 2</Text3>,
    },
    {
        title: 'Title 3',
        content: <Text3 regular>Content 3</Text3>,
    },
];

test('Accordion', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Accordion>
                {items.map((item) => (
                    <AccordionItem key={item.title} {...item} />
                ))}
            </Accordion>
        </ThemeContextProvider>
    );

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Title 1'));
    await userEvent.click(screen.getByText('Title 3'));

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();
});

test('Accordion with index', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Accordion index={[0, 2]}>
                {items.map((item) => (
                    <AccordionItem key={item.title} {...item} />
                ))}
            </Accordion>
        </ThemeContextProvider>
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Title 1'));
    await userEvent.click(screen.getByText('Title 3'));

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();
});

test('Accordion with default index', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Accordion defaultIndex={[0, 2]}>
                {items.map((item) => (
                    <AccordionItem key={item.title} {...item} />
                ))}
            </Accordion>
        </ThemeContextProvider>
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Title 1'));
    await userEvent.click(screen.getByText('Title 2'));

    /** We need to wait for CSS transition to finish in order for panel to be removed */
    await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();
});

test('Accordion with singleOpen', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Accordion singleOpen>
                {items.map((item) => (
                    <AccordionItem key={item.title} {...item} />
                ))}
            </Accordion>
        </ThemeContextProvider>
    );

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Title 1'));
    await userEvent.click(screen.getByText('Title 2'));
    await userEvent.click(screen.getByText('Title 3'));

    /** We need to wait for CSS transition to finish in order for panel to be removed */
    await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Content 3')).toBeInTheDocument();
});
