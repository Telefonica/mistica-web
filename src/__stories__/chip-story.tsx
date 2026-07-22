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

import type {Variant} from '../theme-variant-context';
import type {DataAttributes} from '../utils/types';

const badgeOptions = ['0', '2', '14', 'undefined'];

export default {
    title: 'Components/Chip',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    variantOutside: Variant;
    icon: boolean;
    closable: boolean;
    active: boolean;
    badge: string;
    href: string;
    small: boolean;
};

type Props = {
    variant: Variant;
    children: React.ReactNode;
    dataAttributes: DataAttributes;
};

const ChipBackgroundContainer = ({variant, dataAttributes, children}: Props) => (
    <ResponsiveLayout variant={variant} fullWidth>
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

export const Default: StoryComponent<Args> = ({
    variantOutside,
    icon,
    closable,
    badge,
    active: chipActive,
    href: hrefProp,
    small,
}) => {
    const props = {
        Icon: icon ? IconLightningFilled : undefined,
        badge: badge !== 'undefined' ? +badge : undefined,
        href: hrefProp !== 'undefined' ? hrefProp : '',
        active: chipActive,
        small,
    };

    const {href, active, ...rest} = props;

    return (
        <ChipBackgroundContainer dataAttributes={{testid: 'chip'}} variant={variantOutside}>
            {closable ? (
                <Chip onClose={() => window.alert('closed')} {...rest}>
                    Chip
                </Chip>
            ) : (
                <Chip {...props}>Chip</Chip>
            )}
        </ChipBackgroundContainer>
    );
};

export const SingleSelection: StoryComponent<Omit<Args, 'closable'>> = ({
    variantOutside,
    badge,
    icon,
    small,
}) => {
    const props = {
        Icon: icon ? IconLightningFilled : undefined,
        badge: badge !== 'undefined' ? +badge : undefined,
        small,
    };

    return (
        <ChipBackgroundContainer dataAttributes={{testid: 'chip-single-selection'}} variant={variantOutside}>
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

export const MultipleSelection: StoryComponent<Omit<Args, 'closable'>> = ({
    variantOutside,
    badge,
    icon,
    small,
}) => {
    const props = {
        Icon: icon ? IconLightningFilled : undefined,
        badge: badge !== 'undefined' ? +badge : undefined,
        small,
    };

    return (
        <ChipBackgroundContainer
            dataAttributes={{testid: 'chip-multiple-selection'}}
            variant={variantOutside}
        >
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
export const NavigableChip: StoryComponent<{
    variantOutside: Variant;
    icon: boolean;
    badge: string;
    small: boolean;
}> = ({variantOutside, icon, badge, small}) => {
    const props = {
        Icon: icon ? IconLightningFilled : undefined,
        badge: badge !== 'undefined' ? +badge : undefined,
        href: 'https://example.com',
        active: true,
        small,
    };

    return (
        <ChipBackgroundContainer dataAttributes={{testid: 'navigable-chip'}} variant={variantOutside}>
            <Chip {...props}>Chip</Chip>
        </ChipBackgroundContainer>
    );
};

const defaultArgs = {
    variantOutside: 'default',
    active: false,
    badge: '0',
    icon: false,
    closable: false,
    small: false,
    href: 'undefined',
} as const;

const navigableArgs = {
    variantOutside: 'default',
    badge: '0',
    icon: false,
    small: false,
} as const;

const defaultArgTypes = {
    badge: {
        options: badgeOptions,
        control: {type: 'select'},
    },
    href: {
        options: ['undefined', 'https://example.com'],
        control: {type: 'select'},
    },
};
const NavigableChipArgTypes = {
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

NavigableChip.argTypes = NavigableChipArgTypes;
NavigableChip.args = navigableArgs;
