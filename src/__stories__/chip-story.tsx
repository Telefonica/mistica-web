import * as React from 'react';
import {
    Box,
    Checkbox,
    Chip,
    IconLightningFilled,
    Inline,
    RadioButton,
    RadioGroup,
    ResponsiveLayout,
} from '..';

import type {DataAttributes} from '../utils/types';

const badgeOptions = ['0', '2', '14', 'undefined'];

export default {
    title: 'Components/Chip',
    parameters: {fullScreen: true},
};

type Args = {
    inverse: boolean;
    icon: boolean;
    closable: boolean;
    badge: string;
};

type Props = {
    inverse: boolean;
    children: React.ReactNode;
    dataAttributes: DataAttributes;
};

const ChipBackgroundContainer = ({inverse, dataAttributes, children}: Props) => (
    <ResponsiveLayout isInverse={inverse} fullWidth>
        <Box padding={16} width="fit-content" dataAttributes={dataAttributes}>
            <div
                style={{
                    // prevent line-height from affecting the height of the container;
                    // happens when changing the base font size
                    lineHeight: 0,
                }}
            >
                {children}
            </div>
        </Box>
    </ResponsiveLayout>
);

export const Default: StoryComponent<Args> = ({inverse, icon, closable, badge}) => {
    const props = {
        Icon: icon ? IconLightningFilled : undefined,
        badge: badge !== 'undefined' ? +badge : undefined,
    };

    return (
        <ChipBackgroundContainer dataAttributes={{testid: 'chip'}} inverse={inverse}>
            {closable ? (
                <Chip onClose={() => window.alert('closed')} {...props}>
                    Chip
                </Chip>
            ) : (
                <Chip {...props}>Chip</Chip>
            )}
        </ChipBackgroundContainer>
    );
};

export const SingleSelection: StoryComponent<Omit<Args, 'closable'>> = ({inverse, badge, icon}) => {
    const props = {
        Icon: icon ? IconLightningFilled : undefined,
        badge: badge !== 'undefined' ? +badge : undefined,
    };

    return (
        <ChipBackgroundContainer dataAttributes={{testid: 'chip-single-selection'}} inverse={inverse}>
            <RadioGroup name="chip-group" defaultValue="1">
                <Inline space={8}>
                    <RadioButton
                        value="1"
                        render={({checked, labelId}) => (
                            <Chip active={checked} id={labelId} {...props}>
                                Chip 1
                            </Chip>
                        )}
                    />
                    <RadioButton
                        value="2"
                        render={({checked, labelId}) => (
                            <Chip active={checked} id={labelId} {...props}>
                                Chip 2
                            </Chip>
                        )}
                    />
                    <RadioButton
                        value="3"
                        render={({checked, labelId}) => (
                            <Chip active={checked} id={labelId} {...props}>
                                Chip 3
                            </Chip>
                        )}
                    />
                </Inline>
            </RadioGroup>
        </ChipBackgroundContainer>
    );
};

export const MultipleSelection: StoryComponent<Omit<Args, 'closable'>> = ({inverse, badge, icon}) => {
    const props = {
        Icon: icon ? IconLightningFilled : undefined,
        badge: badge !== 'undefined' ? +badge : undefined,
    };

    return (
        <ChipBackgroundContainer dataAttributes={{testid: 'chip-multiple-selection'}} inverse={inverse}>
            <Inline space={8}>
                <Checkbox
                    name="chip-checkbox-1"
                    render={({labelId, checked}) => (
                        <Chip active={checked} id={labelId} {...props}>
                            Chip 1
                        </Chip>
                    )}
                />
                <Checkbox
                    name="chip-checkbox-2"
                    render={({labelId, checked}) => (
                        <Chip active={checked} id={labelId} {...props}>
                            Chip 2
                        </Chip>
                    )}
                />
                <Checkbox
                    name="chip-checkbox-3"
                    render={({labelId, checked}) => (
                        <Chip active={checked} id={labelId} {...props}>
                            Chip 3
                        </Chip>
                    )}
                />
            </Inline>
        </ChipBackgroundContainer>
    );
};

const defaultArgs = {
    inverse: false,
    badge: '0',
    icon: false,
    closable: false,
};

const defaultArgTypes = {
    badge: {
        options: badgeOptions,
        control: {type: 'select'},
    },
};

Default.storyName = 'Chip';
Default.argTypes = defaultArgTypes;
Default.args = defaultArgs;

SingleSelection.argTypes = defaultArgTypes;
SingleSelection.args = {...(({closable, ...o}) => o)(defaultArgs)};

MultipleSelection.argTypes = defaultArgTypes;
MultipleSelection.args = {...(({closable, ...o}) => o)(defaultArgs)};
