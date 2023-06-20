import * as React from 'react';
import {
    Box,
    Inline,
    ButtonDanger,
    ButtonLink,
    ButtonPrimary,
    ButtonSecondary,
    TextField,
    Stack,
    skinVars,
    Text2,
    IconPhotoCameraRegular,
    ResponsiveLayout,
} from '..';
import {Title1} from '../title';
import {StorySection} from './helpers';

export default {
    title: 'Components/Buttons',
};

const handleOnPress = () => window.alert('pressed!');

type TypeOfButtonsArgs = {
    text: string;
    loadingText: string;
    isInverse: boolean;
    disabled: boolean;
    showSpinner: boolean;
    small: boolean;
    newTab: boolean;
};

export const TypeOfButtons: StoryComponent<TypeOfButtonsArgs> = ({
    text,
    loadingText,
    isInverse,
    disabled,
    showSpinner,
    small,
    newTab,
}) => {
    const href = 'https://example.com';

    const props = {disabled, showSpinner, small, loadingText};

    return (
        <ResponsiveLayout fullWidth data-testid="content" isInverse={isInverse}>
            <Box padding={16}>
                <Stack space={8}>
                    <Title1>ButtonPrimary</Title1>

                    <Text2 regular as="p">
                        Button:
                    </Text2>
                    <ButtonPrimary onPress={handleOnPress} {...props}>
                        {text}
                    </ButtonPrimary>

                    <Text2 regular as="p">
                        Link:
                    </Text2>
                    <ButtonPrimary href={href} newTab={newTab} {...props}>
                        {text}
                    </ButtonPrimary>

                    <Text2 regular as="p">
                        Fake:
                    </Text2>
                    <ButtonPrimary fake {...props}>
                        {text}
                    </ButtonPrimary>

                    <Title1>ButtonSecondary</Title1>
                    <Text2 regular as="p">
                        Button:
                    </Text2>
                    <ButtonSecondary onPress={handleOnPress} {...props}>
                        {text}
                    </ButtonSecondary>

                    <Text2 regular as="p">
                        Link:
                    </Text2>
                    <ButtonSecondary href={href} newTab={newTab} {...props}>
                        {text}
                    </ButtonSecondary>

                    <Text2 regular as="p">
                        Fake:
                    </Text2>
                    <ButtonSecondary fake {...props}>
                        {text}
                    </ButtonSecondary>

                    <Title1>ButtonDanger</Title1>

                    <Text2 regular as="p">
                        Button:
                    </Text2>
                    <ButtonDanger onPress={handleOnPress} {...props}>
                        {text}
                    </ButtonDanger>

                    <Text2 regular as="p">
                        Link:
                    </Text2>
                    <ButtonDanger href={href} newTab={newTab} {...props}>
                        {text}
                    </ButtonDanger>

                    <Text2 regular as="p">
                        Fake:
                    </Text2>
                    <ButtonDanger fake {...props}>
                        {text}
                    </ButtonDanger>

                    <Title1>ButtonLink</Title1>
                    <Text2 regular as="p">
                        Button (onPress):
                    </Text2>
                    <ButtonLink
                        onPress={handleOnPress}
                        disabled={disabled}
                        showSpinner={showSpinner}
                        loadingText={loadingText}
                    >
                        {text}
                    </ButtonLink>
                    <Text2 regular as="p">
                        Link (href):
                    </Text2>
                    <ButtonLink
                        href={href}
                        newTab={newTab}
                        disabled={disabled}
                        showSpinner={showSpinner}
                        loadingText={loadingText}
                    >
                        {text}
                    </ButtonLink>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

type EllipsisInButtonsArgs = {
    text: string;
};

export const EllipsisInButtons: StoryComponent<EllipsisInButtonsArgs> = ({text}) => {
    const href = 'https://example.com';

    return (
        <div data-testid="content" style={{width: 160, border: `1px solid ${skinVars.colors.border}`}}>
            <Stack space={8}>
                <Title1>ButtonPrimary</Title1>
                <ButtonPrimary onPress={handleOnPress}>{text}</ButtonPrimary>

                <Title1>ButtonSecondary</Title1>

                <ButtonSecondary onPress={handleOnPress}>{text}</ButtonSecondary>

                <Title1>ButtonDanger</Title1>

                <ButtonDanger onPress={handleOnPress}>{text}</ButtonDanger>

                <Title1>ButtonLink</Title1>
                <Text2 as="p" regular>
                    Button (onPress):
                </Text2>
                <ButtonLink onPress={handleOnPress}>{text}</ButtonLink>
                <Text2 as="p" regular>
                    Link (href):
                </Text2>
                <ButtonLink href={href}>{text}</ButtonLink>
            </Stack>
        </div>
    );
};

export const withIcon: StoryComponent = () => (
    <StorySection title="Buttons can have an icon">
        <Stack space={16}>
            <ButtonPrimary onPress={() => window.alert('photo!')}>
                <IconPhotoCameraRegular color="currentColor" />
                Take a photo
            </ButtonPrimary>
            <ButtonPrimary small onPress={() => window.alert('photo!')}>
                <IconPhotoCameraRegular color="currentColor" />
                Take a photo
            </ButtonPrimary>
            <ButtonLink onPress={() => window.alert('photo!')}>
                <IconPhotoCameraRegular color="currentColor" />
                Take a photo
            </ButtonLink>
            <ButtonPrimary onPress={() => window.alert('photo!')}>
                Take a photo
                <IconPhotoCameraRegular color="currentColor" />
            </ButtonPrimary>
            <ButtonPrimary small onPress={() => window.alert('photo!')}>
                Take a photo
                <IconPhotoCameraRegular color="currentColor" />
            </ButtonPrimary>
            <ButtonLink onPress={() => window.alert('photo!')}>
                Take a photo
                <IconPhotoCameraRegular color="currentColor" />
            </ButtonLink>
        </Stack>
    </StorySection>
);

type LoadingStateArgs = {
    isInverse: boolean;
    isLoading: boolean;
    withLoadingText: boolean;
    small: boolean;
};

export const LoadingState: StoryComponent<LoadingStateArgs> = ({
    isInverse,
    isLoading,
    withLoadingText,
    small,
}) => {
    const handlePress = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 2000));

    const loadingText = withLoadingText ? 'Sending file' : undefined;

    return (
        <ResponsiveLayout fullWidth isInverse={isInverse}>
            <Box padding={16}>
                <Inline space={16} alignItems="center">
                    <ButtonPrimary
                        small={small}
                        loadingText={loadingText}
                        showSpinner={isLoading}
                        onPress={handlePress}
                    >
                        Send
                    </ButtonPrimary>
                    <ButtonSecondary
                        small={small}
                        loadingText={loadingText}
                        showSpinner={isLoading}
                        onPress={handlePress}
                    >
                        Send
                    </ButtonSecondary>
                    <ButtonDanger
                        small={small}
                        loadingText={loadingText}
                        showSpinner={isLoading}
                        onPress={handlePress}
                    >
                        Send
                    </ButtonDanger>
                    <ButtonLink loadingText={loadingText} showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonLink>
                </Inline>
            </Box>
        </ResponsiveLayout>
    );
};

