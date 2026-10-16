'use client';
import * as React from 'react';
import {useTheme, useScreenSize} from './hooks';
import ButtonFixedFooterLayout from './button-fixed-footer-layout';
import {useSetOverscrollColor} from './overscroll-color-context';
import IconSuccess from './icons/icon-success';
import IconError from './icons/icon-error';
import IconInfo from './icons/icon-info';
import {
    isWebViewBridgeAvailable,
    requestVibration as requestVibrationNative,
} from '@tef-novum/webview-bridge';
import {isRunningAcceptanceTest} from './utils/platform';
import {getTextSizesWithWeight, Text, Text2} from './text';
import Box from './box';
import {InternalBoxed} from './boxed';
import ResponsiveLayout, {ResetResponsiveLayout} from './responsive-layout';
import Stack from './stack';
import classnames from 'classnames';
import ButtonGroup from './button-group';
import {vars} from './skins/skin-contract.css';
import * as styles from './feedback.css';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';

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
    {asset, title, description, slot}: Pick<FeedbackScreenProps, 'asset' | 'title' | 'description' | 'slot'>,
    animateText: boolean,
    textPresets: Pick<Theme['textPresets'], 'feedbackScreenDescription' | 'feedbackScreenTitle'>
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
        <Stack space={40}>
            <div className={styles.assetContainer} data-testid="icon">
                {asset}
            </div>
            <Stack space={16} className={classnames(styles.feedbackData)}>
                <div className={classnames(animateText && styles.feedbackTextAppearFast)} data-testid="title">
                    <Text {...getTextSizesWithWeight({textPreset: textPresets.feedbackScreenTitle})} as="h1">
                        {title}
                    </Text>
                </div>

                {normalizedDescription && (
                    <div
                        className={classnames(animateText && styles.feedbackTextAppearMedium)}
                        data-testid="description"
                    >
                        {normalizedDescription && (
                            <Text
                                {...getTextSizesWithWeight({
                                    textPreset: textPresets.feedbackScreenDescription,
                                })}
                                color={vars.colors.textSecondary}
                            >
                                {normalizedDescription}
                            </Text>
                        )}
                    </div>
                )}

                {slot && (
                    <div
                        className={classnames(
                            animateText &&
                                (normalizedDescription
                                    ? styles.feedbackTextAppearSlow
                                    : styles.feedbackTextAppearMedium)
                        )}
                        data-testid="slot"
                    >
                        {slot}
                    </div>
                )}
            </Stack>
        </Stack>
    );
};

const renderInlineFeedbackBody = (feedbackBody: React.ReactNode, buttons: ButtonGroupProps) => {
    const hasButtons = checkHasButtons(buttons);
    return (
        <Stack space={{desktop: 32, mobile: 24}}>
            {feedbackBody}
            {hasButtons && <ButtonGroup {...buttons} />}
        </Stack>
    );
};

const renderFeedback = ({
    isBrandVariant,
    body,
    imageFit,
    imageUrl,
    dataAttributes,
}: {
    isBrandVariant: boolean;
    body: React.ReactNode;
    imageFit?: 'fit' | 'fill';
    imageUrl?: string;
    dataAttributes?: DataAttributes;
}) => (
    <InternalBoxed
        borderRadius={vars.borderRadii.container}
        desktopOnly
        variant={isBrandVariant ? 'brand' : 'default'}
        dataAttributes={dataAttributes}
    >
        <div className={styles.desktopContainer}>
            <div className={styles.desktopContent}>{body}</div>
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
    slot?: React.ReactNode;
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
    variant?: 'default' | 'brand';
}

export const FeedbackScreen = ({
    title,
    description,
    slot,
    primaryButton,
    secondaryButton,
    link,
    hapticFeedback,
    asset,
    animateText = false,
    variant = 'default',
    unstable_inlineInDesktop,
    imageUrl,
    imageFit,
    dataAttributes,
}: FeedbackScreenProps): JSX.Element => {
    useHapticFeedback(hapticFeedback);
    const {platformOverrides, isDarkMode, textPresets} = useTheme();
    const {isTabletOrSmaller} = useScreenSize();

    const hasButtons = checkHasButtons({primaryButton, secondaryButton, link});

    const feedbackBody = renderFeedbackBody(
        {asset, title, description, slot},
        animateText && areAnimationsSupported(platformOverrides),
        textPresets
    );

    if (!isTabletOrSmaller && unstable_inlineInDesktop) {
        return renderInlineFeedbackBody(feedbackBody, {
            primaryButton,
            secondaryButton,
            link,
        });
    }

    const isBrandVariant = variant === 'brand';

    return (
        <div style={{position: 'relative'}}>
            <ResponsiveLayout>
                {isBrandVariant && <FeedbackScreenOverscrollColor />}
                <Box paddingTop={{desktop: 64, mobile: 0}}>
                    {renderFeedback({
                        isBrandVariant,
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
                                        isBrandVariant && !isDarkMode
                                            ? vars.colors.backgroundBrandBottom
                                            : undefined
                                    }
                                    containerBgColor={
                                        isBrandVariant ? vars.colors.backgroundBrand : vars.colors.background
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
    const {themeVariants} = useTheme();

    return (
        <FeedbackScreen
            {...props}
            variant={
                (themeVariants.successFeedback === 'brand' || themeVariants.successFeedback === 'inverse') &&
                (!props.unstable_inlineInDesktop || isTabletOrSmaller)
                    ? 'brand'
                    : 'default'
            }
            hapticFeedback="success"
            asset={<IconSuccess size="100%" />}
            animateText
            imageUrl={props.imageUrl}
            imageFit={props.imageFit}
            dataAttributes={{
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
                testid: 'ErrorFeedbackScreen',
                ...dataAttributes,
            }}
            slot={
                <Stack space={16}>
                    {otherProps.slot}
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
    const themeVariant = useThemeVariant();

    return (
        <FeedbackScreen
            dataAttributes={{
                testid: 'InfoFeedbackScreen',
                ...dataAttributes,
            }}
            asset={
                <ThemeVariant variant={themeVariant}>
                    <Icon size="100%" color={vars.colors.brand} />
                </ThemeVariant>
            }
            {...props}
        />
    );
};

export const SuccessFeedback = ({
    title,
    description,
    slot,
    primaryButton,
    secondaryButton,
    link,
    imageUrl,
    imageFit,
    dataAttributes,
}: AssetFeedbackProps): JSX.Element => {
    useHapticFeedback('success');
    const {platformOverrides, themeVariants, textPresets} = useTheme();
    const asset = <IconSuccess size="100%" />;
    const feedbackBody = renderFeedbackBody(
        {asset, title, description, slot},
        areAnimationsSupported(platformOverrides),
        textPresets
    );
    const inlineFeedbackBody = renderInlineFeedbackBody(feedbackBody, {
        primaryButton,
        secondaryButton,
        link,
    });

    const isBrandVariant =
        themeVariants.successFeedback === 'inverse' || themeVariants.successFeedback === 'brand';

    return renderFeedback({
        isBrandVariant,
        body: (
            <div className={isBrandVariant ? styles.backgroundBrand : undefined}>
                <Box paddingX={{mobile: 16, tablet: 24, desktop: 0}} paddingBottom={{desktop: 0, mobile: 48}}>
                    <div className={styles.successFeedbackContainer}>{inlineFeedbackBody}</div>
                </Box>
            </div>
        ),
        imageFit,
        imageUrl,
        dataAttributes: {testid: 'SuccessFeedback', ...dataAttributes},
    });
};
