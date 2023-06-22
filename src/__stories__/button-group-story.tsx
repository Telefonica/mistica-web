import * as React from 'react';
import {ButtonLink} from '..';
import {ButtonPrimary, ButtonSecondary} from '../button';
import ButtonGroup from '../button-group';

export default {
    title: 'Components/Buttons/Button group',
};

const handleOnPress = () => window.alert('pressed!');

type Args = {
    showPrimaryButton: boolean;
    showSecondaryButton: boolean;
    showLink: boolean;
    primaryButtonText: string;
    secondaryButtonText: string;
    linkText: string;
};

export const Default: StoryComponent<Args> = ({
    showPrimaryButton,
    showSecondaryButton,
    showLink,
    primaryButtonText,
    secondaryButtonText,
    linkText,
}) => {
    const primaryButton = showPrimaryButton ? (
        <ButtonPrimary onPress={handleOnPress}>{primaryButtonText}</ButtonPrimary>
    ) : undefined;

    const secondaryButton = showSecondaryButton ? (
        <ButtonSecondary onPress={handleOnPress}>{secondaryButtonText}</ButtonSecondary>
    ) : undefined;

    const buttonLink = showLink ? <ButtonLink onPress={handleOnPress}>{linkText}</ButtonLink> : undefined;

    return <ButtonGroup primaryButton={primaryButton} secondaryButton={secondaryButton} link={buttonLink} />;
};

Default.storyName = 'Button group';
Default.args = {
    showPrimaryButton: true,
    showSecondaryButton: true,
    showLink: true,
    primaryButtonText: 'Action1',
    secondaryButtonText: 'Action2',
    linkText: 'link',
};
