import React from 'react';
import {ProgressBar, ProgressBarStepped} from '../progress-bar';
import figma from '@figma/code-connect';

const progressBarProps = {
    reverse: figma.boolean('Reverse'),
    progressPercent: figma.enum('Progress', {
        '0%': 0,
        '10%': 10,
        '20%': 20,
        '30%': 30,
        '40%': 40,
        '50%': 50,
        '60%': 60,
        '70%': 70,
        '80%': 80,
        '90%': 90,
        '100%': 100,
    }),
};

// Desktop
figma.connect(
    ProgressBar,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=571%3A7442',
    {
        props: progressBarProps,
        example: (props) => <ProgressBar progressPercent={props.progressPercent} reverse={props.reverse} />,
    }
);

figma.connect(
    ProgressBarStepped,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=13350%3A186',
    {
        props: {
            steps: figma.enum('Steps', {
                '2': 2,
                '3': 3,
                '4': 4,
                '5': 5,
                '6': 6,
            }),
            currentStep: figma.enum('Current step', {
                '1': 1,
                '2': 2,
                '3': 3,
                '4': 4,
                '5': 5,
                '6': 6,
            }),
        },
        example: (props) => <ProgressBarStepped steps={props.steps} currentStep={props.currentStep} />,
    }
);

// Mobile
figma.connect(
    ProgressBar,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=571%3A7442',
    {
        props: progressBarProps,
        example: (props) => <ProgressBar progressPercent={props.progressPercent} reverse={props.reverse} />,
    }
);
