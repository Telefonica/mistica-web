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
import RadioButton, {RadioGroup} from '../radio-button';
import ThemeContextProvider from '../theme-context-provider';
import {ButtonPrimary} from '../button';
import {makeTheme} from './test-utils';
import {getSelectionOutlineVariant} from '../card-internal';
import {CardSelectionContext} from '../card-selection-context';

import type {CardSelectionControl} from '../card-selection-context';
import type {Variant} from '../theme-variant-context';

const renderWithTheme = (children: React.ReactNode) =>
    render(<ThemeContextProvider theme={makeTheme()}>{children}</ThemeContextProvider>);

const SelectionObserver = ({children}: {children: React.ReactNode}) => {
    const [controls, setControls] = React.useState<Record<string, CardSelectionControl>>({});
    return (
        <CardSelectionContext.Provider value={{setControls}}>
            <output aria-label="Selection">
                {Object.values(controls).some((control) => control.checked) ? 'Selected' : 'Unselected'}
            </output>
            {children}
        </CardSelectionContext.Provider>
    );
};

test.each([
    ['checkbox', Checkbox],
    ['switch', Switch],
] as const)('%s reports its controlled and uncontrolled state', async (role, Control) => {
    const {rerender} = renderWithTheme(
        <SelectionObserver>
            <Control name="option" defaultChecked>
                Option
            </Control>
        </SelectionObserver>
    );
    expect(screen.getByRole('status', {name: 'Selection'})).toHaveTextContent('Selected');
    await userEvent.click(screen.getByRole(role, {name: 'Option'}));
    expect(screen.getByRole('status', {name: 'Selection'})).toHaveTextContent('Unselected');
    rerender(
        <ThemeContextProvider theme={makeTheme()}>
            <SelectionObserver>
                <Control name="option" checked>
                    Option
                </Control>
            </SelectionObserver>
        </ThemeContextProvider>
    );
    expect(screen.getByRole('status', {name: 'Selection'})).toHaveTextContent('Selected');
});

test('radio context changes update card selection', async () => {
    renderWithTheme(
        <RadioGroup name="options" defaultValue="first">
            <SelectionObserver>
                <RadioButton value="first">First</RadioButton>
            </SelectionObserver>
            <RadioButton value="second">Second</RadioButton>
        </RadioGroup>
    );
    expect(screen.getByRole('status', {name: 'Selection'})).toHaveTextContent('Selected');
    await userEvent.click(screen.getByRole('radio', {name: 'Second'}));
    expect(screen.getByRole('status', {name: 'Selection'})).toHaveTextContent('Unselected');
});

test('unmounting a checked control preserves other controls and clears its selection', async () => {
    const Example = () => {
        const [showFirst, setShowFirst] = React.useState(true);
        return (
            <SelectionObserver>
                {showFirst && (
                    <Checkbox name="first" defaultChecked>
                        First
                    </Checkbox>
                )}
                <Checkbox name="second" defaultChecked>
                    Second
                </Checkbox>
                <button onClick={() => setShowFirst(false)}>Remove first</button>
            </SelectionObserver>
        );
    };
    renderWithTheme(<Example />);
    await userEvent.click(screen.getByRole('button', {name: 'Remove first'}));
    expect(screen.getByRole('status', {name: 'Selection'})).toHaveTextContent('Selected');
    await userEvent.click(screen.getByRole('checkbox', {name: 'Second'}));
    expect(screen.getByRole('status', {name: 'Selection'})).toHaveTextContent('Unselected');
});

