import * as React from 'react';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import classNames from 'classnames';
import {isWebViewBridgeAvailable, nativeMessage} from '@tef-novum/webview-bridge';
import {useElementSize} from './hooks';

import type {HTMLTouchableElement} from './touchable';

const PADDING_Y = 14;
const PADDING_X = 16;
const TRANSITION_TIME_IN_MS = 300;
const SNACKBAR_MAX_WIDTH = 800;
const SNACKBAR_MIN_WIDTH = 360;
const SNACKBAR_MIN_HEIGHT = 48;
const LONG_BUTTON_WIDTH = 128;

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
        padding: `${PADDING_Y}px ${PADDING_X}px`,
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
        lineHeight: `20px`,
        color: theme.colors.textPrimaryInverse,
        display: 'flex',
        flexDirection: ({isLongButton}) => (isLongButton ? 'column' : 'row'),
        justifyContent: 'space-between',
        alignItems: ({isLongButton}) => (isLongButton ? 'unset' : 'center'),
    },
    snackbarButton: {
        marginTop: ({isLongButton}) => (isLongButton ? 18 : -6),
        marginLeft: ({isLongButton}) => (isLongButton ? 0 : 28),
        marginBottom: -6,
        marginRight: -8,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: `24px`,
        padding: '4px 8px',
        whiteSpace: 'nowrap',
        width: 'auto',
        alignSelf: ({isLongButton}) => (isLongButton ? 'flex-end' : 'unset'),
        color: ({type}) =>
            type === 'INFORMATIVE' ? theme.colors.textLinkSnackbar : theme.colors.textPrimaryInverse,
    },
    [theme.mq.mobile]: {
        snackbarWrapper: {
            left: 8,
            right: 8,
            bottom: 8,
            minWidth: 0,
        },
    },
}));

type Props = {
    buttonText?: string;
    duration?: number;
    message: string;
    onClose?: () => unknown;
    type?: SnackbarType;
};

const SnackbarComponent: React.FC<Props> = ({
    message,
    buttonText,
    duration = buttonText ? 10000 : 5000,
    onClose = () => {},
    type = 'INFORMATIVE',
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLTouchableElement | null>(null);
    const {width: buttonWidth} = useElementSize(buttonRef);
    const classes = useStyles({type, isOpen, isLongButton: buttonWidth >= LONG_BUTTON_WIDTH});
    console.log(buttonWidth, buttonRef.current);
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
        <div className={classes.snackbar}>
            <div
                role="alert"
                className={classNames(classes.snackbarWrapper, {[classes.snackbarOpen]: isOpen})}
            >
                <div className={classes.snackbarContent}>
                    <span>{message}</span>
                    {buttonText && (
                        <Touchable elementRef={buttonRef} className={classes.snackbarButton} onPress={close}>
                            {buttonText}
                        </Touchable>
                    )}
                </div>
            </div>
        </div>
    );
};

const Snackbar: React.FC<Props> = ({
    message,
    buttonText,
    duration = buttonText ? 10000 : 5000,
    onClose = () => {},
    type = 'INFORMATIVE',
}) => {
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
        <SnackbarComponent
            message={message}
            duration={duration}
            buttonText={buttonText}
            type={type}
            onClose={onClose}
        />
    );
};

export default Snackbar;
