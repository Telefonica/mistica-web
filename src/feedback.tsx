'use client';
import * as React from 'react';
import {useTheme, useScreenSize, useWindowHeight, useIsomorphicLayoutEffect} from './hooks';
import * as mq from './media-queries.css';
import ButtonFixedFooterLayout from './button-fixed-footer-layout';
import {useSetOverscrollColor} from './overscroll-color-context';
import {O2_CLASSIC_SKIN, VIVO_NEW_SKIN, VIVO_SKIN} from './skins/constants';
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
import ResponsiveLayout from './responsive-layout';
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

const BackgroundColor = ({isInverse}: {isInverse: boolean}): JSX.Element => {
    const css = `@media ${mq.tabletOrSmaller} {
        body {background:${
            isInverse ? vars.colors.backgroundBrand : vars.colors.background
        }; background-attachment: fixed;}
    }`;
    return <style>{css}</style>;
};

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
    {icon, title, description, extra}: Pick<FeedbackScreenProps, 'icon' | 'title' | 'description' | 'extra'>,
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
            <div className={styles.iconContainer}>{icon}</div>
            <Stack space={16} className={classnames(styles.feedbackData)}>
                <div className={classnames(animateText && styles.feedbackTextAppearFast)}>
                    <Text6 as="h1">{title}</Text6>
                </div>

                {normalizedDescription && (
                    <div className={classnames(animateText && styles.feedbackTextAppearMedium)}>
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
        isInverse={isInverse}
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
        topColor: vars.colors.backgroundBrand, // TODO: use the new backgroundBrandTop/backgroundBrandBottom colors when available
        bottomColor: vars.colors.backgroundFeedbackBottom,
    });
    return null;
};

type FeedbackButtonsProps = ButtonGroupProps;

interface FeedbackProps extends FeedbackButtonsProps {
    title: string;
    description?: string | Array<string>;
    /**
     * @deprecated This field is deprecated, please use extra instead.
     */
    children?: React.ReactNode;
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
    icon?: React.ReactNode;
    animateText?: boolean;
    isInverse?: boolean;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
    title,
    description,
    children,
    extra,
    primaryButton,
    secondaryButton,
    link,
    hapticFeedback,
    icon,
    animateText = false,
    isInverse = false,
    unstable_inlineInDesktop,
    imageUrl,
    imageFit,
    dataAttributes,
}) => {
    useHapticFeedback(hapticFeedback);
    const {platformOverrides, isDarkMode, skinName} = useTheme();
    const windowHeight = useWindowHeight();
    const {isTabletOrSmaller} = useScreenSize();
    const [isServerSide, setIsServerSide] = React.useState(typeof self !== 'undefined');
    const [footerHeight, setFooterHeight] = React.useState(0);

    const contentHeight = isServerSide ? '100vh' : `${windowHeight - footerHeight}px`;
    const hasButtons = checkHasButtons({primaryButton, secondaryButton, link});

    // This trick along with the 100vh measure allows us to perform a first meaningful render on the server side.
    // We can't use vh on client side because it causes problems with iOS (as sometimes the height is calculated as
    // if there were no OS buttons on bottom): https://bugs.webkit.org/show_bug.cgi?id=141832
    useIsomorphicLayoutEffect(() => {
        setIsServerSide(false);
    }, []);

    const feedbackBody = renderFeedbackBody(
        {icon, title, description, extra: extra ?? children},
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
            {isInverse && <FeedbackScreenOverscrollColor />}
            <ResponsiveLayout>
                <Box paddingTop={{desktop: 64, mobile: 0}}>
                    {renderFeedback({
                        isInverse,
                        body: (
                            <ButtonFixedFooterLayout
                                isFooterVisible={hasButtons}
                                button={primaryButton}
                                secondaryButton={secondaryButton}
                                link={link}
                                footerBgColor={
                                    isInverse && !isDarkMode ? vars.colors.backgroundBrandBottom : undefined
                                }
                                containerBgColor="transparent"
                                onChangeFooterHeight={setFooterHeight}
                            >
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
                            </ButtonFixedFooterLayout>
                        ),
                        imageFit,
                        imageUrl,
                        dataAttributes,
                    })}
                </Box>
            </ResponsiveLayout>
            {skinName === O2_CLASSIC_SKIN && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: footerHeight,
                        top: 0,
                        left: 0,
                        right: 0,
                        // This extra height is a workaround to make sure the background div is displayed *under* the fixed footer.
                        // Otherwise in some devices (Galaxy S20+) the background and the fixed footer are rendered with some distance between them
                        height: hasButtons ? `calc(${contentHeight} + 1px)` : `calc(${contentHeight})`,
                        background: isInverse ? vars.colors.backgroundBrand : vars.colors.background,
                    }}
                />
            )}
            {/* Bug: https://jira.tid.es/browse/CHECKOUT-3340. Solution for all brands but o2-classic (gradient background) is setting body color. */}
            {skinName !== O2_CLASSIC_SKIN && <BackgroundColor isInverse={isInverse} />}
        </div>
    );
};

