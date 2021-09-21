import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme, useScreenSize, useWindowHeight, useIsomorphicLayoutEffect} from './hooks';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import ButtonFixedFooterLayout from './button-fixed-footer-layout';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from './button';
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
import {Text6, Text4} from './text';
import Box from './box';
import {Boxed} from './boxed';
import ResponsiveLayout from './responsive-layout';
import Stack from './stack';
import Inline from './inline';

import type {ButtonProps, ButtonLinkProps} from './button';
import type {DataAttributes} from './utils/types';

const areAnimationsSupported = (platformOverrides: Theme['platformOverrides']) =>
    !isOldChrome(platformOverrides) && !isRunningAcceptanceTest(platformOverrides);

const animateText =
    (platformOverrides: Theme['platformOverrides']) =>
    ({animateText}: {animateText: boolean}) =>
        animateText && areAnimationsSupported(platformOverrides)
            ? '$sweepIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s forwards'
            : 'initial';

const initialTextOpacity =
    (platformOverrides: Theme['platformOverrides']) =>
    ({animateText}: {animateText: boolean}) =>
        animateText && areAnimationsSupported(platformOverrides) ? 0 : 1;

const useStyles = createUseStyles((theme) => ({
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
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
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
        [theme.mq.tabletOrSmaller]: {
            // This extra height is a workaround to make sure the background div is displayed *under* the fixed footer.
            // Otherwise in some devices (Galaxy S20+) the background and the fixed footer are rendered with some distance between them
            height: ({contentHeight}) => `calc(${contentHeight} + 1px)`,
        },
        background: ({isInverse}) => (isInverse ? theme.colors.backgroundBrand : theme.colors.background),
    },

    '@keyframes sweepIn': {
        '0%': {
            opacity: 0,
            transform: 'translate(0, 20px)',
        },
        '100%': {
            opacity: 1,
            transform: 'translate(0, 0)',
        },
    },

    innerContainer: {
        textAlign: 'left',
        padding: '64px 8px 16px',
        [theme.mq.desktopOrBigger]: {
            padding: '64px 0 32px',
        },
    },

    feedbackItems: {
        animation: animateText(theme.platformOverrides),
        opacity: initialTextOpacity(theme.platformOverrides),
        '& p:not(:first-child)': {
            marginTop: 16,
        },
        maxWidth: 496,
        overflowWrap: 'break-word',
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

interface FeedbackProps {
    title: string;
    primaryButton?: React.ReactElement<ButtonProps, typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<ButtonProps, typeof ButtonSecondary>;
    link?: React.ReactElement<ButtonLinkProps, typeof ButtonLink>;
    description?: string | Array<string>;
    children?: React.ReactNode;
    unstable_inlineInDesktop?: boolean;
    dataAttributes?: DataAttributes;
}

interface AssetFeedbackProps extends FeedbackProps {
    imageUrl?: string;
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
    dataAttributes,
}) => {
    useHapticFeedback(hapticFeedback);
    const isInverse = useIsInverseVariant();
    const {colors} = useTheme();
    const windowHeight = useWindowHeight();
    const {isTabletOrSmaller} = useScreenSize();
    const [isServerSide, setIsServerSide] = React.useState(typeof self !== 'undefined');
    const [footerHeight, setFooterHeight] = React.useState(0);

    const contentHeightPx = `${windowHeight - footerHeight}px`;
    const classes = useStyles({
        isInverse,
        contentHeight: isServerSide ? '100vh' : contentHeightPx,
        footerHeight,
        animateText,
        primaryButton,
        imageUrl,
    });

    // This trick along with the 100vh measure allows us to perform a first meaningful render on the server side.
    // We can't use vh on client side because it causes problems with iOS (as sometimes the height is calculated as
    // if there were no OS buttons on bottom): https://bugs.webkit.org/show_bug.cgi?id=141832
    useIsomorphicLayoutEffect(() => {
        setIsServerSide(false);
    }, []);

    const normalizedDescription =
        description && Array.isArray(description)
            ? description.map((paragraph, i) => <p key={i}>{paragraph}</p>)
            : description;

    const feedbackBody = (
        <Stack space={24}>
            {icon}
            <Stack space={16} className={classes.feedbackItems}>
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

    const hasButtons = !!primaryButton || !!secondaryButton;

    const inlineFeedbackBody = (
        <Stack space={24}>
            {feedbackBody}
            {hasButtons && (
                <Inline space={16} alignItems="center">
                    {primaryButton}
                    {secondaryButton}
                    {link}
                </Inline>
            )}
        </Stack>
    );

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
                {hasButtons ? (
                    <ButtonFixedFooterLayout
                        button={primaryButton}
                        secondaryButton={secondaryButton}
                        link={link}
                        footerBgColor={isInverse ? colors.backgroundFeedbackBottom : undefined}
                        containerBgColor={isInverse ? colors.navigationBarBackground : undefined}
                        onChangeFooterHeight={setFooterHeight}
                    >
                        {feedbackContent}
                    </ButtonFixedFooterLayout>
                ) : (
                    feedbackContent
                )}
            </div>
            {hasButtons && <div className={classes.backgroundDiv} />}
        </>
    ) : (
        <ResponsiveLayout>
            <Boxed isInverse={isInverse} dataAttributes={dataAttributes}>
                <div className={classes.desktopContainer}>
                    <div className={classes.desktopContent}>
                        <Box padding={64}>{inlineFeedbackBody}</Box>
                    </div>
                    {imageUrl && <div className={classes.desktopImage} />}
                </div>
            </Boxed>
        </ResponsiveLayout>
    );
};

export const SuccessFeedbackScreen: React.FC<AssetFeedbackProps> = (props) => {
    const {skinName} = useTheme();

    return (
        <ThemeVariant isInverse={!props.unstable_inlineInDesktop}>
            <FeedbackScreen
                {...props}
                hapticFeedback="success"
                icon={skinName === VIVO_SKIN ? <IconSuccessVivo /> : <IcnSuccess />}
                animateText
                imageUrl={props.imageUrl}
            />
        </ThemeVariant>
    );
};
export const ErrorFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const {skinName} = useTheme();
    const hasIcon = skinName !== VIVO_SKIN;
    return (
        <FeedbackScreen
            {...props}
            hapticFeedback="error"
            icon={hasIcon ? <IcnError /> : undefined}
            animateText
        />
    );
};
export const InfoFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const {skinName} = useTheme();
    const hasIcon = skinName !== VIVO_SKIN;
    return <FeedbackScreen {...props} icon={hasIcon ? <IcnInfo /> : undefined} />;
};
