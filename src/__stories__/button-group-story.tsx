import * as React from 'react';
import {ButtonLink, SectionTitle, Stack} from '..';
import {ButtonPrimary, ButtonSecondary} from '../button';
import ButtonGroup from '../button-group';

export default {
    title: 'Components/Touchables/ButtonGroup',
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
            <SectionTitle as="h2">One Button</SectionTitle>
            <ButtonGroup primaryButton={primaryButton}></ButtonGroup>

            <SectionTitle as="h2">Two Buttons</SectionTitle>
            <ButtonGroup primaryButton={primaryButton} secondaryButton={secondaryButton}></ButtonGroup>

            <SectionTitle as="h2">Primary Button and Link</SectionTitle>
            <ButtonGroup primaryButton={primaryButton} link={buttonLink}></ButtonGroup>

            <SectionTitle as="h2">Secondary Button and Link</SectionTitle>
            <ButtonGroup secondaryButton={secondaryButton} link={buttonLink}></ButtonGroup>

            <SectionTitle as="h2">only Link</SectionTitle>
            <ButtonGroup link={buttonLink}></ButtonGroup>

            <SectionTitle as="h2">Two Buttons and Link</SectionTitle>
            <ButtonGroup
                primaryButton={primaryButton}
                secondaryButton={secondaryButton}
                link={buttonLink}
            ></ButtonGroup>

            <SectionTitle as="h2">Different-length Buttons</SectionTitle>
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
