import {capitalize} from 'lodash';
import * as React from 'react';
import {Inline, Text2, skinVars, Tag, Avatar} from '..';
import {Placeholder} from '../placeholder';
import avatarImg from './images/avatar.jpg';

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
    return children ? (
        <div
            style={{
                boxSizing: 'border-box',
                border: `1px solid ${skinVars.colors.error}`,
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

const alignOptions = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'] as const;

type DefaultArgs = {
    space: (typeof spaceOptions)[number];
    align: (typeof alignOptions)[number];
};

export const Default: StoryComponent<DefaultArgs> = ({space, align}) => {
    return (
        <div data-testid="story">
            <Placeholder />
            <Inline space={(space.endsWith('px') ? parseInt(space) : space) as never} alignItems={align}>
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
        </div>
    );
};

Default.argTypes = {
    space: {
        options: spaceOptions,
        control: {type: 'select'},
    },
    align: {
        options: alignOptions,
        control: {type: 'select'},
    },
};

Default.args = {
    space: '16px',
    align: 'center',
};

Default.storyName = 'Inline';

type Args = {
    space: React.ComponentProps<typeof Inline>['space'];
    verticalSpace: React.ComponentProps<typeof Inline>['verticalSpace'];
    numItems: number;
};

export const Wrap: StoryComponent<Args> = ({space, verticalSpace, numItems}) => {
    const tagTypes = ['active', 'inactive', 'success', 'warning', 'error', 'promo', 'info'] as const;
    return (
        <Inline space={space} verticalSpace={verticalSpace} wrap>
            {Array.from({length: numItems}, (_, i) => {
                const type = tagTypes[i % tagTypes.length];
                return (
                    <Tag type={type} key={i}>
                        {capitalize(type)}
                    </Tag>
                );
            })}
        </Inline>
    );
};

Wrap.args = {
    space: 8,
    verticalSpace: 8,
    numItems: 50,
};

Wrap.argTypes = {
    space: {
        options: [0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64],
        control: {type: 'select'},
    },
    verticalSpace: {
        options: [0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64],
        control: {type: 'select'},
    },
};

Wrap.storyName = 'Inline wrap';

export const NegativeSpace: StoryComponent = () => {
    return (
        <Inline space={-16}>
            {Array.from({length: 8}, (_, i) => (
                <Avatar key={i} size={64} src={avatarImg} />
            ))}
        </Inline>
    );
};

NegativeSpace.storyName = 'Inline with negative space';
