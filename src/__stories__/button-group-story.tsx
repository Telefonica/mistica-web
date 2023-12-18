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
    showButtonPrimary: boolean;
    showButtonSecondary: boolean;
    showButtonLink: boolean;
    buttonPrimaryText: string;
    buttonSecondaryText: string;
    buttonLinkText: string;
};

export const Default: StoryComponent<Args> = ({
    small,
    showButtonPrimary,
    showButtonSecondary,
    showButtonLink,
    buttonPrimaryText,
    buttonSecondaryText,
    buttonLinkText,
}) => {
    const primaryButton = showButtonPrimary ? (
        <ButtonPrimary small={small} onPress={handleOnPress}>
            {buttonPrimaryText}
        </ButtonPrimary>
    ) : undefined;

    const secondaryButton = showButtonSecondary ? (
        <ButtonSecondary small={small} onPress={handleOnPress}>
            {buttonSecondaryText}
        </ButtonSecondary>
    ) : undefined;

    const buttonLink = showButtonLink ? (
        <ButtonLink onPress={handleOnPress}>{buttonLinkText}</ButtonLink>
    ) : undefined;

    return <ButtonGroup primaryButton={primaryButton} secondaryButton={secondaryButton} link={buttonLink} />;
};

Default.storyName = 'ButtonGroup';
Default.argTypes = {
    buttonPrimaryText: {if: {arg: 'showButtonPrimary'}},
    buttonSecondaryText: {if: {arg: 'showButtonSecondary'}},
    buttonLinkText: {if: {arg: 'showButtonLink'}},
};
Default.args = {
    small: false,
    showButtonPrimary: true,
    showButtonSecondary: true,
    showButtonLink: true,
    buttonPrimaryText: 'Action1',
    buttonSecondaryText: 'Action2',
    buttonLinkText: 'link',
};
