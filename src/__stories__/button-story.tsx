import * as React from 'react';
import {
    Box,
    ButtonDanger,
    ButtonLink,
    ButtonPrimary,
    ButtonSecondary,
    TextField,
    Stack,
    Text2,
    IconPhotoCameraRegular,
    ResponsiveLayout,
} from '..';

export default {
    title: 'Components/Buttons',
    parameters: {fullScreen: true},
    argTypes: {
        icon: {
            options: ['none', 'left', 'right'],
            control: {type: 'select'},
        },
    },
};

const defaultArgs = {
    text: 'Example',
    loadingText: '',
    icon: 'none',
    isInverse: false,
    disabled: false,
    showSpinner: false,
    small: false,
    newTab: false,
};

type Args = {
    text: string;
    loadingText: string;
    icon: string;
    isInverse: boolean;
    disabled: boolean;
    showSpinner: boolean;
    small: boolean;
    newTab: boolean;
};

const href = 'https://example.com';

type Props = {
    isInverse: boolean;
    children: React.ReactNode;
};

const ButtonBackgroundContainer: React.FC<Props> = ({isInverse, children}) => (
    <ResponsiveLayout fullWidth dataAttributes={{testid: 'content'}} isInverse={isInverse}>
        <Box padding={16}>{children}</Box>
    </ResponsiveLayout>
);

export const primaryButton: StoryComponent<Args> = ({isInverse, text, icon, ...props}) => {
    return (
        <ButtonBackgroundContainer isInverse={isInverse}>
            <ButtonPrimary
                href={href}
                {...props}
                StartIcon={icon === 'left' ? IconPhotoCameraRegular : undefined}
                EndIcon={icon === 'right' ? IconPhotoCameraRegular : undefined}
            >
                {text}
            </ButtonPrimary>
        </ButtonBackgroundContainer>
    );
};

export const SecondaryButton: StoryComponent<Args> = ({isInverse, text, icon, ...props}) => {
    return (
        <ButtonBackgroundContainer isInverse={isInverse}>
            <ButtonSecondary
                href={href}
                {...props}
                StartIcon={icon === 'left' ? IconPhotoCameraRegular : undefined}
                EndIcon={icon === 'right' ? IconPhotoCameraRegular : undefined}
            >
                {text}
            </ButtonSecondary>
        </ButtonBackgroundContainer>
    );
};

export const DangerButton: StoryComponent<Args> = ({isInverse, text, icon, ...props}) => {
    return (
        <ButtonBackgroundContainer isInverse={isInverse}>
            <ButtonDanger
                href={href}
                {...props}
                StartIcon={icon === 'left' ? IconPhotoCameraRegular : undefined}
                EndIcon={icon === 'right' ? IconPhotoCameraRegular : undefined}
            >
                {text}
            </ButtonDanger>
        </ButtonBackgroundContainer>
    );
};

export const LinkButton: StoryComponent<Omit<Args, 'small'>> = ({isInverse, text, icon, ...props}) => {
    return (
        <ButtonBackgroundContainer isInverse={isInverse}>
            <ButtonLink
                href={href}
                {...props}
                StartIcon={icon === 'left' ? IconPhotoCameraRegular : undefined}
                EndIcon={icon === 'right' ? IconPhotoCameraRegular : undefined}
            >
                {text}
            </ButtonLink>
        </ButtonBackgroundContainer>
    );
};

export const SubmitButton: StoryComponent = () => (
    <ButtonBackgroundContainer isInverse={false}>
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
    </ButtonBackgroundContainer>
);

primaryButton.storyName = 'ButtonPrimary';
SecondaryButton.storyName = 'ButtonSecondary';
DangerButton.storyName = 'ButtonDanger';
LinkButton.storyName = 'ButtonLink';
SubmitButton.storyName = 'Submit button';

primaryButton.args = defaultArgs;
SecondaryButton.args = defaultArgs;
DangerButton.args = defaultArgs;
LinkButton.args = (({small, ...o}) => o)(defaultArgs);
