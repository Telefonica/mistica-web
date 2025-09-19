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
import tennisImg from './images/tennis.jpg';

export default {
    title: 'Components/Buttons',
    parameters: {fullScreen: true},
};

const defaultArgs = {
    text: 'Example',
    loadingText: '',
    icon: 'none',
    variantOutside: 'default',
    disabled: false,
    showSpinner: false,
    small: false,
    action: 'href',
    newTab: false,
} as const;

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
    variantOutside: {
        options: ['default', 'inverse', 'media'],
        control: {type: 'select'},
    },
};

type Args = {
    text: string;
    loadingText: string;
    icon: string;
    variantOutside: 'default' | 'inverse' | 'media';
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
    variant: 'default' | 'inverse' | 'media';
    children: React.ReactNode;
};

const ButtonBackgroundContainer = ({variant, children}: Props) => (
    <div style={{backgroundImage: variant === 'media' ? `url(${tennisImg})` : undefined}}>
        <ResponsiveLayout fullWidth dataAttributes={{testid: 'content'}} variant={variant}>
            <Box padding={16}>{children}</Box>
        </ResponsiveLayout>
    </div>
);

export const primaryButton: StoryComponent<Args> = ({
    variantOutside,
    text,
    icon,
    action,
    newTab,
    ...props
}) => {
    return (
        <ButtonBackgroundContainer variant={variantOutside}>
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

export const SecondaryButton: StoryComponent<Args> = ({
    variantOutside,
    text,
    icon,
    action,
    newTab,
    ...props
}) => {
    return (
        <ButtonBackgroundContainer variant={variantOutside}>
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

export const DangerButton: StoryComponent<Args> = ({
    variantOutside,
    text,
    icon,
    action,
    newTab,
    ...props
}) => {
    return (
        <ButtonBackgroundContainer variant={variantOutside}>
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

export const LinkButton: StoryComponent<Args & {chevron: string}> = ({
    variantOutside,
    text,
    icon,
    action,
    newTab,
    chevron,
    ...props
}) => {
    return (
        <ButtonBackgroundContainer variant={variantOutside}>
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

export const LinkButtonDanger: StoryComponent<Args> = ({
    variantOutside,
    text,
    icon,
    action,
    newTab,
    ...props
}) => {
    return (
        <ButtonBackgroundContainer variant={variantOutside}>
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
    <ButtonBackgroundContainer variant="default">
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
    ...defaultArgs,
    chevron: 'default',
};
LinkButtonDanger.args = defaultArgs;

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
