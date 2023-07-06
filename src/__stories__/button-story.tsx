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
};

const defaultArgs = {
    text: 'Example',
    loadingText: '',
    icon: 'none',
    isInverse: false,
    disabled: false,
    showSpinner: false,
    small: false,
    action: 'href',
    newTab: false,
};

const defaultArgTypes = {
    icon: {
        options: ['none', 'left', 'right'],
        control: {type: 'select'},
    },
    action: {
        options: ['onPress', 'href', 'to'],
        control: {type: 'select'},
    },
    newTab: {if: {arg: 'action', eq: 'href'}},
};

type Args = {
    text: string;
    loadingText: string;
    icon: string;
    isInverse: boolean;
    disabled: boolean;
    showSpinner: boolean;
    small: boolean;
    action: string;
    newTab: boolean;
};

const getButtonActionProps = (action: string, newTab: boolean) => {
    return action === 'onPress'
        ? {
              onPress: () => {
                  window.alert('pressed!');
              },
          }
        : action === 'href'
        ? {
              href: 'https://www.google.com',
              newTab,
          }
        : {
              to: '#',
          };
};

type Props = {
    isInverse: boolean;
    children: React.ReactNode;
};

const ButtonBackgroundContainer: React.FC<Props> = ({isInverse, children}) => (
    <ResponsiveLayout fullWidth dataAttributes={{testid: 'content'}} isInverse={isInverse}>
        <Box padding={16}>{children}</Box>
    </ResponsiveLayout>
);

export const primaryButton: StoryComponent<Args> = ({isInverse, text, icon, action, newTab, ...props}) => {
    return (
        <ButtonBackgroundContainer isInverse={isInverse}>
            <ButtonPrimary
                {...props}
                {...getButtonActionProps(action, newTab)}
                StartIcon={icon === 'left' ? IconPhotoCameraRegular : undefined}
                EndIcon={icon === 'right' ? IconPhotoCameraRegular : undefined}
            >
                {text}
            </ButtonPrimary>
        </ButtonBackgroundContainer>
    );
};

export const SecondaryButton: StoryComponent<Args> = ({isInverse, text, icon, action, newTab, ...props}) => {
    return (
        <ButtonBackgroundContainer isInverse={isInverse}>
            <ButtonSecondary
                {...props}
                {...getButtonActionProps(action, newTab)}
                StartIcon={icon === 'left' ? IconPhotoCameraRegular : undefined}
                EndIcon={icon === 'right' ? IconPhotoCameraRegular : undefined}
            >
                {text}
            </ButtonSecondary>
        </ButtonBackgroundContainer>
    );
};

export const DangerButton: StoryComponent<Args> = ({isInverse, text, icon, action, newTab, ...props}) => {
    return (
        <ButtonBackgroundContainer isInverse={isInverse}>
            <ButtonDanger
                {...props}
                {...getButtonActionProps(action, newTab)}
                StartIcon={icon === 'left' ? IconPhotoCameraRegular : undefined}
                EndIcon={icon === 'right' ? IconPhotoCameraRegular : undefined}
            >
                {text}
            </ButtonDanger>
        </ButtonBackgroundContainer>
    );
};

export const LinkButton: StoryComponent<Omit<Args, 'small'> & {withChevron: string}> = ({
    isInverse,
    text,
    icon,
    action,
    newTab,
    withChevron,
    ...props
}) => {
    return (
        <ButtonBackgroundContainer isInverse={isInverse}>
            <ButtonLink
                {...props}
                withChevron={withChevron === 'default' ? undefined : withChevron === 'true'}
                {...getButtonActionProps(action, newTab)}
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
LinkButton.args = {
    ...(({small, ...o}) => o)(defaultArgs),
    withChevron: 'default',
};

primaryButton.argTypes = defaultArgTypes;
SecondaryButton.argTypes = defaultArgTypes;
DangerButton.argTypes = defaultArgTypes;
LinkButton.argTypes = {
    ...defaultArgTypes,
    withChevron: {
        options: ['default', 'true', 'false'],
        control: {type: 'select'},
    },
};
