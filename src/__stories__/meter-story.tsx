import * as React from 'react';
import {Box, Meter, ResponsiveLayout} from '..';
import beachImg from './images/beach.jpg';

import type {MeterType} from '../meter';

type MeterExtraAlignment = 'start' | 'center' | 'end';

export default {
    title: 'Components/Data Visualizations/Meter',
    argTypes: {
        type: {
            options: ['angular', 'circular', 'linear'] as Array<MeterType>,
            control: {type: 'select'},
        },
        themeVariant: {
            options: ['default', 'inverse', 'media'],
            control: {type: 'select'},
        },
        valuesCount: {
            control: {type: 'range', min: 1, max: 8, step: 1},
        },
        fullWidth: {
            control: {type: 'boolean'},
        },
        width: {
            if: {arg: 'fullWidth', eq: false},
            control: {type: 'range', min: 64, max: 600, step: 1},
        },
        value1: {
            control: {type: 'range', min: 0, max: 100, step: 1},
        },
        value2: {
            control: {type: 'range', min: 0, max: 100, step: 1},
        },
        value3: {
            control: {type: 'range', min: 0, max: 100, step: 1},
        },
        value4: {
            control: {type: 'range', min: 0, max: 100, step: 1},
        },
        value5: {
            control: {type: 'range', min: 0, max: 100, step: 1},
        },
        value6: {
            control: {type: 'range', min: 0, max: 100, step: 1},
        },
        value7: {
            control: {type: 'range', min: 0, max: 100, step: 1},
        },
        value8: {
            control: {type: 'range', min: 0, max: 100, step: 1},
        },
        extraAlignment: {
            options: ['start', 'center', 'end'] as Array<MeterExtraAlignment>,
            control: {type: 'select'},
        },
    },
    parameters: {
        fullScreen: true,
    },
};

type MeterStoryArgs = {
    type: MeterType;
    reverse: boolean;
    ariaLabel: string;
    themeVariant: 'default' | 'inverse' | 'media';
    fullWidth: boolean;
    width: number;
    valuesCount: number;
    value1: number;
    value2: number;
    value3: number;
    value4: number;
    value5: number;
    value6: number;
    value7: number;
    value8: number;
    extraContent: string;
    extraAlignment: MeterExtraAlignment;
};

export const MeterStory: StoryComponent<MeterStoryArgs> = ({
    type,
    reverse,
    themeVariant,
    valuesCount,
    fullWidth,
    width,
    ariaLabel,
    extraContent,
    extraAlignment,
    ...valuesArgs
}) => {
    const values = Object.values(valuesArgs).slice(0, valuesCount);
    return (
        <div
            style={{
                backgroundImage: themeVariant === 'media' ? `url(${beachImg})` : '',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <ResponsiveLayout variant={themeVariant} fullWidth>
                <Box padding={16}>
                    <Meter
                        aria-label={ariaLabel || undefined}
                        type={type}
                        reverse={reverse}
                        values={values}
                        width={fullWidth ? '100%' : width}
                        extra={
                            extraContent ? (
                                <div
                                    style={{
                                        alignSelf: extraAlignment,
                                        justifyContent: 'center',
                                        ...(type === 'linear' ? {} : {margin: '0 auto'}),
                                    }}
                                >
                                    <div>{extraContent}</div>
                                </div>
                            ) : undefined
                        }
                    />
                </Box>
            </ResponsiveLayout>
        </div>
    );
};

MeterStory.storyName = 'Meter';
MeterStory.args = {
    type: 'angular',
    reverse: false,
    ariaLabel: 'Meter example',
    themeVariant: 'default',
    fullWidth: false,
    width: 400,
    valuesCount: 8,
    value1: 10,
    value2: 10,
    value3: 10,
    value4: 10,
    value5: 10,
    value6: 10,
    value7: 10,
    value8: 10,
    extraContent: 'This is a small extra',
    extraAlignment: 'center',
};
