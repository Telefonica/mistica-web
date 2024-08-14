import * as React from 'react';
import {render, screen, within} from '@testing-library/react';
import {Rating, InfoRating} from '../rating';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('InfoRating is accessible', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <InfoRating aria-label="info rating" />
        </ThemeContextProvider>
    );

    await screen.findByRole('img', {name: 'info rating'});
});

test('Rating quantitative is accessible', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Rating aria-label="rating" />
        </ThemeContextProvider>
    );

    const rating = await screen.findByRole('radiogroup', {name: 'rating'});
    const icons = within(rating).getAllByRole('radio');

    // 5 icons by default
    expect(icons).toHaveLength(5);

    // Initially no value is defined
    icons.forEach((icon) => expect(icon).not.toBeChecked());

    const firstIcon = await within(rating).findByRole('radio', {name: '1 de 5'});
    await userEvent.click(firstIcon);
    expect(icons[0]).toBeChecked();

    const thirdIcon = await within(rating).findByRole('radio', {name: '3 de 5'});
    await userEvent.click(thirdIcon);
    expect(icons[0]).not.toBeChecked();
    expect(icons[2]).toBeChecked();
});

test('Rating qualitative is accessible', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Rating aria-label="rating" type="qualitative" />
        </ThemeContextProvider>
    );

    const rating = await screen.findByRole('radiogroup', {name: 'rating'});
    const icons = within(rating).getAllByRole('radio');

    // 5 icons by default
    expect(icons).toHaveLength(5);

    // Initially no value is defined
    icons.forEach((icon) => expect(icon).not.toBeChecked());

    const firstIcon = await within(rating).findByRole('radio', {name: 'muy malo'});
    await userEvent.click(firstIcon);
    expect(icons[0]).toBeChecked();

    const thirdIcon = await within(rating).findByRole('radio', {name: 'regular'});
    await userEvent.click(thirdIcon);
    expect(icons[0]).not.toBeChecked();
    expect(icons[2]).toBeChecked();
});

test('Rating with uncontrolled value', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Rating aria-label="rating" defaultValue={2} />
        </ThemeContextProvider>
    );

    const secondIcon = await screen.findByRole('radio', {name: '2 de 5'});
    expect(secondIcon).toBeChecked();

    const thirdIcon = await screen.findByRole('radio', {name: '3 de 5'});
    await userEvent.click(thirdIcon);
    expect(secondIcon).not.toBeChecked();
    expect(thirdIcon).toBeChecked();
});

test('Rating with controlled value', async () => {
    const ControlledRating = () => {
        const [value, setValue] = React.useState(2);
        return <Rating aria-label="rating" value={value} onChangeValue={setValue} />;
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ControlledRating />
        </ThemeContextProvider>
    );

    const secondIcon = await screen.findByRole('radio', {name: '2 de 5'});
    expect(secondIcon).toBeChecked();

    const thirdIcon = await screen.findByRole('radio', {name: '3 de 5'});
    await userEvent.click(thirdIcon);
    expect(secondIcon).not.toBeChecked();
    expect(thirdIcon).toBeChecked();
});

test('Rating with 3 icons and custom labels', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Rating aria-label="rating" count={3} valueLabels={['first', 'second', 'third']} />
        </ThemeContextProvider>
    );

    const rating = await screen.findByRole('radiogroup', {name: 'rating'});
    const icons = within(rating).getAllByRole('radio');

    expect(icons).toHaveLength(3);

    // Initially no value is defined
    icons.forEach((icon) => expect(icon).not.toBeChecked());

    const secondIcon = await screen.findByRole('radio', {name: 'second'});
    await userEvent.click(secondIcon);

    expect(icons[1]).toBeChecked();

    const thirdIcon = await screen.findByRole('radio', {name: 'third'});
    await userEvent.click(thirdIcon);

    expect(icons[1]).not.toBeChecked();
    expect(icons[2]).toBeChecked();
});
