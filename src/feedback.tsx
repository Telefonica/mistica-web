'use client';
import * as React from 'react';
import {useTheme, useScreenSize} from './hooks';
import ButtonFixedFooterLayout from './button-fixed-footer-layout';
import {VIVO_NEW_SKIN, VIVO_SKIN} from './skins/constants';
import {useSetOverscrollColor} from './overscroll-color-context';
import IconSuccess from './icons/icon-success';
import IconSuccessVivo from './icons/icon-success-vivo';
import IconError from './icons/icon-error';
import IconInfo from './icons/icon-info';
import {
    isWebViewBridgeAvailable,
    requestVibration as requestVibrationNative,
} from '@tef-novum/webview-bridge';
import {isRunningAcceptanceTest} from './utils/platform';
import {Text6, Text2, Text3} from './text';
import Box from './box';
import {InternalBoxed} from './boxed';
import ResponsiveLayout, {ResetResponsiveLayout} from './responsive-layout';
import Stack from './stack';
import classnames from 'classnames';
import ButtonGroup from './button-group';
import {vars} from './skins/skin-contract.css';
import * as styles from './feedback.css';
import IconSuccessVivoNew from './icons/icon-success-vivo-new';

import type {Theme} from './theme';
import type {DataAttributes, IconProps} from './utils/types';
import type {ButtonGroupProps} from './button-group';

const areAnimationsSupported = (platformOverrides: Theme['platformOverrides']) =>
    !isRunningAcceptanceTest(platformOverrides);

const checkHasButtons = ({primaryButton, secondaryButton}: FeedbackButtonsProps) =>
    !!primaryButton || !!secondaryButton;

type HapticFeedback = 'error' | 'success';

const requestVibration = (type: HapticFeedback) => {
    if (isWebViewBridgeAvailable()) {
        requestVibrationNative(type).catch(() => {});
    }
};

const useHapticFeedback = (type?: HapticFeedback) => {
    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (type === 'success') {
            timeoutId = setTimeout(() => requestVibration('success'), 700);
        }

        if (type === 'error') {
            timeoutId = setTimeout(() => requestVibration('error'), 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [type]);
};

const renderFeedbackBody = (
    {
        asset,
        title,
        description,
        extra,
    }: Pick<FeedbackScreenProps, 'asset' | 'title' | 'description' | 'extra'>,
    animateText: boolean
) => {
    const normalizedDescription =
        description && Array.isArray(description) ? (
            <Stack space={16}>
                {description.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
            </Stack>
        ) : (
            description
        );
    return (
        <Stack space={24}>
            <div className={styles.assetContainer} data-testid="icon">
                {asset}
            </div>
            <Stack space={16} className={classnames(styles.feedbackData)}>
                <div className={classnames(animateText && styles.feedbackTextAppearFast)} data-testid="title">
                    <Text6 as="h1">{title}</Text6>
                </div>

                {normalizedDescription && (
                    <div
                        className={classnames(animateText && styles.feedbackTextAppearMedium)}
                        data-testid="description"
                    >
                        {normalizedDescription && (
                            <Text3 regular color={vars.colors.textSecondary}>
                                {normalizedDescription}
                            </Text3>
                        )}
                    </div>
                )}

                {extra && (
                    <div
                        className={classnames(
                            animateText &&
                                (normalizedDescription
                                    ? styles.feedbackTextAppearSlow
                                    : styles.feedbackTextAppearMedium)
                        )}
                        data-testid="slot"
                    >
                        {extra}
                    </div>
                )}
            </Stack>
        </Stack>
    );
};

const renderInlineFeedbackBody = (feedbackBody: React.ReactNode, buttons: ButtonGroupProps) => {
    const hasButtons = checkHasButtons(buttons);
    return (
        <Stack space={{desktop: 40, mobile: 24}}>
            {feedbackBody}
            {hasButtons && <ButtonGroup {...buttons} />}
        </Stack>
    );
};

const renderFeedback = ({
    isInverse,
    body,
    imageFit,
    imageUrl,
    dataAttributes,
}: {
    isInverse: boolean;
    body: React.ReactNode;
    imageFit?: 'fit' | 'fill';
    imageUrl?: string;
    dataAttributes?: DataAttributes;
}) => (
    <InternalBoxed
        borderRadius={vars.borderRadii.legacyDisplay}
        desktopOnly
        variant={isInverse ? 'inverse' : 'default'}
        dataAttributes={dataAttributes}
    >
        <div className={styles.desktopContainer}>
            <div className={styles.desktopContent}>
                <Box padding={{desktop: 64, mobile: 0}} paddingTop={0}>
                    {body}
                </Box>
            </div>
            {imageUrl && (
                <div
                    className={styles.desktopImage}
                    data-testid="image"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundPosition: imageFit === 'fit' ? 'bottom right' : 'center right',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: imageFit === 'fit' ? 'contain' : 'cover',
                        flex: 1,
                        maxWidth: 600,
                    }}
                />
            )}
        </div>
    </InternalBoxed>
);

