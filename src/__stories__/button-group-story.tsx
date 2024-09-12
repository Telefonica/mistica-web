import * as React from 'react';
import {ButtonLink} from '..';
import {ButtonPrimary, ButtonSecondary} from '../button';
import ButtonGroup from '../button-group';

export default {
    title: 'Components/Buttons/ButtonGroup',
};

const handleOnPress = () => window.alert('pressed!');

type Args = {
    small: boolean;
    buttonPrimary: boolean;
    buttonSecondary: boolean;
    buttonLink: boolean;
    buttonPrimaryText: string;
    buttonSecondaryText: string;
    buttonLinkText: string;
};

export const Default: StoryComponent<Args> = ({
    small,
    buttonPrimary,
    buttonSecondary,
    buttonLink,
    buttonPrimaryText,
    buttonSecondaryText,
    buttonLinkText,
}) => {
    const primaryButton = buttonPrimary ? (
        <ButtonPrimary small={small} onPress={handleOnPress}>
            {buttonPrimaryText}
        </ButtonPrimary>
    ) : undefined;

    const secondaryButton = buttonSecondary ? (
        <ButtonSecondary small={small} onPress={handleOnPress}>
            {buttonSecondaryText}
        </ButtonSecondary>
    ) : undefined;

    const linkButton = buttonLink ? (
        <ButtonLink small={small} onPress={handleOnPress}>
            {buttonLinkText}
        </ButtonLink>
    ) : undefined;

    return <ButtonGroup primaryButton={primaryButton} secondaryButton={secondaryButton} link={linkButton} />;
};

Default.storyName = 'ButtonGroup';
Default.argTypes = {
    buttonPrimaryText: {if: {arg: 'buttonPrimary'}},
    buttonSecondaryText: {if: {arg: 'buttonSecondary'}},
    buttonLinkText: {if: {arg: 'buttonLink'}},
};
Default.args = {
    small: false,
    buttonPrimary: true,
    buttonSecondary: true,
    buttonLink: true,
    buttonPrimaryText: 'Action1',
    buttonSecondaryText: 'Action2',
    buttonLinkText: 'link',
};
