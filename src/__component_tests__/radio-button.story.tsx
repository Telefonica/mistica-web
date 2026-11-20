import * as React from 'react';
import RadioButton, {RadioGroup} from '../radio-button';
import {ButtonPrimary, Form, Title1} from '..';

export const Fruit = ({
    mode = 'uncontrolled',
    defaultValue,
    custom = false,
    focusButton = false,
    onChange = () => {},
}: {
    mode?: 'uncontrolled' | 'controlled' | 'immutable' | 'disabled';
    defaultValue?: string;
    custom?: boolean;
    focusButton?: boolean;
    onChange?: (value: string) => void;
}): JSX.Element => {
    const [value, setValue] = React.useState(defaultValue ?? 'banana');
    return (
        <>
            <Title1 id="label">Choose a fruit</Title1>
            {focusButton && <ButtonPrimary onPress={() => {}}>Focus me first</ButtonPrimary>}
            <RadioGroup
                name="radio-group"
                aria-labelledby="label"
                disabled={mode === 'disabled'}
                {...(mode === 'controlled' || mode === 'immutable'
                    ? {
                          value,
                          onChange: (next: string) => {
                              onChange(next);
                              if (mode === 'controlled') setValue(next);
                          },
                      }
                    : {defaultValue, onChange})}
            >
                {['banana', 'apple'].map((fruit) => (
                    <RadioButton
                        key={fruit}
                        value={fruit}
                        render={
                            custom
                                ? ({controlElement}) => (
                                      <div>
                                          {fruit} {controlElement}
                                      </div>
                                  )
                                : undefined
                        }
                    />
                ))}
            </RadioGroup>
            {mode === 'controlled' && <div>you have selected {value}</div>}
        </>
    );
};
export const FormFruit = ({
    controlled = false,
    onSubmit,
}: {
    controlled?: boolean;
    onSubmit: (...args: Array<unknown>) => void;
}): JSX.Element => (
    <Form onSubmit={onSubmit} initialValues={controlled ? undefined : {'radio-group': 'apple'}}>
        <Fruit
            custom
            mode={controlled ? 'controlled' : 'uncontrolled'}
            defaultValue={controlled ? 'banana' : undefined}
        />
        <ButtonPrimary submit>done!</ButtonPrimary>
    </Form>
);
export const Propagation = ({onPress}: {onPress: () => void}): JSX.Element => (
    <button onClick={onPress}>
        <RadioGroup name="radio-group" aria-label="Choose a fruit">
            <RadioButton value="banana" />
        </RadioGroup>
    </button>
);
