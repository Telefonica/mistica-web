import * as React from 'react';
import IconButton from '../icon-button';
import IconCloseRegular from '../generated/mistica-icons/icon-close-regular';
import ResponsiveLayout from '../responsive-layout';
import Box from '../box';

export default {
    title: 'Components/Buttons/IconButton',
    argTypes: {
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
    },
    parameters: {fullScreen: true},
};

const handleOnPress = () => console.log('pressed!');

type Args = {
    type: 'neutral' | 'brand' | 'danger';
    backgroundType: 'transparent' | 'soft' | 'solid';
    themeVariant: 'default' | 'inverse' | 'alternative';
    small: boolean;
    disabled: boolean;
    showSpinner: boolean;
    bleedLeft: boolean;
    bleedRight: boolean;
    bleedY: boolean;
};

export const Default: StoryComponent<Args> = ({
    type,
    backgroundType,
    themeVariant,
    small,
    disabled,
    showSpinner,
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
                showSpinner={showSpinner}
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

Default.storyName = 'IconButton';
Default.args = {
    type: 'neutral',
    backgroundType: 'transparent',
    themeVariant: 'default',
    small: false,
    disabled: false,
    showSpinner: false,
    bleedLeft: false,
    bleedRight: false,
    bleedY: false,
};
