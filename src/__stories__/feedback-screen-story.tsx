import * as React from 'react';
import {
    ErrorFeedbackScreen,
    InfoFeedbackScreen,
    SuccessFeedbackScreen,
    FeedbackScreen,
} from '../feedback-screen';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from '../button';
import {useTextField} from './helpers';
import Stack from '../stack';
import {ThemeVariant, useIsInverseVariant} from '../theme-variant-context';
import {useTheme} from '../hooks';
import {Box, Checkbox, FixedToTop, Text3, Text1} from '..';

export default {
    title: 'Components/Screens/FeedbackScreen',
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
Success.storyName = 'SuccessFeedbackScreen';

export const Error: StoryComponent = () => (
    <ErrorFeedbackScreen
        title={defaultTitle}
        description={defaultDescription}
        primaryButton={primaryButton}
        link={linkButton}
    />
);
Error.storyName = 'ErrorFeedbackScreen';

export const Info: StoryComponent = () => (
    <InfoFeedbackScreen title={defaultTitle} description={defaultDescription} primaryButton={primaryButton} />
);
Info.storyName = 'InfoFeedbackScreen';

export const multipleParagraphs: StoryComponent = () => (
    <SuccessFeedbackScreen
        title={defaultTitle}
        description={[defaultDescription, "I'm the second paragraph"]}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
    />
);

const IconOrders: React.FC = () => {
    const {inverse, brand} = useTheme().colors;
    return (
        <svg role="presentation" width="64" height="64" viewBox="0 0 64 64">
            <path
                fill={useIsInverseVariant() ? inverse : brand}
                fillRule="evenodd"
                d="M31.991 0c21.24 0 32.01 10.77 32.01 32.01C64 53.235 53.23 64 31.99 64 10.763 64 .001 53.236.001 32.01 0 10.77 10.762 0 31.99 0zm0 2c-20.18 0-29.99 9.816-29.99 30.01C2 52.19 11.81 62 31.99 62c20.192 0 30.01-9.81 30.01-29.99C62 11.815 52.182 2 31.99 2zm2.25 13.173l.23.134 9.329 5.728c1.608.988 2.614 2.707 2.695 4.582l.005.245v10.247c0 1.887-.939 3.644-2.494 4.693l-.206.133-9.329 5.728c-1.742 1.07-3.919 1.114-5.697.134l-.23-.134-9.328-5.728c-1.608-.987-2.614-2.706-2.695-4.58l-.006-.246V25.862c0-1.887.94-3.644 2.495-4.694l.206-.133 9.328-5.728c1.742-1.07 3.92-1.115 5.698-.134zM18.645 24.9c-.064.232-.104.471-.12.715l-.009.246v10.247c0 1.198.586 2.316 1.56 2.999l.188.123 9.327 5.728c.29.178.6.312.917.402V32.315L18.644 24.9zm25.728 0l-11.865 7.414.001 13.046c.247-.07.487-.166.718-.289l.199-.113 9.328-5.729c1.022-.626 1.668-1.71 1.74-2.898l.007-.223V25.862c0-.33-.044-.652-.128-.961zm-19.499-4.993l-4.61 2.831c-.213.13-.41.28-.587.448l11.832 7.395 5.214-3.26-11.748-7.343c-.036-.022-.07-.046-.1-.071zm4.916-3.01l-.198.113-2.822 1.732 11.703 7.314c.045.029.087.06.126.094l4.742-2.964c-.119-.112-.246-.215-.38-.311l-.207-.137-9.328-5.728c-1.11-.682-2.495-.72-3.636-.114z"
            />
        </svg>
    );
};

const Navbar = ({top}: {top: number}) => {
    const {colors} = useTheme();
    return (
        <div
            style={{
                top,
                background: colors.backgroundBrand,
                position: 'fixed',
                display: 'flex',
                alignItems: 'center',
                zIndex: 100,
                width: '100%',
                height: 56,
                boxSizing: 'border-box',
                paddingLeft: 16,
            }}
        >
            <Text3 medium color={colors.textPrimaryInverse}>
                Navbar
            </Text3>
        </div>
    );
};

export const Default: StoryComponent = () => {
    const [title, titleTextField] = useTextField('Title', "I'm the title", true);
    const [description, descriptionTextField] = useTextField('Description', "I'm the description");
    const [primaryButtonText, primaryButtonTextField] = useTextField('Primary button text', 'Primary');
    const [secondaryButtonText, secondaryButtonTextField] = useTextField(
        'Secondary button text',
        'Secondary'
    );
    const [linkText, linkTextField] = useTextField('Link button text', '');
    const [showIcon, setShowIcon] = React.useState(true);
    const [isInverse, setIsInverse] = React.useState(true);
    const [animateText, setAnimateText] = React.useState(true);
    const [withNavbar, setWithNavbar] = React.useState(true);
    return (
        <FixedToTop height={withNavbar ? 56 : 0}>
            {(top) => (
                <ThemeVariant isInverse={isInverse}>
                    {withNavbar && <Navbar top={top} />}
                    <Box paddingTop={withNavbar ? 56 : 0}>
                        <FeedbackScreen
                            title={title}
                            description={description}
                            animateText={animateText}
                            icon={showIcon ? <IconOrders /> : undefined}
                            primaryButton={
                                primaryButtonText.length ? (
                                    <ButtonPrimary onPress={() => {}}>{primaryButtonText}</ButtonPrimary>
                                ) : undefined
                            }
                            secondaryButton={
                                secondaryButtonText.length ? (
                                    <ButtonSecondary onPress={() => {}}>
                                        {secondaryButtonText}
                                    </ButtonSecondary>
                                ) : undefined
                            }
                            link={
                                linkText.length ? (
                                    <ButtonLink onPress={() => {}}>{linkText}</ButtonLink>
                                ) : undefined
                            }
                        >
                            <Stack space={16}>
                                {titleTextField}
                                {descriptionTextField}
                                {primaryButtonTextField}
                                {primaryButtonText && secondaryButtonTextField}
                                {primaryButtonText && linkTextField}
                                <Checkbox checked={showIcon} onChange={setShowIcon} name="icon">
                                    Show icon
                                </Checkbox>
                                <Checkbox checked={animateText} onChange={setAnimateText} name="animate">
                                    Animate text
                                </Checkbox>
                                <Checkbox checked={withNavbar} onChange={setWithNavbar} name="navbar">
                                    Show navbar (not part of the component)
                                </Checkbox>
                                <Checkbox checked={isInverse} onChange={setIsInverse} name="inverse">
                                    Inverse
                                </Checkbox>
                                <Text1 as="div" regular>
                                    * To see the inverse variant use a mobile screen size and add any button
                                </Text1>
                            </Stack>
                        </FeedbackScreen>
                    </Box>
                </ThemeVariant>
            )}
        </FixedToTop>
    );
};

Default.storyName = 'FeedbackScreen';

//👇 We create a “template” of how args map to rendering
type FeedbackScreenArgs = {
    title: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    linkText: string;
    description: string;
    animateText: boolean;
    showIcon: boolean;
};

const FeedbackScreenTemplate: StoryComponent<FeedbackScreenArgs> = ({
    title,
    primaryButtonText,
    secondaryButtonText,
    linkText,
    description,
    animateText,
    showIcon,
}) => (
    <FeedbackScreen
        title={title}
        description={description}
        animateText={animateText}
        icon={showIcon ? <IconOrders /> : undefined}
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
    >
        <Stack space={16}>lala</Stack>
    </FeedbackScreen>
);

export const FeedbackScreenWithArgs = FeedbackScreenTemplate.bind({});

FeedbackScreenWithArgs.args = {
    title: 'Title',
    primaryButtonText: 'Primary',
    secondaryButtonText: 'Primary',
    linkText: 'LinkText',
    description: 'Description',
    animateText: true,
    showIcon: true,
};
