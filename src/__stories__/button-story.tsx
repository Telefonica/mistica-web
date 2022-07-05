import * as React from 'react';
import {StorySection} from './helpers';
import {
    Box,
    Inline,
    ButtonDanger,
    ButtonLink,
    ButtonPrimary,
    ButtonSecondary,
    TextField,
    Stack,
    ThemeVariant,
    useTheme,
    Checkbox,
    Text2,
    IconPhotoCameraRegular,
} from '..';
import DoubleField from '../double-field';
import {Title1} from '../title';

export default {
    title: 'Components/Buttons',
};

const BackgroundTheme: StoryComponent = ({children}) => {
    const {colors} = useTheme();
    const [isInverse, setIsInverse] = React.useState(false);
    return (
        <ThemeVariant isInverse={isInverse}>
            <>
                <div style={{background: isInverse ? colors.backgroundBrand : colors.background}}>
                    <Box padding={8}>
                        <Checkbox name="inverse" checked={isInverse} onChange={setIsInverse}>
                            Inverse variant
                        </Checkbox>
                    </Box>

                    {children}
                </div>
            </>
        </ThemeVariant>
    );
};

const handleOnPress = () => window.alert('pressed!');

export const TypeOfButtons: StoryComponent = () => {
    const [disabled, setDisabled] = React.useState(false);
    const [showSpinner, setShowSpinner] = React.useState(false);
    const [small, setSmall] = React.useState(false);
    const [newTab, setNewTab] = React.useState(false);
    const [text, setTextInput] = React.useState('Example');
    const [loadingText, setLoadingText] = React.useState('Loading Text');
    const href = 'https://example.com';

    const props = {disabled, showSpinner, small, loadingText};

    return (
        <BackgroundTheme>
            <Box padding={8}>
                <Stack space={16}>
                    <Inline space={32}>
                        <Checkbox name="Disabled" checked={disabled} onChange={setDisabled}>
                            Disabled
                        </Checkbox>
                        <Checkbox name="ShowSpinner" checked={showSpinner} onChange={setShowSpinner}>
                            Show Spinner
                        </Checkbox>
                    </Inline>
                    <Inline space={32}>
                        <Checkbox name="Small" checked={small} onChange={setSmall}>
                            Small
                        </Checkbox>
                        <Checkbox name="newTab" checked={newTab} onChange={setNewTab}>
                            newTab
                        </Checkbox>
                    </Inline>
                    <Inline space={16}>
                        <DoubleField>
                            <TextField
                                name="btn-text"
                                label="Text"
                                value={text}
                                onChangeValue={setTextInput}
                            />
                            <TextField
                                name="btn-loading"
                                label="Loading Text"
                                value={loadingText}
                                onChangeValue={setLoadingText}
                            />
                        </DoubleField>
                    </Inline>
                </Stack>
            </Box>

            <div data-testid="content">
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
                    <ButtonLink onPress={handleOnPress} disabled={disabled}>
                        {text}
                    </ButtonLink>
                    <Text2 regular as="p">
                        Link (href):
                    </Text2>
                    <ButtonLink href={href} newTab={newTab} disabled={disabled}>
                        {text}
                    </ButtonLink>
                </Stack>
            </div>
        </BackgroundTheme>
    );
};

export const EllipsisInButtons: StoryComponent = () => {
    const text = 'Ellipsis text example example';
    const href = 'https://example.com';
    const {colors} = useTheme();

    return (
        <div data-testid="content" style={{width: 160, border: `1px solid ${colors.border}`}}>
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
        <ButtonPrimary onPress={() => window.alert('photo!')}>
            <IconPhotoCameraRegular color="currentColor" />
            Take a photo
        </ButtonPrimary>
    </StorySection>
);

export const LoadingState: StoryComponent = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const handlePress = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };
    return (
        <BackgroundTheme>
            <Box padding={8}>
                <Checkbox checked={isLoading} onChange={setIsLoading} name="isLoading">
                    isLoading
                </Checkbox>
            </Box>
            <StorySection title="With loading text">
                <Inline space={16}>
                    <ButtonPrimary loadingText="Sending file" showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonPrimary>
                    <ButtonSecondary loadingText="Sending file" showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonSecondary>
                    <ButtonDanger loadingText="Sending file" showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonDanger>
                </Inline>
            </StorySection>
            <StorySection title="Without loading text">
                <Inline space={16}>
                    <ButtonPrimary showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonPrimary>
                    <ButtonSecondary showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonSecondary>
                    <ButtonDanger showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonDanger>
                </Inline>
            </StorySection>
            <StorySection title="Small with loading text">
                <Inline space={16}>
                    <ButtonPrimary
                        small
                        loadingText="Sending file"
                        showSpinner={isLoading}
                        onPress={handlePress}
                    >
                        Send
                    </ButtonPrimary>
                    <ButtonSecondary
                        small
                        loadingText="Sending file"
                        showSpinner={isLoading}
                        onPress={handlePress}
                    >
                        Send
                    </ButtonSecondary>
                    <ButtonDanger
                        small
                        loadingText="Sending file"
                        showSpinner={isLoading}
                        onPress={handlePress}
                    >
                        Send
                    </ButtonDanger>
                </Inline>
            </StorySection>
            <StorySection title="Small without loading text">
                <Inline space={16}>
                    <ButtonPrimary small showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonPrimary>
                    <ButtonSecondary small showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonSecondary>
                    <ButtonDanger small showSpinner={isLoading} onPress={handlePress}>
                        Send
                    </ButtonDanger>
                </Inline>
            </StorySection>
        </BackgroundTheme>
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