const FeedbackScreenOverscrollColor = () => {
    useSetOverscrollColor({
        topColor: vars.colors.backgroundBrandTop,
        bottomColor: 'transparent',
    });
    return null;
};

type FeedbackButtonsProps = ButtonGroupProps;

interface FeedbackProps extends FeedbackButtonsProps {
    title: string;
    description?: string | ReadonlyArray<string>;
    extra?: React.ReactNode;
    unstable_inlineInDesktop?: boolean;
    dataAttributes?: DataAttributes;
}

interface AssetFeedbackProps extends FeedbackProps {
    imageUrl?: string;
    imageFit?: 'fit' | 'fill'; // defaults to 'fill'
}

interface FeedbackScreenProps extends AssetFeedbackProps {
    hapticFeedback?: HapticFeedback;
    asset?: React.ReactNode;
    animateText?: boolean;
    isInverse?: boolean;
}

export const FeedbackScreen = ({
    title,
    description,
    extra,
    primaryButton,
    secondaryButton,
    link,
    hapticFeedback,
    asset,
    animateText = false,
    isInverse = false,
    unstable_inlineInDesktop,
    imageUrl,
    imageFit,
    dataAttributes,
}: FeedbackScreenProps): JSX.Element => {
    useHapticFeedback(hapticFeedback);
    const {platformOverrides, isDarkMode} = useTheme();
    const {isTabletOrSmaller} = useScreenSize();

    const hasButtons = checkHasButtons({primaryButton, secondaryButton, link});

    const feedbackBody = renderFeedbackBody(
        {asset, title, description, extra},
        animateText && areAnimationsSupported(platformOverrides)
    );

    if (!isTabletOrSmaller && unstable_inlineInDesktop) {
        return renderInlineFeedbackBody(feedbackBody, {
            primaryButton,
            secondaryButton,
            link,
        });
    }

    return (
        <div style={{position: 'relative'}}>
            <ResponsiveLayout>
                {isInverse && <FeedbackScreenOverscrollColor />}
                <Box paddingTop={{desktop: 64, mobile: 0}}>
                    {renderFeedback({
                        isInverse,
                        body: (
                            // We need this reset because the ButtonFixedFooterLayout adds a ResponsiveLayout that
                            // doesn't expand when nested in mobile. This can cause double margin when footer is not fixed
                            <ResetResponsiveLayout skipDesktop>
                                <ButtonFixedFooterLayout
                                    isFooterVisible={hasButtons}
                                    button={primaryButton}
                                    secondaryButton={secondaryButton}
                                    link={link}
                                    footerBgColor={
                                        isInverse && !isDarkMode
                                            ? vars.colors.backgroundBrandBottom
                                            : undefined
                                    }
                                    containerBgColor={
                                        isInverse ? vars.colors.backgroundBrand : vars.colors.background
                                    }
                                >
                                    <ResponsiveLayout>
                                        <div className={styles.container}>
                                            <div
                                                className={classnames(styles.innerContainer, {
                                                    [styles.innerContainerWithButtons]:
                                                        primaryButton || secondaryButton || link,
                                                })}
                                            >
                                                {feedbackBody}
                                            </div>
                                        </div>
                                    </ResponsiveLayout>
                                </ButtonFixedFooterLayout>
                            </ResetResponsiveLayout>
                        ),
                        imageFit,
                        imageUrl,
                        dataAttributes,
                    })}
                </Box>
            </ResponsiveLayout>
        </div>
    );
};

