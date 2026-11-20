import * as React from 'react';
import {DataCard} from '../card-data';
import {MediaCard} from '../card-media';
import {CoverCard} from '../card-cover';
import AdvancedDataCard from '../community/advanced-data-card';
import {NakedCard} from '../card-naked';
import Checkbox from '../checkbox';
import Switch from '../switch-component';
import {RadioGroup} from '../radio-button';
import {ButtonPrimary} from '../button';

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
            : {selected};
    return (
        <AdvancedDataCard
            title={title}
            {...selectionProps}
            button={buttonPrimary}
            slot={slot ? [<React.Fragment key="slot">{slot}</React.Fragment>] : undefined}
        />
    );
};

const selectionCards = [DataCard, MediaCard, CoverCard, NakedCard, AdvancedSelectionCard];

export const Example = ({
    variant,
    mode = 'checkbox',
    value,
    onChange = () => {},
    onAction = () => {},
    onClose = () => {},
}: {
    variant: number;
    mode?:
        | 'checkbox'
        | 'switch'
        | 'controlled'
        | 'disabled'
        | 'radio'
        | 'slot-checkbox'
        | 'slot-switch'
        | 'explicit-slot'
        | 'footer'
        | 'custom'
        | 'navigation';
    value?: boolean;
    onChange?: (value: boolean) => void;
    onAction?: () => void;
    onClose?: () => void;
}): JSX.Element => {
    const Card = selectionCards[variant];
    const [selected, setSelected] = React.useState(false);
    if (mode === 'radio')
        return (
            <RadioGroup name="cards">
                <Card title="First" radioValue="first" />
                <Card title="Second" radioValue="second" />
            </RadioGroup>
        );
    if (mode === 'controlled') return <Card title="Controlled" checkbox={{value, onChange}} />;
    if (mode === 'disabled') return <Card title="Disabled" checkbox={{disabled: true, onChange}} />;
    if (mode === 'slot-checkbox' || mode === 'slot-switch') {
        const Control = mode === 'slot-checkbox' ? Checkbox : Switch;
        return <Card title="Independent" slot={<Control name="option">Option</Control>} />;
    }
    if (mode === 'explicit-slot')
        return (
            <Card
                title="Card"
                checkbox={{}}
                slot={<Checkbox name="independent">Independent option</Checkbox>}
            />
        );
    if (mode === 'footer')
        return (
            <Card
                title="Card"
                checkbox={{defaultValue: true}}
                buttonPrimary={<ButtonPrimary onPress={onAction}>Action</ButtonPrimary>}
            />
        );
    if (mode === 'custom')
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
    if (mode === 'navigation') {
        const NavigationCard = [DataCard, MediaCard, CoverCard, NakedCard, AdvancedDataCard][variant];
        return <NavigationCard title="Selected action" selected onPress={onAction} onClose={onClose} />;
    }
    return (
        <Card
            title="Choose card"
            {...(mode === 'checkbox' ? {checkbox: {onChange}} : {switch: {onChange}})}
        />
    );
};
export const AdvancedActions = (): JSX.Element => (
    <AdvancedDataCard
        title="Independent action"
        actions={[
            <Checkbox key="option" name="option">
                Option
            </Checkbox>,
        ]}
    />
);
