import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme, useScreenSize, useWindowHeight, useIsomorphicLayoutEffect} from './hooks';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import ButtonFixedFooterLayout from './button-fixed-footer-layout';
import OverscrollColor from './overscroll-color-context';
import {VIVO_SKIN} from './skins/constants';
import IcnSuccess from './icons/icon-success';
import IconSuccessVivo from './icons/icon-success-vivo';
import IcnError from './icons/icon-error';
import IcnInfo from './icons/icon-info';
import {
    isWebViewBridgeAvailable,
    requestVibration as requestVibrationNative,
} from '@tef-novum/webview-bridge';
import {isOldChrome, isRunningAcceptanceTest} from './utils/platform';
import {Theme} from './theme';
import {Text6, Text4, Text2} from './text';
import Box from './box';
import {Boxed} from './boxed';
import ResponsiveLayout from './responsive-layout';
import Stack from './stack';

import type {DataAttributes} from './utils/types';
import {Colors} from './skins/types';
import classnames from 'classnames';
import ButtonGroup from './button-group';

import type {ButtonGroupProps} from './button-group';

const areAnimationsSupported = (platformOverrides: Theme['platformOverrides']) =>
    !isOldChrome(platformOverrides) && !isRunningAcceptanceTest(platformOverrides);

const checkHasButtons = ({primaryButton, secondaryButton}: FeedbackButtonsProps) =>
    !!primaryButton || !!secondaryButton;

const useStyles = createUseStyles((theme) => ({
    background: {
        background: ({isInverse}) => (isInverse ? theme.colors.backgroundBrand : 'initial'),
    },
    desktopContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    desktopContent: {
        [theme.mq.desktopOrBigger]: {
            width: '50%',
        },
    },
    desktopImage: {
        backgroundImage: ({imageUrl}) => `url(${imageUrl})`,
        backgroundPosition: ({imageFit}) => (imageFit === 'fit' ? 'bottom right' : 'center right'),
        backgroundRepeat: 'no-repeat',
        backgroundSize: ({imageFit}) => (imageFit === 'fit' ? 'contain' : 'cover'),
        flex: 1,
        maxWidth: 600,
    },
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        margin: 'auto',
        '& *': {
            zIndex: 1,
        },
    },

    backgroundDiv: {
        position: 'absolute',
        bottom: ({footerHeight}) => footerHeight,
        top: 0,
        left: 0,
        right: 0,
        // This extra height is a workaround to make sure the background div is displayed *under* the fixed footer.
        // Otherwise in some devices (Galaxy S20+) the background and the fixed footer are rendered with some distance between them
        height: ({contentHeight, hasButtons}) =>
            hasButtons ? `calc(${contentHeight} + 1px)` : `calc(${contentHeight})`,
        background: ({isInverse}) => (isInverse ? theme.colors.backgroundBrand : theme.colors.background),
    },

    innerContainer: {
        textAlign: 'left',
        padding: '64px 8px 16px',
    },

    feedbackData: {
        '& p:not(:first-child)': {
            marginTop: 16,
        },
        maxWidth: 496,
        overflowWrap: 'break-word',
    },
    feedbackDataAppear: {opacity: 0, transform: 'translate(0, 20px)'},
    feedbackDataAppearActive: {
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.8s',
        transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        transitionDelay: '0.6s',
        opacity: 1,
        transform: 'translate(0, 0)',
    },
}));

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
    appear: boolean,
    classes: any,
    colors: Colors
) => {
    const normalizedDescription =
        description && Array.isArray(description)
            ? description.map((paragraph, i) => <p key={i}>{paragraph}</p>)
            : description;
    return (
        <Stack space={24}>
            {icon}
            <Stack
                space={16}
                className={classnames(
                    classes.feedbackData,
                    animateText && classes.feedbackDataAppear,
                    animateText && appear && classes.feedbackDataAppearActive
                )}
            >
                <Text6 as="h1">{title}</Text6>
                {normalizedDescription && (
                    <Text4 light color={colors.textSecondary}>
                        {normalizedDescription}
                    </Text4>
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
    classes,
    imageUrl,
    dataAttributes,
}: {
    isInverse: boolean;
    inlineFeedbackBody: React.ReactNode;
    classes: any;
    imageUrl?: string;
    dataAttributes?: DataAttributes;
}) => (
    <Boxed isInverse={isInverse} dataAttributes={dataAttributes}>
        <div className={classes.desktopContainer}>
            <div className={classes.desktopContent}>
                <Box padding={64}>{inlineFeedbackBody}</Box>
            </div>
            {imageUrl && <div className={classes.desktopImage} />}
        </div>
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
    const {colors, platformOverrides} = useTheme();
    const windowHeight = useWindowHeight();
    const {isTabletOrSmaller} = useScreenSize();
    const [isServerSide, setIsServerSide] = React.useState(typeof self !== 'undefined');
    const [footerHeight, setFooterHeight] = React.useState(0);

    const contentHeightPx = `${windowHeight - footerHeight}px`;
    const hasButtons = checkHasButtons({primaryButton, secondaryButton, link});

    const classes = useStyles({
        isInverse,
        contentHeight: isServerSide ? '100vh' : contentHeightPx,
        footerHeight,
        animateText,
        primaryButton,
        imageUrl,
        imageFit,
        hasButtons,
    });

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
        appear,
        classes,
        colors
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
        <div className={classes.container}>
            <ResponsiveLayout>
                <div className={classes.innerContainer}>{feedbackBody}</div>
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
                    footerBgColor={isInverse ? colors.backgroundFeedbackBottom : undefined}
                    containerBgColor={isInverse ? colors.navigationBarBackground : undefined}
                    onChangeFooterHeight={setFooterHeight}
                >
                    {feedbackContent}
                </ButtonFixedFooterLayout>
            </div>
            <div className={classes.backgroundDiv} />
        </>
    ) : (
        <ResponsiveLayout>
            <Box paddingTop={64}>
                {renderFeedbackInDesktop({isInverse, inlineFeedbackBody, classes, imageUrl, dataAttributes})}
            </Box>
        </ResponsiveLayout>
    );
};

export const SuccessFeedbackScreen: React.FC<AssetFeedbackProps> = (props) => {
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
    ...otherProps
}) => {
    const {skinName, colors} = useTheme();
    const hasIcon = skinName !== VIVO_SKIN;
    return (
        <FeedbackScreen
            {...otherProps}
            hapticFeedback="error"
            icon={hasIcon ? <IcnError /> : undefined}
            animateText
        >
            {children}
            {errorReference && (
                <Text2 color={colors.textSecondary} regular>
                    {errorReference}
                </Text2>
            )}
        </FeedbackScreen>
    );
};

