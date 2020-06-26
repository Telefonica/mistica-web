import * as React from 'react';
import RadioButton, {RadioGroup} from '../radio-button';
import SectionTitle from '../section-title';
import {render, screen, within, fireEvent} from '@testing-library/react';

test('RadioGroup (uncontrolled)', () => {
    render(
        <div>
            <SectionTitle id="label">Choose a fruit</SectionTitle>
            <RadioGroup aria-labelledby="label" defaultValue="banana">
                <RadioButton value="banana" />
                <RadioButton value="apple" />
            </RadioGroup>
        </div>
    );

    const group = screen.getByLabelText('Choose a fruit');

    expect(group).toBeInTheDocument();
    const radios = within(group).getAllByRole('radio');

    expect(radios).toHaveLength(2);
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();

    fireEvent.click(radios[1]);

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
});

test('RadioGroup (controlled)', () => {
    const Component = () => {
        const [fruit, setFruit] = React.useState('apple');
        return (
            <div>
                <SectionTitle id="label">Choose a fruit</SectionTitle>
                <RadioGroup aria-labelledby="label" value={fruit} onChange={setFruit}>
                    <RadioButton value="banana" />
                    <RadioButton value="apple" />
                </RadioGroup>
                <div>you have selected {fruit}</div>
            </div>
        );
    };

    render(<Component />);

    expect(screen.getByText('you have selected apple')).toBeInTheDocument();

    const group = screen.getByLabelText('Choose a fruit');
    const radios = within(group).getAllByRole('radio');

    expect(radios).toHaveLength(2);

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();

    fireEvent.click(radios[0]);

    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();

    expect(screen.getByText('you have selected banana')).toBeInTheDocument();
});

test('Radio custom render', () => {
    render(
        <div>
            <SectionTitle id="label">Choose a fruit</SectionTitle>
            <RadioGroup aria-labelledby="label" defaultValue="banana">
                <RadioButton value="banana" render={(radio) => <div>banana {radio}</div>} />
                <RadioButton value="apple" render={(radio) => <div>apple {radio}</div>} />
            </RadioGroup>
        </div>
    );

    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('apple')).toBeInTheDocument();

    expect(screen.getByText('banana').parentElement).toBeChecked();
    expect(screen.getByText('apple').parentElement).not.toBeChecked();

    fireEvent.click(screen.getByText('apple'));

    expect(screen.getByText('banana').parentElement).not.toBeChecked();
    expect(screen.getByText('apple').parentElement).toBeChecked();
});