export const SubmitButton: StoryComponent = () => (
    <StorySection title="Submitbutton">
        <Text2 as="p" regular>
            A button with submit attribute in a form doesn't need a onPress prop. And clicking on it will fire
            onSubmit event, that should be handled by the form.
        </Text2>
        <form onSubmit={() => window.alert('form submitted')}>
            <Box paddingY={16}>
                <Stack space={16}>
                    <TextField name="name" label="name" />
                    <ButtonPrimary submit>Submit</ButtonPrimary>
                </Stack>
            </Box>
        </form>
    </StorySection>
);

TypeOfButtons.storyName = 'Type of buttons';
EllipsisInButtons.storyName = 'Ellipsis in buttons';
withIcon.storyName = 'Button with icon';
LoadingState.storyName = 'Loading state';
SubmitButton.storyName = 'Submit button';

TypeOfButtons.args = {
    text: 'Example',
    loadingText: 'Loading Text',
    isInverse: false,
    disabled: false,
    showSpinner: false,
    small: false,
    newTab: false,
};

EllipsisInButtons.args = {
    text: 'Ellipsis text example example',
};

LoadingState.args = {
    isInverse: false,
    isLoading: false,
    small: false,
    withLoadingText: true,
};

EllipsisInButtons.parameters = {fullScreen: false};
withIcon.parameters = {fullScreen: false};
SubmitButton.parameters = {fullScreen: false};