export const InfoFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const {skinName} = useTheme();
    const hasIcon = skinName !== VIVO_SKIN;
    return <FeedbackScreen {...props} icon={hasIcon ? <IcnInfo /> : undefined} />;
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
    const {skinName, platformOverrides, colors} = useTheme();
    const hasButtons = checkHasButtons({primaryButton, secondaryButton, link});

    const classes = useStyles({
        isInverse: true,
        animateText: true,
        primaryButton,
        imageUrl,
        imageFit,
        hasButtons,
    });

    const appear = useAppearStatus();

    const icon = skinName === VIVO_SKIN ? <IconSuccessVivo /> : <IcnSuccess />;
    const feedbackBody = renderFeedbackBody(
        {icon, title, description, children},
        areAnimationsSupported(platformOverrides),
        appear,
        classes,
        colors
    );
    const inlineFeedbackBody = renderInlineFeedbackBody(feedbackBody, {
        primaryButton,
        secondaryButton,
        link,
    });

    return (
        <ThemeVariant isInverse>
            {isTabletOrSmaller ? (
                <ResponsiveLayout className={classes.background}>
                    <OverscrollColor />
                    <Box paddingBottom={32}>
                        <div className={classes.innerContainer}>{inlineFeedbackBody}</div>
                    </Box>
                </ResponsiveLayout>
            ) : (
                renderFeedbackInDesktop({
                    isInverse: true,
                    inlineFeedbackBody,
                    classes,
                    imageUrl,
                    dataAttributes,
                })
            )}
        </ThemeVariant>
    );
};
