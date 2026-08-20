import * as React from 'react';
import {Stepper} from '../../..';

const StepperTest = (): JSX.Element => (
    <Stepper currentIndex={1} steps={['Foo', 'Bar', 'Baz']} aria-label="Progress" />
);

export default StepperTest;
