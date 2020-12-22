// @flow
import * as React from 'react';
import Stepper from '../stepper';
import {StorySection} from './helpers';

const texts = ['Basic Details', 'Company Details', 'Subscription Plan', 'Payment Details', 'Confirmation'];

export default {
    title: 'Components/Others/Stepper',
    component: Stepper,
};

export const Default: StoryComponent = () => {
    return (
        <StorySection title="Stepper example">
            <Stepper currentStep={2} steps={texts.map((text) => ({text}))} />
        </StorySection>
    );
};