describe.each([
    ['DataCard', DataCard],
    ['MediaCard', MediaCard],
    ['CoverCard', CoverCard],
    ['NakedCard', NakedCard],
] as const)('%s', (_, Card) => {
    test.each(['slot', 'footerSlot'] as const)(
        'uses an existing checkbox in %s and keeps footer actions independent',
        async (slot) => {
            const onAction = jest.fn();
            const onChange = jest.fn();
            renderWithTheme(
                <Card
                    title="Card"
                    showFooter
                    onClose={() => {}}
                    {...{
                        [slot]: (
                            <Checkbox name="option" onChange={onChange}>
                                Option
                            </Checkbox>
                        ),
                    }}
                    buttonPrimary={<ButtonPrimary onPress={onAction}>Action</ButtonPrimary>}
                />
            );
            const checkbox = await screen.findByRole('checkbox', {
                name: slot === 'slot' ? 'Card Option' : 'Card',
            });
            expect(screen.getAllByRole('button')).toEqual([screen.getByRole('button', {name: 'Action'})]);
            await userEvent.click(checkbox);
            expect(checkbox).toHaveAttribute('aria-checked', 'true');
            expect(onChange).toHaveBeenLastCalledWith(true);
            await userEvent.click(screen.getByRole('button', {name: 'Action'}));
            expect(onAction).toHaveBeenCalledTimes(1);
            expect(checkbox).toHaveAttribute('aria-checked', 'true');
            await userEvent.click(screen.getByText('Option'));
            expect(checkbox).toHaveAttribute('aria-checked', 'false');
        }
    );
});

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
    title,
    onPress,
    selected,
    topActions,
}: React.ComponentProps<typeof DataCard>) => (
    <AdvancedDataCard
        title={title}
        onPress={onPress}
        selected={selected}
        actions={topActions}
        slot={slot ? [<React.Fragment key="slot">{slot}</React.Fragment>] : undefined}
    />
);

const selectionCards = [DataCard, MediaCard, CoverCard, NakedCard, AdvancedSelectionCard];

describe.each(selectionCards)('card surface selection (%#)', (Card) => {
    test.each([
        ['checkbox', Checkbox],
        ['switch', Switch],
    ] as const)('the surface owns the %s interaction and replaces navigation', async (role, Control) => {
        const onPress = jest.fn();
        const onChange = jest.fn();
        const control = (
            <Control name="option" onChange={onChange}>
                Option
            </Control>
        );
        renderWithTheme(<Card title="Choose this card" onPress={onPress} slot={control} />);
        const surface = screen.getByRole(role, {name: 'Choose this card Option'});
        expect(screen.getAllByRole(role)).toHaveLength(1);
        await userEvent.click(screen.getByText('Choose this card'));
        expect(surface).toHaveAttribute('aria-checked', 'true');
        expect(surface).toHaveFocus();
        expect(onChange).toHaveBeenCalledTimes(1);
        await userEvent.keyboard(' ');
        expect(surface).toHaveAttribute('aria-checked', 'false');
        expect(onPress).not.toHaveBeenCalled();
        await userEvent.click(screen.getByText('Option'));
        expect(surface).toHaveAttribute('aria-checked', 'true');
        expect(onChange).toHaveBeenCalledTimes(3);
    });

    test('disabled controls cannot be activated from the surface', async () => {
        const onChange = jest.fn();
        const control = (
            <Checkbox name="option" disabled onChange={onChange}>
                Option
            </Checkbox>
        );
        renderWithTheme(<Card title="Disabled" slot={control} />);
        await userEvent.click(screen.getByText('Disabled'));
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true');
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
        expect(onChange).not.toHaveBeenCalled();
    });

    test('radio arrows move selection and focus between card surfaces', async () => {
        renderWithTheme(
            <RadioGroup name="options">
                {['First', 'Second'].map((title) => {
                    const control = <RadioButton value={title}>Option</RadioButton>;
                    return <Card key={title} title={title} slot={control} />;
                })}
            </RadioGroup>
        );
        const first = screen.getByRole('radio', {name: 'First Option'});
        const second = screen.getByRole('radio', {name: 'Second Option'});
        await userEvent.tab();
        expect(first).toHaveFocus();
        await userEvent.keyboard(' ');
        expect(first).toHaveAttribute('aria-checked', 'true');
        await userEvent.keyboard('{ArrowRight}');
        expect(second).toHaveFocus();
        expect(first).toHaveAttribute('aria-checked', 'false');
        expect(second).toHaveAttribute('aria-checked', 'true');
        await userEvent.keyboard('{ArrowLeft}');
        expect(first).toHaveFocus();
    });

    test('custom checkbox render keeps automatic selection', async () => {
        const control = (
            <Checkbox
                name="custom"
                aria-label="Choose"
                render={({checked}) => <span>{checked ? 'Chosen' : 'Choose'}</span>}
            />
        );
        renderWithTheme(<Card title="Custom" slot={control} />);
        await userEvent.click(screen.getByText('Custom'));
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByText('Chosen')).toBeInTheDocument();
    });
});

