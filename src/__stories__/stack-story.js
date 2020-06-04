// @flow
import * as React from 'react';
import Stack from '../stack';
import {StorySection} from './helpers';
import Select from '../select';
import Placeholder from '../placeholder';

export default {
    title: 'Components|Layout',
};

const Row = ({children}: {children?: any}) =>
    children ? <div style={{border: '1px solid red', padding: 16}}>{children}</div> : null;

const Null = () => null;
const ComponentThatReturnsNullComponent = () => <Null />;

const options = [
    {value: '0', text: '0px'},
    {value: '4', text: '4px'},
    {value: '8', text: '8px'},
    {value: '16', text: '16px'},
    {value: '24', text: '24px'},
    {value: '32', text: '32px'},
    {value: '40', text: '40px'},
    {value: '48', text: '48px'},
    {value: '56', text: '56px'},
    {value: '64', text: '64px'},
];

export const StackExample = (): React.Node => {
    const [space, setSpace] = React.useState('32');

    return (
        <>
            <Select required label="Space" value={space} options={options} onChangeValue={setSpace} />

            <StorySection title="Stack example">
                <Placeholder height={48} />
                <Stack space={(+space: any)}>
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
                <Placeholder height={48} />
            </StorySection>
        </>
    );
};
