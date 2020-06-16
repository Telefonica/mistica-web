// @flow
import * as React from 'react';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import classNames from 'classnames';
import {isWebViewBridgeAvailable, nativeMessage} from '@tef-novum/webview-bridge';

const TRANSITION_TIME_IN_MS = 300;
const SNACKBAR_MAX_WIDTH = 800;
const SNACKBAR_MIN_WIDTH = 360;
const SNACKBAR_MIN_HEIGHT = 48;

type SnackbarType = 'INFORMATIVE' | 'CRITICAL';

const useStyles = createUseStyles((theme) => ({
    snackbar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        transition: `visibility ${TRANSITION_TIME_IN_MS}ms ease-in-out`,
        visibility: ({isOpen}) => (isOpen ? 'visible' : 'hidden'),
    },
    snackbarOpen: {
        animation: `$snackbarAnimation ${TRANSITION_TIME_IN_MS}ms`,
    },
    '@keyframes snackbarAnimation': {
        '0%': {
            transform: 'translateY(100px)',
            opacity: 0,
        },
    },
    snackbarWrapper: {
        maxWidth: SNACKBAR_MAX_WIDTH,
        minWidth: SNACKBAR_MIN_WIDTH,
        minHeight: SNACKBAR_MIN_HEIGHT,
        padding: `16px 24px`,
        borderRadius: 4,
        position: 'fixed',
        bottom: 24,
        zIndex: 1000, // above anything

        backgroundColor: ({type}) =>
            type === 'CRITICAL' ? theme.colors.feedbackErrorBackground : theme.colors.feedbackInfoBackground,
        opacity: ({isOpen}) => (isOpen ? 1 : 0),
        transform: ({isOpen}) => (isOpen ? '' : 'translateY(100px)'),
        transition: `transform ${TRANSITION_TIME_IN_MS}ms ease-in-out, opacity ${TRANSITION_TIME_IN_MS}ms ease-in-out`,
    },
    snackbarContent: {
        fontSize: 14,
        lineHeight: 1.7,
        color: theme.colors.textPrimaryInverse,
    },
    snackbarButton: {
        float: 'right',
        marginLeft: 28,
        fontWeight: 500,
        lineHeight: 1.7,

        color: ({type}) =>
            type === 'INFORMATIVE' ? theme.colors.textLinkSnackbar : theme.colors.textPrimaryInverse,
    },
    [theme.mq.mobile]: {
        snackbarWrapper: {
            left: 8,
            right: 8,
            bottom: 8,
            minWidth: 0,
            borderRadius: 4,
        },
    },
}));

type Props = {
    buttonText?: string;
    duration?: number;
    message: string;
    onClose?: () => mixed;
    type?: SnackbarType;
};

const Snackbar = ({
    message,
    buttonText,
    duration = buttonText ? 10000 : 5000,
    onClose = () => {},
    type = 'INFORMATIVE',
}: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const classes = useStyles({type, isOpen});

    const close = React.useCallback(() => {
        setIsOpen(false);
        setTimeout(() => {
            onClose();
        }, TRANSITION_TIME_IN_MS);
    }, [onClose]);

    React.useEffect(() => {
        const openTimeout = setTimeout(() => {
            setIsOpen(true);
        }, 50);

        const closeTimeout = setTimeout(close, duration);

        return () => {
            clearTimeout(openTimeout);
            clearTimeout(closeTimeout);
        };
    }, [close, duration]);

    return (
        <div className={classes.snackbar} role="alert">
            <div className={classNames(classes.snackbarWrapper, {[classes.snackbarOpen]: isOpen})}>
                <div className={classes.snackbarContent}>
                    <span>{message}</span>
                    {buttonText && (
                        <Touchable className={classes.snackbarButton} onPress={close}>
                            {buttonText}
                        </Touchable>
                    )}
                </div>
            </div>
        </div>
    );
};

const SnackbarContainer = ({
    message,
    buttonText,
    duration = buttonText ? 10000 : 5000,
    onClose = () => {},
    type = 'INFORMATIVE',
}: Props): React.ReactNode => {
    const renderNative = isWebViewBridgeAvailable();

    React.useEffect(() => {
        if (renderNative) {
            nativeMessage({message, duration, buttonText, type}).then(onClose);
        }
    }, [buttonText, duration, message, onClose, renderNative, type]);

    if (renderNative) {
        return null;
    }

    return (
        <Snackbar
            message={message}
            duration={duration}
            buttonText={buttonText}
            type={type}
            onClose={onClose}
        />
    );
};

export default SnackbarContainer;
