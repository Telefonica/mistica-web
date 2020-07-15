import * as React from 'react';
import Stack from '../stack';
import {StorySection} from './helpers';
import Select from '../select';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components|Layouts/Stack',
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
const alignOptions = [
    {value: 'vertical', text: 'Vertical'},
    {value: 'horizontal', text: 'Horizontal'},
];

export const Default: StoryComponent = () => {
    const [space, setSpace] = React.useState('32');
    const [align, setAlign] = React.useState('vertical');

    return (
        <>
            <Select required label="Space" value={space} options={options} onChangeValue={setSpace} />
            <div style={{height: 16}}></div>
            <Select required label="Align" value={align} options={alignOptions} onChangeValue={setAlign} />

            <StorySection title="Stack example">
                <Placeholder height={48} />
                <Stack align={align as 'vertical' | 'horizontal'} space={+space as any}>
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

Default.story = {name: 'Stack'};
