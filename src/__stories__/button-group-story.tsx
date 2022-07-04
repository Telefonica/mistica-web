import * as React from 'react';
import {ButtonLink, Title1, Stack} from '..';
import {ButtonPrimary, ButtonSecondary} from '../button';
import ButtonGroup from '../button-group';

export default {
    title: 'Components/Buttons/ButtonGroup',
};

const handleOnPress = () => window.alert('pressed!');

type Args = {
    primaryButtonText: string;
    secondaryButtonText: string;
    linkText: string;
};

export const Default: StoryComponent<Args> = ({primaryButtonText, secondaryButtonText, linkText}) => {
    const primaryButton = <ButtonPrimary onPress={handleOnPress}>{primaryButtonText}</ButtonPrimary>;

    const secondaryButton = <ButtonSecondary onPress={handleOnPress}>{secondaryButtonText}</ButtonSecondary>;
    const buttonLink = <ButtonLink onPress={handleOnPress}>{linkText}</ButtonLink>;
    const longButton = (
        <ButtonPrimary onPress={handleOnPress}>A very long action text in this button</ButtonPrimary>
    );
    return (
        <Stack space={16}>
            <Title1 as="h2">One Button</Title1>
            <ButtonGroup primaryButton={primaryButton}></ButtonGroup>

            <Title1 as="h2">Two Buttons</Title1>
            <ButtonGroup primaryButton={primaryButton} secondaryButton={secondaryButton}></ButtonGroup>

            <Title1 as="h2">Primary Button and Link</Title1>
            <ButtonGroup primaryButton={primaryButton} link={buttonLink}></ButtonGroup>

            <Title1 as="h2">Secondary Button and Link</Title1>
            <ButtonGroup secondaryButton={secondaryButton} link={buttonLink}></ButtonGroup>

            <Title1 as="h2">only Link</Title1>
            <ButtonGroup link={buttonLink}></ButtonGroup>

            <Title1 as="h2">Two Buttons and Link</Title1>
            <ButtonGroup
                primaryButton={primaryButton}
                secondaryButton={secondaryButton}
                link={buttonLink}
            ></ButtonGroup>

            <Title1 as="h2">Different-length Buttons</Title1>
            <ButtonGroup primaryButton={longButton} secondaryButton={secondaryButton}></ButtonGroup>
        </Stack>
    );
};

Default.storyName = 'ButtonGroup';
Default.args = {
    primaryButtonText: 'Action1',
    secondaryButtonText: 'Action2',
    linkText: 'link',
};
