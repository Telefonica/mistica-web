import * as React from 'react';
import {useTheme, useScreenSize, useWindowHeight, useIsomorphicLayoutEffect} from './hooks';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import ButtonFixedFooterLayout from './button-fixed-footer-layout';
import OverscrollColor from './overscroll-color-context';
import {O2_CLASSIC_SKIN, VIVO_SKIN} from './skins/constants';
import IcnSuccess from './icons/icon-success';
import IconSuccessVivo from './icons/icon-success-vivo';
import IcnError from './icons/icon-error';
import IcnInfo from './icons/icon-info';
import {
    isWebViewBridgeAvailable,
    requestVibration as requestVibrationNative,
} from '@tef-novum/webview-bridge';
import {isRunningAcceptanceTest} from './utils/platform';
import {Text6, Text2, Text3} from './text';
import Box from './box';
import {Boxed} from './boxed';
import ResponsiveLayout from './responsive-layout';
import Stack from './stack';
import classnames from 'classnames';
import ButtonGroup from './button-group';
import {vars} from './skins/skin-contract.css';
import * as styles from './feedback.css';

import type {Theme} from './theme';
import type {DataAttributes} from './utils/types';
import type {ButtonGroupProps} from './button-group';

const areAnimationsSupported = (platformOverrides: Theme['platformOverrides']) =>
    !isRunningAcceptanceTest(platformOverrides);

const checkHasButtons = ({primaryButton, secondaryButton}: FeedbackButtonsProps) =>
    !!primaryButton || !!secondaryButton;

const BackgroundColor = (): JSX.Element => {
    const isInverse = useIsInverseVariant();

    const css = `body {background:${isInverse ? vars.colors.backgroundBrand : vars.colors.background}}`;
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

/**
 * Manage transitions manually in order to reach 'opacity: 1, translate: (0,0)'
 * even if animations/transitions are disabled by css
 * (CSSTransition does not work here when running in Storybook)
 * @returns boolean whether the transition should start
 */
const useAppearStatus = (): boolean => {
    // A state to manage the text animation with transitions instead of keyframes
    const [appear, setAppear] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
        const requestId = window.requestAnimationFrame(() => {
            setAppear(true);
        });
        return () => window.cancelAnimationFrame(requestId);
    }, []);

    return appear;
};

const renderFeedbackBody = (
    {
        icon,
        title,
        description,
        children,
    }: Pick<FeedbackScreenProps, 'icon' | 'title' | 'description' | 'children'>,
    animateText: boolean,
    appear: boolean
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
            {icon}
            <Stack
                space={16}
                className={classnames(
                    styles.feedbackData,
                    animateText && styles.feedbackDataAppear,
                    animateText && appear && styles.feedbackDataAppearActive
                )}
            >
                <Text6 as="h1">{title}</Text6>
                {normalizedDescription && (
                    <Text3 regular color={vars.colors.textSecondary}>
                        {normalizedDescription}
                    </Text3>
                )}
                {children}
            </Stack>
        </Stack>
    );
};

const renderInlineFeedbackBody = (feedbackBody: React.ReactNode, buttons: ButtonGroupProps) => {
    const hasButtons = checkHasButtons(buttons);
    return (
        <Stack space={24}>
            {feedbackBody}
            {hasButtons && <ButtonGroup {...buttons} />}
        </Stack>
    );
};

