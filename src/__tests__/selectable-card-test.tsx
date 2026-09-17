import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DataCard} from '../card-data';
import {MediaCard} from '../card-media';
import {CoverCard} from '../card-cover';
import {NakedCard} from '../card-naked';
import Checkbox from '../checkbox';
import Switch from '../switch-component';
import RadioButton, {RadioGroup} from '../radio-button';
import ThemeContextProvider from '../theme-context-provider';
import {ButtonPrimary} from '../button';
import {makeTheme} from './test-utils';
import {getSelectionOutlineVariant} from '../card-internal';
import {CardSelectionContext} from '../card-selection-context';

import type {Variant} from '../theme-variant-context';

const renderWithTheme = (children: React.ReactNode) =>
    render(<ThemeContextProvider theme={makeTheme()}>{children}</ThemeContextProvider>);

const SelectionObserver = ({children}: {children: React.ReactNode}) => {
    const [controls, setControls] = React.useState<Record<string, boolean>>({});
    return (
        <CardSelectionContext.Provider value={setControls}>
            <output aria-label="Selection">
                {Object.values(controls).some(Boolean) ? 'Selected' : 'Unselected'}
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
            const checkbox = await screen.findByRole('checkbox', {name: 'Option'});
            expect(screen.getAllByRole('button')).toEqual([screen.getByRole('button', {name: 'Action'})]);
            await userEvent.click(checkbox);
            expect(checkbox).toHaveAttribute('aria-checked', 'true');
            expect(onChange).toHaveBeenLastCalledWith(true);
            await userEvent.click(screen.getByRole('button', {name: 'Action'}));
            expect(onAction).toHaveBeenCalledTimes(1);
            expect(checkbox).toHaveAttribute('aria-checked', 'true');
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