export const SuccessFeedbackScreen = ({dataAttributes, ...props}: AssetFeedbackProps): JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const {skinName, themeVariants} = useTheme();

    return (
        <FeedbackScreen
            {...props}
            isInverse={
                themeVariants.successFeedback === 'inverse' &&
                (!props.unstable_inlineInDesktop || isTabletOrSmaller)
            }
            hapticFeedback="success"
            asset={
                skinName === VIVO_SKIN ? (
                    <IconSuccessVivo size="100%" />
                ) : skinName === VIVO_NEW_SKIN ? (
                    <IconSuccessVivoNew size="100%" />
                ) : (
                    <IconSuccess size="100%" />
                )
            }
            animateText
            imageUrl={props.imageUrl}
            imageFit={props.imageFit}
            dataAttributes={{
                'component-name': 'SuccessFeedbackScreen',
                testid: 'SuccessFeedbackScreen',
                ...dataAttributes,
            }}
        />
    );
};

interface ErrorFeedbackScreenProps extends FeedbackProps {
    errorReference?: string;
}

export const ErrorFeedbackScreen = ({
    errorReference,
    dataAttributes,
    ...otherProps
}: ErrorFeedbackScreenProps): JSX.Element => {
    return (
        <FeedbackScreen
            {...otherProps}
            hapticFeedback="error"
            asset={<IconError size="100%" />}
            animateText
            dataAttributes={{
                'component-name': 'ErrorFeedbackScreen',
                testid: 'ErrorFeedbackScreen',
                ...dataAttributes,
            }}
            extra={
                <Stack space={16}>
                    {otherProps.extra}
                    {errorReference && (
                        <Text2 color={vars.colors.textSecondary} regular>
                            {errorReference}
                        </Text2>
                    )}
                </Stack>
            }
        />
    );
};

interface InfoFeedbackScreenProps extends FeedbackProps {
    Icon?: (props: IconProps) => JSX.Element;
}

export const InfoFeedbackScreen = ({
    dataAttributes,
    Icon = IconInfo,
    ...props
}: InfoFeedbackScreenProps): JSX.Element => {
    return (
        <FeedbackScreen
            dataAttributes={{
                'component-name': 'InfoFeedbackScreen',
                testid: 'InfoFeedbackScreen',
                ...dataAttributes,
            }}
            asset={<Icon size="100%" color={vars.colors.brand} />}
            {...props}
        />
    );
};

export const SuccessFeedback = ({
    title,
    description,
    extra,
    primaryButton,
    secondaryButton,
    link,
    imageUrl,
    imageFit,
    dataAttributes,
}: AssetFeedbackProps): JSX.Element => {
    useHapticFeedback('success');
    const {skinName, platformOverrides, themeVariants} = useTheme();

    const asset =
        skinName === VIVO_SKIN ? (
            <IconSuccessVivo size="100%" />
        ) : skinName === VIVO_NEW_SKIN ? (
            <IconSuccessVivoNew size="100%" />
        ) : (
            <IconSuccess size="100%" />
        );
    const feedbackBody = renderFeedbackBody(
        {asset, title, description, extra},
        areAnimationsSupported(platformOverrides)
    );
    const inlineFeedbackBody = renderInlineFeedbackBody(feedbackBody, {
        primaryButton,
        secondaryButton,
        link,
    });

    const isInverse = themeVariants.successFeedback === 'inverse';

    return renderFeedback({
        isInverse,
        body: (
            <div className={isInverse ? styles.backgroundBrand : undefined}>
                <Box paddingX={{mobile: 16, tablet: 24, desktop: 0}}>
                    <Box paddingBottom={{desktop: 0, mobile: 48}} paddingTop={64}>
                        {inlineFeedbackBody}
                    </Box>
                </Box>
            </div>
        ),
        imageFit,
        imageUrl,
        dataAttributes: {'component-name': 'SuccessFeedback', testid: 'SuccessFeedback', ...dataAttributes},
    });
};
