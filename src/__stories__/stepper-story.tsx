// @flow
import * as React from 'react';
import {Stepper, ButtonPrimary, ButtonLayout, Stack} from '..';

const texts = ['Basic Details', 'Company Details', 'Subscription Plan', 'Payment Details', 'Confirmation'];

export default {
    title: 'Components/Others/Stepper',
};

export const Default: StoryComponent = () => {
    const [step, setStep] = React.useState(1);

    const stepDecrement = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const stepIncrement = () => {
        setStep((prevStep) => prevStep + 1);
    };

    return (
        <Stack space={32}>
            <div data-testid="stepper">
                <Stepper currentIndex={step} steps={texts} label="Progress" />
            </div>
            <ButtonLayout align="center">
                <ButtonPrimary onPress={stepDecrement} disabled={step === 0}>
                    Previous step
                </ButtonPrimary>
                <ButtonPrimary onPress={stepIncrement} disabled={step === texts.length - 1}>
                    Next step
                </ButtonPrimary>
            </ButtonLayout>
        </Stack>
    );
};

Default.storyName = 'Stepper';
