import * as React from 'react';
import {
    Box,
    FixedToTop,
    Text3,
    Text2,
    skinVars,
    useIsInverseOrMediaVariant,
    Stack,
    ButtonLink,
    ButtonPrimary,
    ButtonSecondary,
    FeedbackScreen,
} from '..';

export default {
    title: 'Patterns/Feedback/FeedbackScreen',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        imageFit: {
            options: ['fit', 'fill'],
            control: {type: 'select'},
        },
    },
};

const IconOrders = (): JSX.Element => {
    const {inverse, brand} = skinVars.colors;
    return (
        <svg role="presentation" width="100%" height="100%" viewBox="0 0 64 64">
            <path
                fill={useIsInverseOrMediaVariant() ? inverse : brand}
                fillRule="evenodd"
                d="M31.991 0c21.24 0 32.01 10.77 32.01 32.01C64 53.235 53.23 64 31.99 64 10.763 64 .001 53.236.001 32.01 0 10.77 10.762 0 31.99 0zm0 2c-20.18 0-29.99 9.816-29.99 30.01C2 52.19 11.81 62 31.99 62c20.192 0 30.01-9.81 30.01-29.99C62 11.815 52.182 2 31.99 2zm2.25 13.173l.23.134 9.329 5.728c1.608.988 2.614 2.707 2.695 4.582l.005.245v10.247c0 1.887-.939 3.644-2.494 4.693l-.206.133-9.329 5.728c-1.742 1.07-3.919 1.114-5.697.134l-.23-.134-9.328-5.728c-1.608-.987-2.614-2.706-2.695-4.58l-.006-.246V25.862c0-1.887.94-3.644 2.495-4.694l.206-.133 9.328-5.728c1.742-1.07 3.92-1.115 5.698-.134zM18.645 24.9c-.064.232-.104.471-.12.715l-.009.246v10.247c0 1.198.586 2.316 1.56 2.999l.188.123 9.327 5.728c.29.178.6.312.917.402V32.315L18.644 24.9zm25.728 0l-11.865 7.414.001 13.046c.247-.07.487-.166.718-.289l.199-.113 9.328-5.729c1.022-.626 1.668-1.71 1.74-2.898l.007-.223V25.862c0-.33-.044-.652-.128-.961zm-19.499-4.993l-4.61 2.831c-.213.13-.41.28-.587.448l11.832 7.395 5.214-3.26-11.748-7.343c-.036-.022-.07-.046-.1-.071zm4.916-3.01l-.198.113-2.822 1.732 11.703 7.314c.045.029.087.06.126.094l4.742-2.964c-.119-.112-.246-.215-.38-.311l-.207-.137-9.328-5.728c-1.11-.682-2.495-.72-3.636-.114z"
            />
        </svg>
    );
};

const Navbar = ({top}: {top: number}) => {
    return (
        <div
            style={{
                top,
                background: skinVars.colors.backgroundBrand,
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
            <Text3 medium color={skinVars.colors.textPrimaryInverse}>
                Navbar
            </Text3>
        </div>
    );
};

type FeedbackScreenArgs = {
    title: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    linkText: string;
    description: string;
    animateText: boolean;
    icon: boolean;
    navbar: boolean;
    inverse: boolean;
    imageUrl: string | null;
    imageFit: 'fit' | 'fill';
    multipleParagraphs: boolean;
};

export const FeedbackScreenStory: StoryComponent<FeedbackScreenArgs> = ({
    title,
    primaryButtonText,
    secondaryButtonText,
    linkText,
    description,
    multipleParagraphs,
    animateText,
    icon,
    navbar,
    inverse,
    imageUrl,
    imageFit,
}) => (
    <FixedToTop height={navbar ? 56 : 0}>
        {(top) => (
            <>
                {navbar && <Navbar top={top} />}
                <Box paddingTop={navbar ? 56 : 0}>
                    <FeedbackScreen
                        isInverse={inverse}
                        title={title}
                        description={
                            multipleParagraphs ? [description, 'paragraph 2', 'paragraph 3'] : description
                        }
                        animateText={animateText}
                        asset={icon ? <IconOrders /> : undefined}
                        imageUrl={imageUrl ?? undefined}
                        imageFit={imageFit}
                        primaryButton={
                            primaryButtonText ? (
                                <ButtonPrimary fake>{primaryButtonText}</ButtonPrimary>
                            ) : undefined
                        }
                        secondaryButton={
                            secondaryButtonText ? (
                                <ButtonSecondary fake>{secondaryButtonText}</ButtonSecondary>
                            ) : undefined
                        }
                        link={linkText ? <ButtonLink href="#">{linkText}</ButtonLink> : undefined}
                        extra={
                            <Stack space={16}>
                                <Text2 regular as="p">
                                    Your content goes here.
                                </Text2>
                                <Text2 regular as="p">
                                    You can customize this story. Check the "Controls" tab.
                                </Text2>
                            </Stack>
                        }
                    />
                </Box>
            </>
        )}
    </FixedToTop>
);

FeedbackScreenStory.storyName = 'FeedbackScreen';

FeedbackScreenStory.args = {
    title: 'Title',
    primaryButtonText: 'Primary',
    secondaryButtonText: 'Secondary',
    linkText: 'LinkText',
    description: 'Description',
    multipleParagraphs: false,
    animateText: true,
    icon: true,
    navbar: true,
    inverse: false,
    imageUrl: '',
    imageFit: 'fit',
};
