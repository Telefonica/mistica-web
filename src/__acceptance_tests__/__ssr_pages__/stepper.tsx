import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Stepper} from '../../..';

const StepperTest = (): JSX.Element => (
    <Stepper currentIndex={1} steps={['Foo', 'Bar', 'Baz']} aria-label="Progress" />
);

export default StepperTest;
