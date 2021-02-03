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
} from '..';
import DoubleField from '../double-field';
import SectionTitle from '../section-title';
import {IconPhotoCameraRegular} from '../../playroom/components';

export default {
    title: 'Components/Touchables/Button',
};

const BackgroundTheme: StoryComponent = ({children}) => {
    const {colors} = useTheme();
    const [isInverse, setIsInverse] = React.useState(false);
    return (
        <ThemeVariant isInverse={isInverse}>
            <>
                <div style={{background: isInverse ? colors.backgroundHeading : 'white'}}>
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
                    <SectionTitle>ButtonPrimary</SectionTitle>

                    <div>Button:</div>
                    <ButtonPrimary onPress={handleOnPress} {...props}>
                        {text}
                    </ButtonPrimary>

                    <div>Link:</div>
                    <ButtonPrimary href={href} newTab={newTab} {...props}>
                        {text}
                    </ButtonPrimary>

                    <div>Fake:</div>
                    <ButtonPrimary fake {...props}>
                        {text}
                    </ButtonPrimary>

                    <SectionTitle>ButtonSecondary</SectionTitle>
                    <div>Button:</div>
                    <ButtonSecondary onPress={handleOnPress} {...props}>
                        {text}
                    </ButtonSecondary>

                    <div>Link:</div>
                    <ButtonSecondary href={href} newTab={newTab} {...props}>
                        {text}
                    </ButtonSecondary>

                    <div>Fake:</div>
                    <ButtonSecondary fake {...props}>
                        {text}
                    </ButtonSecondary>

                    <SectionTitle>ButtonDanger</SectionTitle>

                    <div>Button:</div>
                    <ButtonDanger onPress={handleOnPress} {...props}>
                        {text}
                    </ButtonDanger>

                    <div>Link:</div>
                    <ButtonDanger href={href} newTab={newTab} {...props}>
                        {text}
                    </ButtonDanger>

                    <div>Fake:</div>
                    <ButtonDanger fake {...props}>
                        {text}
                    </ButtonDanger>

                    <SectionTitle>ButtonLink</SectionTitle>
                    <div>Button (onPress):</div>
                    <ButtonLink onPress={handleOnPress}>{text}</ButtonLink>
                    <div>Link (href):</div>
                    <ButtonLink href={href} newTab={newTab}>
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

    return (
        <div data-testid="content" style={{width: 160, border: '1px solid'}}>
            <Stack space={8}>
                <SectionTitle>ButtonPrimary</SectionTitle>
                <ButtonPrimary onPress={handleOnPress}>{text}</ButtonPrimary>

                <SectionTitle>ButtonSecondary</SectionTitle>

                <ButtonSecondary onPress={handleOnPress}>{text}</ButtonSecondary>

                <SectionTitle>ButtonDanger</SectionTitle>

                <ButtonDanger onPress={handleOnPress}>{text}</ButtonDanger>

                <SectionTitle>ButtonLink</SectionTitle>
                <div>Button (onPress):</div>
                <ButtonLink onPress={handleOnPress}>{text}</ButtonLink>
                <div>Link (href):</div>
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
        <p>
            A button with submit attribute in a form doesn't need a onPress prop. And clicking on it will fire
            onSubmit event, that should be handled by the form.
        </p>
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
