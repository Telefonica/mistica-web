// @flow
import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme} from './hooks';
import {useIsInverseVariant} from './theme-variant-context';
import IcnError from './icons/icn-error';
import IcnSuccess from './icons/icn-success';
import IcnInfo from './icons/icn-info';
import {VIVO_SKIN} from './colors';
import {getPlatform, isOldChrome, isRunningAcceptanceTest} from './utils/platform';
import {
    isWebViewBridgeAvailable,
    requestVibration as requestVibrationNative,
} from '@tef-novum/webview-bridge';

const animationsSupported = !isOldChrome() && !isRunningAcceptanceTest();
const animateText = ({isInfo}) =>
    !isInfo && animationsSupported
        ? '$sweepIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s forwards'
        : undefined;
const initialTextOpacity = ({isInfo}) => (!isInfo && animationsSupported ? 0 : 1);

const requestVibration = (type) => {
    if (isWebViewBridgeAvailable()) {
        requestVibrationNative(type).catch(() => {});
    }
};

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
        animation: animateText,
        lineHeight: 1.3333333,
        fontSize: 24,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? 0.36 : undefined,
        fontWeight: 300,
        opacity: initialTextOpacity,
    },

    description: {
        marginTop: 16,
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimarySpecial : theme.colors.textSecondary),
        animation: animateText,
        fontSize: 18,
        fontWeight: 300,
        lineHeight: 1.3333333,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.45 : undefined,
        opacity: initialTextOpacity,
        '& p': {
            marginBottom: 16,
        },
    },

    childrenContainer: {
        marginTop: 16,
        animation: animateText,
        opacity: initialTextOpacity,
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

const FEEDBACK_SUCCESS: 'success' = 'success';
const FEEDBACK_ERROR: 'error' = 'error';
const FEEDBACK_INFO: 'info' = 'info';

type FeedbackType = typeof FEEDBACK_SUCCESS | typeof FEEDBACK_ERROR | typeof FEEDBACK_INFO;

const feedbackToIconComponent = {
    [FEEDBACK_SUCCESS]: IcnSuccess,
    [FEEDBACK_ERROR]: IcnError,
    [FEEDBACK_INFO]: IcnInfo,
};

const useHapticFeedback = (type) => {
    React.useEffect(() => {
        let timeoutId;
        if (type === FEEDBACK_SUCCESS) {
            timeoutId = setTimeout(() => requestVibration('success'), 700);
        }

        if (type === FEEDBACK_ERROR) {
            timeoutId = setTimeout(() => requestVibration('error'), 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [type]);
};

type FeedbackProps = {
    title: string,
    description?: string | $ReadOnlyArray<string>,
    type: FeedbackType,
    children?: React.Node,
};

const Feedback = (props: FeedbackProps): React.Element<'div'> => {
    const theme = useTheme();
    const {title, description, type, children} = props;
    useHapticFeedback();
    const isInverse = useIsInverseVariant();
    const hasNotIcon = theme.skin === VIVO_SKIN && type !== FEEDBACK_SUCCESS;
    const hasIcon = !hasNotIcon;
    const classes = useStyles({
        isInverse,
        isInfo: type === FEEDBACK_INFO,
    });
    const normalizedDescription =
        description && Array.isArray(description)
            ? description.map((paragraph, i) => <p key={i}>{paragraph}</p>)
            : description;

    const Icon = feedbackToIconComponent[type];

    return (
        <div className={classes.container}>
            {hasIcon && (
                <div className={classes.iconContainer}>
                    <Icon />
                </div>
            )}
            <span className={classes.title}>{title}</span>
            {normalizedDescription && <div className={classes.description}>{normalizedDescription}</div>}
            {children && <div className={classes.childrenContainer}>{children}</div>}
        </div>
    );
};

export default Feedback;
