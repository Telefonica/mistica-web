import * as React from 'react';
import {Stack, Text2} from '..';

export default {
    title: 'Layout/Stack',
    component: Stack,
    argTypes: {
        space: {
            options: ['between', 'around', 'evenly', '0', '4', '8', '16', '24', '32', '40', '48', '56', '64'],
            control: {type: 'select'},
        },
    },
    parameters: {
        fullScreen: true,
    },
};

const Row = ({children}: {children?: any}) => {
    return children ? (
        <div
            style={{
                padding: 16,
                border: `2px solid gray`,
                background: 'lightgray',
            }}
        >
            <Text2 regular>{children}</Text2>
        </div>
    ) : null;
};

const Null = () => null;
const ComponentThatReturnsNullComponent = () => <Null />;

type Args = {
    space: string;
    'aria-live': 'off' | 'polite' | 'assertive';
    'aria-atomic': boolean;
};

export const Default: StoryComponent<Args> = ({space, 'aria-live': ariaLive, 'aria-atomic': ariaAtomic}) => (
    <div style={{height: '100vh'}}>
        <Stack
            space={(Number.isInteger(+space) ? +space : space) as never}
            aria-live={ariaLive}
            aria-atomic={ariaAtomic}
        >
            <ComponentThatReturnsNullComponent />
            <Row>One</Row>
            {null}
            {false}
            <Row>Two</Row>
            <Row />
            <Row />
            <Row>Three</Row>
            <Row>Four</Row>
            <ComponentThatReturnsNullComponent />
        </Stack>
    </div>
);

Default.storyName = 'Stack';
Default.args = {
    space: '32',
    'aria-live': 'off' as const,
    'aria-atomic': false as const,
};
Default.argTypes = {
    space: {control: {type: 'select'}},
    'aria-live': {
        options: ['off', 'polite', 'assertive'],
        control: {type: 'select'},
    },
    'aria-atomic': {control: {type: 'boolean'}},
};
