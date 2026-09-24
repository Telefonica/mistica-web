import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DataCard} from '../card-data';
import {MediaCard} from '../card-media';
import {CoverCard} from '../card-cover';
import AdvancedDataCard from '../community/advanced-data-card';
import {NakedCard} from '../card-naked';
import Checkbox from '../checkbox';
import Switch from '../switch-component';
import {RadioGroup} from '../radio-button';
import ThemeContextProvider from '../theme-context-provider';
import {ButtonPrimary} from '../button';
import {makeTheme} from './test-utils';
import {getSelectionOutlineVariant} from '../card-internal';

import type {Variant} from '../theme-variant-context';

const renderWithTheme = (children: React.ReactNode) =>
    render(<ThemeContextProvider theme={makeTheme()}>{children}</ThemeContextProvider>);

const outlineVariants: Array<[Variant, Variant, Variant]> = [
    ['default', 'default', 'default'],
    ['default', 'brand', 'default'],
    ['default', 'inverse', 'default'],
    ['brand', 'default', 'brand'],
    ['brand', 'brand', 'brand'],
    ['brand', 'inverse', 'inverse'],
    ['brand', 'negative', 'negative'],
    ['inverse', 'default', 'inverse'],
    ['inverse', 'brand', 'brand'],
    ['inverse', 'inverse', 'inverse'],
    ['inverse', 'negative', 'negative'],
    ['negative', 'default', 'negative'],
    ['negative', 'brand', 'default'],
    ['negative', 'inverse', 'default'],
    ['negative', 'negative', 'negative'],
    ['alternative', 'default', 'default'],
    ['alternative', 'brand', 'default'],
    ['alternative', 'inverse', 'default'],
];

test.each(outlineVariants)('outline over %s with %s card uses %s', (outside, variant, outline) => {
    expect(getSelectionOutlineVariant(outside, variant)).toBe(outline);
});

const AdvancedSelectionCard = ({
    slot,
    buttonPrimary,
    title,
    selected,
    checkbox,
    switch: switchProps,
    radioValue,
}: React.ComponentProps<typeof DataCard>) => {
    const selectionProps = checkbox
        ? {checkbox}
        : switchProps
          ? {switch: switchProps}
          : radioValue !== undefined
            ? {radioValue}
            : {};
    return (
        <AdvancedDataCard
            title={title}
            selected={selected}
            {...selectionProps}
            button={buttonPrimary}
            slot={slot ? [<React.Fragment key="slot">{slot}</React.Fragment>] : undefined}
        />
    );
};

const selectionCards = [DataCard, MediaCard, CoverCard, NakedCard, AdvancedSelectionCard];

