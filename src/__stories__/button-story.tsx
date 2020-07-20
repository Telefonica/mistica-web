import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonLink} from '../button';
import {ThemeVariant} from '../theme-variant-context';
import {FormTextField} from '../form-text-field';
import Box from '../box';
import Stack from '../stack';
import {StorySection, useCheckbox} from './helpers';
import {useTheme} from '../hooks';

export default {
    title: 'Components|Touchables/Button',
};

const IcnCamera = () => (
    <svg role="presentation" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
            <path
                stroke="white"
                strokeWidth="2"
                d="M16.688 6.804c.014-.086.026-.172.026-.262v-.27c0-.938-.752-1.272-1.672-1.272H9.958c-.92 0-1.674.334-1.674 1.271v.271c0 .09.013.176.026.262H6.148C4.96 6.804 4 7.784 4 8.99v7.674c0 1.208.961 2.187 2.148 2.187h12.704c1.186 0 2.148-.98 2.148-2.187V8.99c0-1.208-.962-2.187-2.148-2.187h-2.164z"
            />
            <ellipse cx="17.91" cy="9.67" fill="white" rx=".77" ry=".78" />
            <path
                fill="white"
                d="M8.41 12.778c0 2.269 1.83 4.11 4.09 4.11s4.09-1.841 4.09-4.11c0-2.27-1.83-4.111-4.09-4.111s-4.09 1.842-4.09 4.11zm2 0a2.1 2.1 0 0 1 2.09-2.111 2.1 2.1 0 0 1 2.09 2.11 2.101 2.101 0 0 1-2.09 2.112 2.101 2.101 0 0 1-2.09-2.111z"
            />
            <path d="M0 0h24v24H0z" />
        </g>
    </svg>
);

const BackgroundTheme: StoryComponent = ({children}) => {
    const {colors} = useTheme();
    const [isInverseVariantState, setIsInverseVariantState] = React.useState(false);
    return (
        <ThemeVariant isInverse={isInverseVariantState}>
            <>
                <p style={{margin: 0, paddingLeft: 8, marginBottom: 16}}>
                    <input
                        type="checkbox"
                        checked={isInverseVariantState}
                        onChange={({target}) => setIsInverseVariantState(target.checked)}
                    />
                    Inverse variant
                </p>
                <div
                    style={{
                        background: isInverseVariantState ? colors.backgroundHeading : 'white',
                    }}
                >
                    {children}
                </div>
            </>
        </ThemeVariant>
    );
};

const handleOnPress = () => window.alert('pressed!');

export const TypeOfButtons: StoryComponent = () => {
    const [disabled, disabledCheckbox] = useCheckbox('disabled');
    const [showSpinner, showSpinnerCheckbox] = useCheckbox('showSpinner');
    const [small, smallCheckbox] = useCheckbox('small');
    const [newTab, newTabCheckbox] = useCheckbox('newTab', true);
    const href = 'https://google.com';
    const caption = 'text';

    const props = {disabled, showSpinner, small};

    return (
        <BackgroundTheme>
            {disabledCheckbox}
            {showSpinnerCheckbox}
            {smallCheckbox}
            {newTabCheckbox}
            <div data-testid="content">
                <StorySection title="ButtonPrimary">
                    <div>Button:</div>
                    <ButtonPrimary onPress={handleOnPress} {...props}>
                        {caption}
                    </ButtonPrimary>

                    <div>Link:</div>
                    <ButtonPrimary href={href} newTab={newTab} {...props}>
                        {caption}
                    </ButtonPrimary>

                    <div>Fake:</div>
                    <ButtonPrimary fake {...props}>
                        {caption}
                    </ButtonPrimary>
                </StorySection>

                <StorySection title="ButtonSecondary">
                    <div>Button:</div>
                    <ButtonSecondary onPress={handleOnPress} {...props}>
                        {caption}
                    </ButtonSecondary>

                    <div>Link:</div>
                    <ButtonSecondary href={href} newTab={newTab} {...props}>
                        {caption}
                    </ButtonSecondary>

                    <div>Fake:</div>
                    <ButtonSecondary fake {...props}>
                        {caption}
                    </ButtonSecondary>
                </StorySection>

                <StorySection title="ButtonDanger">
                    <div>Button:</div>
                    <ButtonDanger onPress={handleOnPress} {...props}>
                        {caption}
                    </ButtonDanger>

                    <div>Link:</div>
                    <ButtonDanger href={href} newTab={newTab} {...props}>
                        {caption}
                    </ButtonDanger>

                    <div>Fake:</div>
                    <ButtonDanger fake {...props}>
                        {caption}
                    </ButtonDanger>
                </StorySection>

                <StorySection title="ButtonLink">
                    <div>Button:</div>
                    <ButtonLink onPress={handleOnPress}>{caption}</ButtonLink>
                    <div>Link:</div>
                    <ButtonLink href={href} newTab={newTab}>
                        {caption}
                    </ButtonLink>
                </StorySection>
            </div>
        </BackgroundTheme>
    );
};

export const withIcon: StoryComponent = () => (
    <StorySection title="Buttons can have an icon">
        <ButtonPrimary onPress={() => window.alert('photo!')}>
            <IcnCamera />
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
            <label>
                <input type="checkbox" checked={isLoading} onChange={() => setIsLoading(!isLoading)} />{' '}
                isLoading
            </label>
            <StorySection title="With loading text">
                <ButtonPrimary loadingText="Sending file" showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonPrimary>
                <ButtonSecondary loadingText="Sending file" showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonSecondary>
                <ButtonDanger loadingText="Sending file" showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonDanger>
            </StorySection>
            <StorySection title="Without loading text">
                <ButtonPrimary showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonPrimary>
                <ButtonSecondary showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonSecondary>
                <ButtonDanger showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonDanger>
            </StorySection>
            <StorySection title="Small with loading text">
                <ButtonPrimary small loadingText="Sending file" showSpinner={isLoading} onPress={handlePress}>
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
                <ButtonDanger small loadingText="Sending file" showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonDanger>
            </StorySection>
            <StorySection title="Small without loading text">
                <ButtonPrimary small showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonPrimary>
                <ButtonSecondary small showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonSecondary>
                <ButtonDanger small showSpinner={isLoading} onPress={handlePress}>
                    Send
                </ButtonDanger>
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
                    <FormTextField name="name" label="name" />
                    <ButtonPrimary submit>Submit</ButtonPrimary>
                </Stack>
            </Box>
        </form>
    </StorySection>
);
