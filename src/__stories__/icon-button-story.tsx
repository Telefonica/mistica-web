import * as React from 'react';
import IconButton from '../icon-button';
import IconCloseRegular from '../generated/mistica-icons/icon-close-regular';

export default {
    title: 'Components/Buttons/IconButton',
    argTypes: {
        type: {
            options: ['neutral', 'brand', 'danger'],
            control: {type: 'select'},
        },
        variant: {
            options: ['default', 'soft', 'solid'],
            control: {type: 'select'},
        },
    },
};

const handleOnPress = () => window.alert('pressed!');

type Args = {
    type: 'neutral' | 'brand' | 'danger';
    variant: 'default' | 'soft' | 'solid';
    small: boolean;
    disabled: boolean;
    isOverMedia: boolean;
    bleedLeft: boolean;
    bleedRight: boolean;
    bleedY: boolean;
};

export const Default: StoryComponent<Args> = ({
    type,
    variant,
    small,
    disabled,
    isOverMedia,
    bleedLeft,
    bleedRight,
    bleedY,
}) => (
    <IconButton
        onPress={handleOnPress}
        Icon={IconCloseRegular}
        type={type}
        variant={variant}
        isOverMedia={isOverMedia}
        small={small}
        disabled={disabled}
        bleedLeft={bleedLeft}
        bleedRight={bleedRight}
        bleedY={bleedY}
        aria-label="button icon"
    />
);

Default.storyName = 'IconButton';
Default.args = {
    type: 'neutral',
    variant: 'default',
    small: false,
    disabled: false,
    isOverMedia: false,
    bleedLeft: false,
    bleedRight: false,
    bleedY: false,
};