describe.each(selectionCards)('explicit card selection (%#)', (Card) => {
    test.each(['checkbox', 'switch'] as const)(
        '%s selects from the surface and top selector',
        async (role) => {
            const onChange = jest.fn();
            renderWithTheme(
                <Card
                    title="Choose card"
                    {...(role === 'checkbox' ? {checkbox: {onChange}} : {switch: {onChange}})}
                />
            );
            const surface = screen.getByRole(role, {name: 'Choose card'});
            expect(surface).toHaveAttribute('aria-checked', 'false');
            await userEvent.click(surface);
            expect(surface).toHaveAttribute('aria-checked', 'true');
            expect(onChange).toHaveBeenCalledTimes(1);
            await userEvent.keyboard(' ');
            expect(surface).toHaveAttribute('aria-checked', 'false');
            expect(onChange).toHaveBeenCalledTimes(2);
        }
    );

    test('supports controlled selection and selected override', async () => {
        const onChange = jest.fn();
        const {rerender} = renderWithTheme(
            <Card title="Controlled" checkbox={{value: true, onChange}} selected={false} />
        );
        const surface = screen.getByRole('checkbox', {name: 'Controlled'});
        expect(surface).toHaveAttribute('aria-checked', 'false');
        await userEvent.click(surface);
        expect(onChange).toHaveBeenCalledWith(false);
        rerender(
            <ThemeContextProvider theme={makeTheme()}>
                <Card title="Controlled" checkbox={{value: false}} selected />
            </ThemeContextProvider>
        );
        expect(surface).toHaveAttribute('aria-checked', 'true');
    });

    test('disabled selection cannot be changed', async () => {
        const onChange = jest.fn();
        renderWithTheme(<Card title="Disabled" checkbox={{disabled: true, onChange}} />);
        const surface = screen.getByRole('checkbox', {name: 'Disabled'});
        await userEvent.click(surface);
        expect(surface).toHaveAttribute('aria-disabled', 'true');
        expect(onChange).not.toHaveBeenCalled();
    });

    test('radio arrows move selection and focus', async () => {
        renderWithTheme(
            <RadioGroup name="cards">
                <Card title="First" radioValue="first" />
                <Card title="Second" radioValue="second" />
            </RadioGroup>
        );
        const first = screen.getByRole('radio', {name: 'First'});
        const second = screen.getByRole('radio', {name: 'Second'});
        await userEvent.tab();
        expect(first).toHaveFocus();
        await userEvent.keyboard(' ');
        expect(first).toHaveAttribute('aria-checked', 'true');
        await userEvent.keyboard('{ArrowRight}');
        expect(second).toHaveFocus();
        expect(second).toHaveAttribute('aria-checked', 'true');
        expect(first).toHaveAttribute('aria-checked', 'false');
    });

    test.each([
        ['checkbox', Checkbox],
        ['switch', Switch],
    ] as const)('%s in a slot stays independent', async (role, Control) => {
        renderWithTheme(<Card title="Independent" slot={<Control name="option">Option</Control>} />);
        const control = screen.getByRole(role, {name: 'Option'});
        expect(screen.getAllByRole(role)).toHaveLength(1);
        await userEvent.click(screen.getByText('Independent'));
        expect(control).toHaveAttribute('aria-checked', 'false');
        await userEvent.click(control);
        expect(control).toHaveAttribute('aria-checked', 'true');
    });

    test('slot controls do not alter an explicit card selector', async () => {
        renderWithTheme(
            <Card
                title="Card"
                checkbox={{}}
                slot={<Checkbox name="independent">Independent option</Checkbox>}
            />
        );
        const surface = screen.getByRole('checkbox', {name: 'Card Independent option'});
        const slotControl = screen.getByRole('checkbox', {name: 'Independent option'});
        await userEvent.click(slotControl);
        expect(slotControl).toHaveAttribute('aria-checked', 'true');
        expect(surface).toHaveAttribute('aria-checked', 'false');
    });

    test('footer actions do not change selection', async () => {
        const onAction = jest.fn();
        renderWithTheme(
            <Card
                title="Card"
                checkbox={{defaultValue: true}}
                buttonPrimary={<ButtonPrimary onPress={onAction}>Action</ButtonPrimary>}
            />
        );
        await userEvent.click(screen.getByRole('button', {name: 'Action'}));
        expect(onAction).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('checkbox', {name: 'Card'})).toHaveAttribute('aria-checked', 'true');
    });

    test('a custom slot control can explicitly set selected', async () => {
        const Example = () => {
            const [selected, setSelected] = React.useState(false);
            return (
                <Card
                    title="Custom"
                    selected={selected}
                    slot={
                        <Checkbox name="custom" checked={selected} onChange={setSelected}>
                            Custom option
                        </Checkbox>
                    }
                />
            );
        };
        renderWithTheme(<Example />);
        await userEvent.click(screen.getByRole('checkbox', {name: 'Custom option'}));
        expect(screen.getByRole('checkbox', {name: 'Custom option'})).toHaveAttribute('aria-checked', 'true');
    });
});

test('advanced card custom actions remain independent', async () => {
    renderWithTheme(
        <AdvancedDataCard
            title="Independent action"
            actions={[
                <Checkbox key="option" name="option">
                    Option
                </Checkbox>,
            ]}
        />
    );
    const control = screen.getByRole('checkbox', {name: 'Option'});
    await userEvent.click(screen.getByText('Independent action'));
    expect(control).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
});