export const SuccessFeedbackScreen: React.FC<AssetFeedbackProps> = ({dataAttributes, ...props}) => {
    const {isTabletOrSmaller} = useScreenSize();
    const {skinName} = useTheme();

    return (
        <FeedbackScreen
            {...props}
            isInverse={!props.unstable_inlineInDesktop || isTabletOrSmaller}
            hapticFeedback="success"
            icon={
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
            dataAttributes={{'component-name': 'SuccessFeedbackScreen', ...dataAttributes}}
        />
    );
};

interface ErrorFeedbackScreenProps extends Omit<FeedbackProps, 'extra'> {
    errorReference?: string;
}

export const ErrorFeedbackScreen: React.FC<ErrorFeedbackScreenProps> = ({
    children,
    errorReference,
    dataAttributes,
    ...otherProps
}) => {
    return (
        <FeedbackScreen
            {...otherProps}
            hapticFeedback="error"
            icon={<IconError size="100%" />}
            animateText
            dataAttributes={{'component-name': 'ErrorFeedbackScreen', ...dataAttributes}}
            extra={
                <Stack space={16}>
                    {children}
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
    Icon?: React.FC<IconProps>;
}

export const InfoFeedbackScreen: React.FC<InfoFeedbackScreenProps> = ({
    dataAttributes,
    Icon = IconInfo,
    ...props
}) => {
    return (
        <FeedbackScreen
            dataAttributes={{'component-name': 'InfoFeedbackScreen', ...dataAttributes}}
            icon={<Icon size="100%" />}
            {...props}
        />
    );
};

export const SuccessFeedback: React.FC<AssetFeedbackProps> = ({
    title,
    description,
    children,
    extra,
    primaryButton,
    secondaryButton,
    link,
    imageUrl,
    imageFit,
    dataAttributes,
}) => {
    useHapticFeedback('success');
    const {skinName, platformOverrides} = useTheme();

    const icon =
        skinName === VIVO_SKIN ? (
            <IconSuccessVivo size="100%" />
        ) : skinName === VIVO_NEW_SKIN ? (
            <IconSuccessVivoNew size="100%" />
        ) : (
            <IconSuccess size="100%" />
        );
    const feedbackBody = renderFeedbackBody(
        {icon, title, description, extra: extra ?? children},
        areAnimationsSupported(platformOverrides)
    );
    const inlineFeedbackBody = renderInlineFeedbackBody(feedbackBody, {
        primaryButton,
        secondaryButton,
        link,
    });

    return renderFeedback({
        isInverse: true,
        body: (
            <div className={styles.backgroundBrand}>
                <Box paddingX={{mobile: 16, tablet: 24, desktop: 0}}>
                    <Box paddingBottom={{desktop: 0, mobile: 48}} paddingTop={64}>
                        {inlineFeedbackBody}
                    </Box>
                </Box>
            </div>
        ),
        imageFit,
        imageUrl,
        dataAttributes: {'component-name': 'SuccessFeedback', ...dataAttributes},
    });
};
