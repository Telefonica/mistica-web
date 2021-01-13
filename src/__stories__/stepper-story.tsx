// @flow
import * as React from 'react';
import {Stepper, ButtonPrimary, ButtonLayout, Stack} from '..';

const texts = [
    {text: 'Basic Details'},
    {text: 'Company Details'},
    {text: 'Subscription Plan'},
    {text: 'Payment Details'},
    {text: 'Confirmation'},
];

export default {
    title: 'Components/Others/Stepper',
};

export const Default: StoryComponent = () => {
    const [step, setStep] = React.useState(2);

    const stepDecrement = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const stepIncrement = () => {
        setStep((prevStep) => prevStep + 1);
    };

    return (
        <Stack space={32}>
            <div data-testid="stepper">
                <Stepper currentStep={step} steps={texts} />
            </div>
            <ButtonLayout align="center">
                <ButtonPrimary onPress={stepDecrement} disabled={step === 1}>
                    Previous step
                </ButtonPrimary>
                <ButtonPrimary onPress={stepIncrement} disabled={step === texts.length}>
                    Next step
                </ButtonPrimary>
            </ButtonLayout>
        </Stack>
    );
};

Default.storyName = 'Stepper';
