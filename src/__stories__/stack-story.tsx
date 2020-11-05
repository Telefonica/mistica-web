import * as React from 'react';
import Stack from '../stack';
import {StorySection, useSelect} from './helpers';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Layouts/Stack',
};

const Row = ({children}: {children?: any}) =>
    children ? <div style={{border: '1px solid red', padding: 16}}>{children}</div> : null;

const Null = () => null;
const ComponentThatReturnsNullComponent = () => <Null />;

const options = ['0px', '4px', '8px', '16px', '24px', '32px', '40px', '48px', '56px', '64px'];

export const Default: StoryComponent = () => {
    const [iconSize, iconSizeSelectField] = useSelect('Space', '32px', options);

    return (
        <>
            {iconSizeSelectField}
            <StorySection title="Stack example">
                <Placeholder height={48} />
                <Stack space={+iconSize.replace(/[^0-9]/g, '') as any}>
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

Default.storyName = 'Stack';
