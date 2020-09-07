import * as React from 'react';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import {getPlatform, isOldChrome, isRunningAcceptanceTest} from './utils/platform';
import {
    isWebViewBridgeAvailable,
    requestVibration as requestVibrationNative,
} from '@tef-novum/webview-bridge';

import type {Theme} from './theme';

const areAnimationsSupported = (platformOverrides: Theme['platformOverrides']) =>
    !isOldChrome(platformOverrides) && !isRunningAcceptanceTest(platformOverrides);

const animateText = (platformOverrides: Theme['platformOverrides']) => ({
    animateText,
}: {
    animateText: boolean;
}) =>
    animateText && areAnimationsSupported(platformOverrides)
        ? '$sweepIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s forwards'
        : 'initial';

const initialTextOpacity = (platformOverrides: Theme['platformOverrides']) => ({
    animateText,
}: {
    animateText: boolean;
}) => (animateText && areAnimationsSupported(platformOverrides) ? 0 : 1);

const useStyles = createUseStyles((theme) => ({
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

    container: {
        textAlign: 'left',
        padding: '64px 24px 16px',
    },

    iconContainer: {
        marginBottom: 24,
    },

    title: {
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimarySpecial : theme.colors.textPrimary),
        animation: animateText(theme.platformOverrides),
        lineHeight: 1.3333333,
        fontSize: 24,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? 0.36 : 'normal',
        fontWeight: 300,
        opacity: initialTextOpacity(theme.platformOverrides),
    },

    description: {
        marginTop: 16,
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimarySpecial : theme.colors.textSecondary),
        animation: animateText(theme.platformOverrides),
        fontSize: 18,
        fontWeight: 300,
        lineHeight: 1.3333333,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.45 : 'normal',
        opacity: initialTextOpacity(theme.platformOverrides),
        '& p': {
            marginTop: 0,
            marginBottom: 16,
        },
    },

    childrenContainer: {
        marginTop: 16,
        animation: animateText(theme.platformOverrides),
        opacity: initialTextOpacity(theme.platformOverrides),
    },

    [theme.mq.tabletOrBigger]: {
        container: {
            padding: '64px 16px 16px',
        },
        description: {
            maxWidth: 456,
        },
        title: {
            maxWidth: 344,
        },
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
    description?: string | ReadonlyArray<string>;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    hapticFeedback?: HapticFeedback;
    animateText?: boolean;
}

const Feedback: React.FC<FeedbackProps> = ({
    title,
    description,
    children,
    icon,
    hapticFeedback,
    animateText = false,
}) => {
    useHapticFeedback(hapticFeedback);
    const isInverse = useIsInverseVariant();
    const classes = useStyles({
        isInverse,
        animateText,
    });
    const normalizedDescription =
        description && Array.isArray(description)
            ? description.map((paragraph, i) => <p key={i}>{paragraph}</p>)
            : description;

    return (
        <div className={classes.container}>
            {!!icon && <div className={classes.iconContainer}>{icon}</div>}
            <span className={classes.title}>{title}</span>
            {normalizedDescription && <div className={classes.description}>{normalizedDescription}</div>}
            {children && <div className={classes.childrenContainer}>{children}</div>}
        </div>
    );
};

export default Feedback;