const renderFeedbackInDesktop = ({
    isInverse,
    inlineFeedbackBody,
    imageFit,
    imageUrl,
    dataAttributes,
}: {
    isInverse: boolean;
    inlineFeedbackBody: React.ReactNode;
    imageFit?: 'fit' | 'fill';
    imageUrl?: string;
    dataAttributes?: DataAttributes;
}) => (
    <Boxed className={styles.desktopContainer} isInverse={isInverse} dataAttributes={dataAttributes}>
        <div className={styles.desktopContent}>
            <Box padding={64}>{inlineFeedbackBody}</Box>
        </div>
        {imageUrl && (
            <div
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
    </Boxed>
);

type FeedbackButtonsProps = ButtonGroupProps;

interface FeedbackProps extends FeedbackButtonsProps {
    title: string;
    description?: string | Array<string>;
    children?: React.ReactNode;
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
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
    title,
    description,
    children,
    primaryButton,
    secondaryButton,
    link,
    hapticFeedback,
    icon,
    animateText = false,
    unstable_inlineInDesktop,
    imageUrl,
    imageFit,
    dataAttributes,
}) => {
    useHapticFeedback(hapticFeedback);
    const isInverse = useIsInverseVariant();
    const {platformOverrides, isDarkMode, skinName} = useTheme();
    const windowHeight = useWindowHeight();
    const {isTabletOrSmaller} = useScreenSize();
    const [isServerSide, setIsServerSide] = React.useState(typeof self !== 'undefined');
    const [footerHeight, setFooterHeight] = React.useState(0);

    const contentHeight = isServerSide ? '100vh' : `${windowHeight - footerHeight}px`;
    const hasButtons = checkHasButtons({primaryButton, secondaryButton, link});

    const appear = useAppearStatus();

    // This trick along with the 100vh measure allows us to perform a first meaningful render on the server side.
    // We can't use vh on client side because it causes problems with iOS (as sometimes the height is calculated as
    // if there were no OS buttons on bottom): https://bugs.webkit.org/show_bug.cgi?id=141832
    useIsomorphicLayoutEffect(() => {
        setIsServerSide(false);
    }, []);

    const feedbackBody = renderFeedbackBody(
        {icon, title, description, children},
        animateText && areAnimationsSupported(platformOverrides),
        appear
    );
    const inlineFeedbackBody = renderInlineFeedbackBody(feedbackBody, {
        primaryButton,
        secondaryButton,
        link,
    });

    if (!isTabletOrSmaller && unstable_inlineInDesktop) {
        return inlineFeedbackBody;
    }

    const feedbackContent = (
        <div className={styles.container}>
            <ResponsiveLayout>
                <div className={styles.innerContainer}>{feedbackBody}</div>
            </ResponsiveLayout>
        </div>
    );

    return isTabletOrSmaller ? (
        <>
            {isInverse && <OverscrollColor />}
            <div style={{position: 'relative'}}>
                <ButtonFixedFooterLayout
                    isFooterVisible={hasButtons}
                    button={primaryButton}
                    secondaryButton={secondaryButton}
                    link={link}
                    footerBgColor={
                        isInverse && !isDarkMode ? vars.colors.backgroundFeedbackBottom : undefined
                    }
                    containerBgColor={
                        isInverse && !isDarkMode ? vars.colors.backgroundFeedbackBottom : undefined
                    }
                    onChangeFooterHeight={setFooterHeight}
                >
                    {feedbackContent}
                </ButtonFixedFooterLayout>
            </div>
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
            {skinName !== O2_CLASSIC_SKIN && <BackgroundColor />}
        </>
    ) : (
        <ResponsiveLayout>
            <Box paddingTop={64}>
                {renderFeedbackInDesktop({isInverse, inlineFeedbackBody, imageFit, imageUrl, dataAttributes})}
            </Box>
        </ResponsiveLayout>
    );
};

export const SuccessFeedbackScreen: React.FC<AssetFeedbackProps> = ({dataAttributes, ...props}) => {
    const {isTabletOrSmaller} = useScreenSize();
    const {skinName} = useTheme();

    return (
        <ThemeVariant isInverse={!props.unstable_inlineInDesktop || isTabletOrSmaller}>
            <FeedbackScreen
                {...props}
                hapticFeedback="success"
                icon={skinName === VIVO_SKIN ? <IconSuccessVivo /> : <IcnSuccess />}
                animateText
                imageUrl={props.imageUrl}
                imageFit={props.imageFit}
                dataAttributes={{'component-name': 'SuccessFeedbackScreen', ...dataAttributes}}
            />
        </ThemeVariant>
    );
};

interface ErrorFeedbackScreenProps extends FeedbackProps {
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
            icon={<IcnError />}
            animateText
            dataAttributes={{'component-name': 'ErrorFeedbackScreen', ...dataAttributes}}
        >
            {children}
            {errorReference && (
                <Text2 color={vars.colors.textSecondary} regular>
                    {errorReference}
                </Text2>
            )}
        </FeedbackScreen>
    );
};

export const InfoFeedbackScreen: React.FC<FeedbackProps> = ({dataAttributes, ...props}) => {
    return (
        <FeedbackScreen
            dataAttributes={{'component-name': 'InfoFeedbackScreen', ...dataAttributes}}
            icon={<IcnInfo />}
            {...props}
        />
    );
};

export const SuccessFeedback: React.FC<AssetFeedbackProps> = ({
    title,
    description,
    children,
    primaryButton,
    secondaryButton,
    link,
    imageUrl,
    imageFit,
    dataAttributes,
}) => {
    useHapticFeedback('success');
    const {isTabletOrSmaller} = useScreenSize();
    const {skinName, platformOverrides} = useTheme();

    const appear = useAppearStatus();

    const icon = skinName === VIVO_SKIN ? <IconSuccessVivo /> : <IcnSuccess />;
    const feedbackBody = renderFeedbackBody(
        {icon, title, description, children},
        areAnimationsSupported(platformOverrides),
        appear
    );
    const inlineFeedbackBody = renderInlineFeedbackBody(feedbackBody, {
        primaryButton,
        secondaryButton,
        link,
    });

    return isTabletOrSmaller ? (
        <ResponsiveLayout isInverse>
            <OverscrollColor />
            <Box paddingBottom={32} dataAttributes={{'component-name': 'SuccessFeedback', ...dataAttributes}}>
                <div className={styles.innerContainer}>{inlineFeedbackBody}</div>
            </Box>
        </ResponsiveLayout>
    ) : (
        renderFeedbackInDesktop({
            isInverse: true,
            inlineFeedbackBody,
            imageFit,
            imageUrl,
            dataAttributes: {'component-name': 'SuccessFeedback', ...dataAttributes},
        })
    );
};
