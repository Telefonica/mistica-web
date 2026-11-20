import * as React from 'react';
import {Slider, IntegerField, Form, ButtonPrimary} from '..';

export const Basic = ({
    controlled = false,
    ...props
}: React.ComponentProps<typeof Slider> & {controlled?: boolean}): JSX.Element => {
    const [value, setValue] = React.useState(0);
    return <Slider {...props} {...(controlled ? {value, onChangeValue: setValue} : {})} />;
};
export const InForm = ({onSubmit}: {onSubmit: (...args: Array<unknown>) => void}): JSX.Element => (
    <Form onSubmit={onSubmit} initialValues={{slider: 0}}>
        <Slider name="slider" />
        <ButtonPrimary submit>done!</ButtonPrimary>
    </Form>
);
export const Accessible = (): JSX.Element => (
    <>
        <Slider name="slider1" aria-label="slider1" />
        <label htmlFor="slider2">slider2</label>
        <Slider name="slider2" id="slider2" />
        <div id="slider3">slider3</div>
        <Slider name="slider3" aria-labelledby="slider3" />
    </>
);
export const Reactive = ({onChange}: {onChange: (value: number) => void}): JSX.Element => {
    const [min, setMin] = React.useState(0);
    const [max, setMax] = React.useState(10);
    const [step, setStep] = React.useState(1);
    return (
        <>
            <Slider name="slider" min={min} max={max} step={step} onChangeValue={onChange} />
            {[
                {name: 'min', value: min, set: setMin},
                {name: 'max', value: max, set: setMax},
                {name: 'step', value: step, set: setStep},
            ].map(({name, value, set}) => (
                <IntegerField
                    key={name}
                    label={name}
                    name={name}
                    defaultValue={String(value)}
                    onChangeValue={(value) => {
                        if (value !== '') set(+value);
                    }}
                />
            ))}
        </>
    );
};
