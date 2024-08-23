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
    ButtonLinkDanger,
} from '..';

export default {
    title: 'Components/Buttons',
    parameters: {fullScreen: true},
};

const defaultArgs = {
    text: 'Example',
    loadingText: '',
    icon: 'none',
    inverse: false,
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
    inverse: boolean;
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
    inverse: boolean;
    children: React.ReactNode;
};

const ButtonBackgroundContainer: React.FC<Props> = ({inverse, children}) => (
    <ResponsiveLayout fullWidth dataAttributes={{testid: 'content'}} isInverse={inverse}>
        <Box padding={16}>{children}</Box>
    </ResponsiveLayout>
);

export const primaryButton: StoryComponent<Args> = ({inverse, text, icon, action, newTab, ...props}) => {
    return (
        <ButtonBackgroundContainer inverse={inverse}>
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

export const SecondaryButton: StoryComponent<Args> = ({inverse, text, icon, action, newTab, ...props}) => {
    return (
        <ButtonBackgroundContainer inverse={inverse}>
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

export const DangerButton: StoryComponent<Args> = ({inverse, text, icon, action, newTab, ...props}) => {
    return (
        <ButtonBackgroundContainer inverse={inverse}>
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

export const LinkButton: StoryComponent<Omit<Args, 'small'> & {chevron: string}> = ({
    inverse,
    text,
    icon,
    action,
    newTab,
    chevron,
    ...props
}) => {
    return (
        <ButtonBackgroundContainer inverse={inverse}>
            <ButtonLink
                {...props}
                withChevron={chevron === 'default' ? undefined : chevron === 'true'}
                {...getButtonActionProps(action, newTab)}
                StartIcon={icon === 'left' ? IconPhotoCameraRegular : undefined}
                EndIcon={icon === 'right' ? IconPhotoCameraRegular : undefined}
            >
                {text}
            </ButtonLink>
        </ButtonBackgroundContainer>
    );
};

export const LinkButtonDanger: StoryComponent<Omit<Args, 'small'>> = ({
    inverse,
    text,
    icon,
    action,
    newTab,
    ...props
}) => {
    return (
        <ButtonBackgroundContainer inverse={inverse}>
            <ButtonLinkDanger
                {...props}
                {...getButtonActionProps(action, newTab)}
                StartIcon={icon === 'left' ? IconPhotoCameraRegular : undefined}
                EndIcon={icon === 'right' ? IconPhotoCameraRegular : undefined}
            >
                {text}
            </ButtonLinkDanger>
        </ButtonBackgroundContainer>
    );
};

export const SubmitButton: StoryComponent = () => (
    <ButtonBackgroundContainer inverse={false}>
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
LinkButtonDanger.storyName = 'ButtonLinkDanger';
SubmitButton.storyName = 'Submit button';

primaryButton.args = defaultArgs;
SecondaryButton.args = defaultArgs;
DangerButton.args = defaultArgs;
LinkButton.args = {
    ...(({small, ...o}) => o)(defaultArgs),
    chevron: 'default',
};
LinkButtonDanger.args = {
    ...(({small, ...o}) => o)(defaultArgs),
};

primaryButton.argTypes = defaultArgTypes;
SecondaryButton.argTypes = defaultArgTypes;
DangerButton.argTypes = defaultArgTypes;
LinkButton.argTypes = {
    ...defaultArgTypes,
    chevron: {
        options: ['default', 'true', 'false'],
        control: {type: 'select'},
    },
};
LinkButtonDanger.argTypes = defaultArgTypes;
