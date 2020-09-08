import * as React from 'react';
import {
    ErrorFeedbackScreen,
    InfoFeedbackScreen,
    SuccessFeedbackScreen,
    FeedbackScreen,
} from '../feedback-screen';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from '../button';
import {useCheckbox, useSelect, useTextField} from './helpers';
import Stack from '../stack';
import IconSuccess from '../icons/icon-success';
import IconError from '../icons/icon-error';
import IconInfo from '../icons/icon-info';
import IconOrders from '../icons/icon-orders';
import Box from '../box';

export default {
    title: 'Components|Feedbacks/FeedbackScreen',
    parameters: {
        fullScreen: true,
    },
};

const primaryButton = <ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>;

const secondaryButton = <ButtonSecondary onPress={() => {}}>Action2</ButtonSecondary>;

const linkButton = <ButtonLink onPress={() => {}}>Action2</ButtonLink>;

const defaultTitle = "I'm the title",
    defaultDescription = "I'm the description";

export const Success: StoryComponent = () => (
    <SuccessFeedbackScreen
        title={defaultTitle}
        description={defaultDescription}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
    />
);
Success.story = {name: 'SuccessFeedbackScreen'};

export const Error: StoryComponent = () => (
    <ErrorFeedbackScreen
        title={defaultTitle}
        description={defaultDescription}
        primaryButton={primaryButton}
        link={linkButton}
    />
);
Error.story = {name: 'ErrorFeedbackScreen'};

export const Info: StoryComponent = () => (
    <InfoFeedbackScreen title={defaultTitle} description={defaultDescription} primaryButton={primaryButton} />
);
Info.story = {name: 'InfoFeedbackScreen'};

export const multipleParagraphs: StoryComponent = () => (
    <SuccessFeedbackScreen
        title={defaultTitle}
        description={[defaultDescription, "I'm the second paragraph"]}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
    />
);

const iconSelectToIcon = {
    None: undefined,
    Success: <IconSuccess />,
    Error: <IconError />,
    Info: <IconInfo />,
    Orders: <IconOrders />,
};

export const Default: StoryComponent = () => {
    const [iconName, iconSelectField] = useSelect(
        'Icon',
        Object.keys(iconSelectToIcon)[0],
        Object.keys(iconSelectToIcon)
    );
    const [title, titleTextField] = useTextField('Title', "I'm the title", true);
    const [description, descriptionTextField] = useTextField('Description', "I'm the description");
    const [primaryButtonText, primaryButtonTextField] = useTextField('Primary button text', '');
    const [secondaryButtonText, secondaryButtonTextField] = useTextField('Secondary button text', '');
    const [linkText, linkTextField] = useTextField('Link button text', '');
    const [isInverseState, isInverseStateCheckbox] = useCheckbox('Inverse variant', false);
    const [animateText, animateTextCheckbox] = useCheckbox('Animate text', true);
    return (
        <Stack space={16}>
            <Box paddingX={16}>
                <Stack space={16}>
                    <span style={{fontSize: 12}}>* Select info as the Type to be able to choose an icon</span>
                    {iconSelectField}
                    {titleTextField}
                    {descriptionTextField}
                    {primaryButtonTextField}
                    {primaryButtonText && secondaryButtonTextField}
                    {primaryButtonText && linkTextField}
                    {animateTextCheckbox}
                    {isInverseStateCheckbox}
                </Stack>
            </Box>
            <FeedbackScreen
                title={title}
                description={description}
                isInverse={isInverseState}
                animateText={animateText}
                icon={iconSelectToIcon[iconName as keyof typeof iconSelectToIcon]}
                primaryButton={
                    primaryButtonText.length ? (
                        <ButtonPrimary onPress={() => {}}>{primaryButtonText}</ButtonPrimary>
                    ) : undefined
                }
                secondaryButton={
                    secondaryButtonText.length ? (
                        <ButtonSecondary onPress={() => {}}>{secondaryButtonText}</ButtonSecondary>
                    ) : undefined
                }
                link={linkText.length ? <ButtonLink onPress={() => {}}>{linkText}</ButtonLink> : undefined}
            />
        </Stack>
    );
};

Default.story = {
    name: 'FeedbackScreen',
};
