import * as React from 'react';
import {IconButton, ToggleIconButton} from '../icon-button';
import IconCloseRegular from '../generated/mistica-icons/icon-close-regular';
import ResponsiveLayout from '../responsive-layout';
import Box from '../box';
import IconPlayFilled from '../generated/mistica-icons/icon-play-filled';
import IconPauseFilled from '../generated/mistica-icons/icon-pause-filled';

import type {Variant} from '../theme-variant-context';
import type {IconButtonType, IconButtonBackgroundType} from '../icon-button';

export default {
    title: 'Components/Buttons',
    parameters: {fullScreen: true},
};

const handleOnPress = () => console.log('pressed!');

type IconButtonArgs = {
    type: IconButtonType;
    backgroundType: IconButtonBackgroundType;
    themeVariant: Variant;
    small: boolean;
    disabled: boolean;
    spinner: boolean;
    bleedLeft: boolean;
    bleedRight: boolean;
    bleedY: boolean;
};

export const IconButtonStory: StoryComponent<IconButtonArgs> = ({
    type,
    backgroundType,
    themeVariant,
    small,
    disabled,
    spinner,
    bleedLeft,
    bleedRight,
    bleedY,
}) => (
    <ResponsiveLayout variant={themeVariant} fullWidth>
        <Box padding={16}>
            <IconButton
                aria-label="icon button"
                onPress={handleOnPress}
                Icon={IconCloseRegular}
                type={type}
                backgroundType={backgroundType}
                showSpinner={spinner}
                small={small}
                disabled={disabled}
                bleedLeft={bleedLeft}
                bleedRight={bleedRight}
                bleedY={bleedY}
                dataAttributes={{testid: 'icon-button'}}
            />
        </Box>
    </ResponsiveLayout>
);

IconButtonStory.storyName = 'IconButton';
IconButtonStory.argTypes = {
    type: {
        options: ['neutral', 'brand', 'danger'],
        control: {type: 'select'},
    },
    backgroundType: {
        options: ['transparent', 'soft', 'solid'],
        control: {type: 'select'},
    },
    themeVariant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
    },
};
IconButtonStory.args = {
    type: 'neutral',
    backgroundType: 'transparent',
    themeVariant: 'default',
    small: false,
    disabled: false,
    spinner: false,
    bleedLeft: false,
    bleedRight: false,
    bleedY: false,
};

type ToggleIconButtonArgs = {
    checkedType: IconButtonType;
    checkedBackgroundType: IconButtonBackgroundType;
    uncheckedType: IconButtonType;
    uncheckedBackgroundType: IconButtonBackgroundType;
    themeVariant: Variant;
    small: boolean;
    disabled: boolean;
    spinner: boolean;
    bleedLeft: boolean;
    bleedRight: boolean;
    bleedY: boolean;
};

export const ToggleIconButtonStory: StoryComponent<ToggleIconButtonArgs> = ({
    checkedType,
    checkedBackgroundType,
    uncheckedType,
    uncheckedBackgroundType,
    themeVariant,
    small,
    disabled,
    spinner,
    bleedLeft,
    bleedRight,
    bleedY,
}) => (
    <ResponsiveLayout variant={themeVariant} fullWidth>
        <Box padding={16}>
            <ToggleIconButton
                onChange={(checked) => console.log(checked ? 'checked' : 'unchecked')}
                showSpinner={spinner}
                small={small}
                disabled={disabled}
                bleedLeft={bleedLeft}
                bleedRight={bleedRight}
                bleedY={bleedY}
                dataAttributes={{testid: 'toggle-icon-button'}}
                checkedProps={{
                    Icon: IconPauseFilled,
                    type: checkedType,
                    backgroundType: checkedBackgroundType,
                    'aria-label': 'checked-icon-button',
                }}
                uncheckedProps={{
                    Icon: IconPlayFilled,
                    type: uncheckedType,
                    backgroundType: uncheckedBackgroundType,
                    'aria-label': 'unchecked-icon-button',
                }}
            />
        </Box>
    </ResponsiveLayout>
);

ToggleIconButtonStory.storyName = 'ToggleIconButton';
ToggleIconButtonStory.argTypes = {
    uncheckedType: {
        options: ['neutral', 'brand', 'danger'],
        control: {type: 'select'},
    },
    uncheckedBackgroundType: {
        options: ['transparent', 'soft', 'solid'],
        control: {type: 'select'},
    },
    checkedType: {
        options: ['neutral', 'brand', 'danger'],
        control: {type: 'select'},
    },
    checkedBackgroundType: {
        options: ['transparent', 'soft', 'solid'],
        control: {type: 'select'},
    },
    themeVariant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
    },
};
ToggleIconButtonStory.args = {
    uncheckedType: 'neutral',
    uncheckedBackgroundType: 'transparent',
    checkedType: 'neutral',
    checkedBackgroundType: 'transparent',
    themeVariant: 'default',
    small: false,
    disabled: false,
    spinner: false,
    bleedLeft: false,
    bleedRight: false,
    bleedY: false,
};
