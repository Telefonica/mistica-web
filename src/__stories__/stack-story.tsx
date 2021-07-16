import * as React from 'react';
import {Stack, Text2} from '..';

export default {
    title: 'Components/Layouts/Stack',
    component: Stack,
    argTypes: {
        space: {
            options: ['between', 'around', 'evenly', '0', '4', '8', '16', '24', '32', '40', '48', '56', '64'],
            control: {type: 'select'},
        },
    },
    parameters: {
        fullscreen: true,
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
};

export const Default: StoryComponent<Args> = ({space}) => (
    <div style={{height: '100vh'}}>
        <Stack space={(Number.isInteger(+space) ? +space : space) as never}>
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
};
