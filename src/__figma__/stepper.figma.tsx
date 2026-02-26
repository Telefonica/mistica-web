import React from 'react';
import Stepper from '../stepper';
import figma from '@figma/code-connect';

figma.connect(
    Stepper,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=0%3A2728',
    {
        props: {},
        example: () => <Stepper steps={['Step 1', 'Step 2', 'Step 3']} currentIndex={0} />,
    }
);