test('advanced card footer actions do not change selection', async () => {
    const onAction = jest.fn();
    renderWithTheme(
        <AdvancedDataCard
            title="Advanced"
            slot={[
                <Checkbox key="option" name="option">
                    Option
                </Checkbox>,
            ]}
            button={<ButtonPrimary onPress={onAction}>Action</ButtonPrimary>}
        />
    );
    await userEvent.click(screen.getByText('Advanced'));
    await userEvent.click(screen.getByRole('button', {name: 'Action'}));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
});

test('removing a second control preserves the remaining uncontrolled selection', async () => {
    const Example = () => {
        const [multiple, setMultiple] = React.useState(true);
        return (
            <>
                <button onClick={() => setMultiple(false)}>Remove second</button>
                <DataCard
                    title="Card"
                    slot={
                        <>
                            <Checkbox name="first">First</Checkbox>
                            {multiple && <Checkbox name="second">Second</Checkbox>}
                        </>
                    }
                />
            </>
        );
    };
    renderWithTheme(<Example />);
    await userEvent.click(screen.getByRole('checkbox', {name: 'First'}));
    await userEvent.click(screen.getByRole('button', {name: 'Remove second'}));
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
});

test('selection replaces the segregated primary card action', async () => {
    const onPress = jest.fn();
    renderWithTheme(
        <DataCard
            title="Select this card"
            onPress={onPress}
            segregateTouchableContent
            slot={<Checkbox name="option">Option</Checkbox>}
        />
    );
    await userEvent.click(screen.getByText('Select this card'));
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

describe.each(selectionCards)('top action selection (%#)', (Card) => {
    test.each([
        ['checkbox', Checkbox],
        ['switch', Switch],
    ] as const)('%s selects from the card and the top control', async (role, Control) => {
        const onChange = jest.fn();
        renderWithTheme(
            <Card
                title="Choose"
                topActions={[
                    <ButtonPrimary key="action" onPress={() => {}}>
                        Other action
                    </ButtonPrimary>,
                    <Control key="control" name="option" onChange={onChange}>
                        Option
                    </Control>,
                ]}
            />
        );
        const surface = screen.getByRole(role, {name: 'Choose'});
        expect(screen.queryByRole('button', {name: 'Other action'})).not.toBeInTheDocument();
        await userEvent.click(surface);
        expect(surface).toHaveAttribute('aria-checked', 'true');
        await userEvent.click(screen.getByText('Option'));
        expect(surface).toHaveAttribute('aria-checked', 'false');
        expect(surface).toHaveFocus();
        expect(onChange).toHaveBeenCalledTimes(2);
    });

    test('radio top actions share selection and keyboard navigation', async () => {
        renderWithTheme(
            <RadioGroup name="choices">
                <Card
                    title="First"
                    topActions={[
                        <RadioButton key="first" value="first">
                            First option
                        </RadioButton>,
                    ]}
                />
                <Card
                    title="Second"
                    topActions={[
                        <RadioButton key="second" value="second">
                            Second option
                        </RadioButton>,
                    ]}
                />
            </RadioGroup>
        );
        await userEvent.click(screen.getByRole('radio', {name: 'First'}));
        await userEvent.keyboard('{ArrowRight}');
        expect(screen.getByRole('radio', {name: 'Second'})).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByRole('radio', {name: 'Second'})).toHaveFocus();
        expect(screen.getByRole('radio', {name: 'First'})).toHaveAttribute('aria-checked', 'false');
    });
});
