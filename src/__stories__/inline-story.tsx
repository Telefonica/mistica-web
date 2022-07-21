import * as React from 'react';
import {Inline, Text2, useTheme} from '..';
import {Placeholder} from '../placeholder';
import {StorySection, useSelect} from './helpers';

export default {
    title: 'Layout/Inline',
};

const Row = ({
    children,
    padding = 0,
    align,
}: {
    children?: React.ReactNode;
    padding?: number;
    align?: string;
}) => {
    const {colors} = useTheme();

    return children ? (
        <div
            style={{
                boxSizing: 'border-box',
                border: `1px solid ${colors.error}`,
                padding,
                height: align === 'stretch' ? '100%' : 'auto',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Text2 regular>{children}</Text2>
        </div>
    ) : null;
};

const Null = () => null;
const ComponentThatReturnsNullComponent = () => <Null />;

const spaceOptions = [
    'between',
    'around',
    'evenly',
    '0px',
    '2px',
    '4px',
    '8px',
    '12px',
    '16px',
    '24px',
    '32px',
    '40px',
    '48px',
    '56px',
    '64px',
];

const alignOptions = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];

export const Default: StoryComponent = () => {
    const [space, spaceSelectField] = useSelect('Space', '32px', spaceOptions);
    const [align, alignSelectField] = useSelect('Align items', 'center', alignOptions);

    return (
        <>
            <Inline space={16}>
                {spaceSelectField}
                {alignSelectField}
            </Inline>
            <StorySection title="Inline example">
                <Placeholder />
                <Inline
                    space={(space.endsWith('px') ? parseInt(space) : space) as never}
                    alignItems={align as never}
                >
                    <ComponentThatReturnsNullComponent />
                    <Row padding={6} align={align}>
                        One
                    </Row>
                    {null}
                    {false}
                    <Row padding={16} align={align}>
                        Two
                    </Row>
                    <Row />
                    <Row />
                    <Row padding={32} align={align}>
                        Three
                    </Row>
                    <ComponentThatReturnsNullComponent />
                </Inline>
                <Placeholder />
            </StorySection>
        </>
    );
};

Default.storyName = 'Inline';
