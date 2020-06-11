// @flow
import * as React from 'react';
import classnames from 'classnames';
import {ButtonPrimary, ButtonSecondary, ButtonDanger} from './button';
import {createUseStyles} from './jss';
import Portal from './portal';
import FocusTrap from './focus-trap';
import IcnClose from './icons/icn-close';
import IconButton from './icon-button';
import {isWebViewBridgeAvailable, nativeConfirm, nativeAlert} from '@tef-novum/webview-bridge';
import ThemeContext from './theme-context';
import {useTheme, useScreenSize} from './hooks';
import ButtonLayout from './button-layout';
import Text from './text';
import {ESC} from './utils/key-codes';
import Box from './box';
import {isOldChrome} from './utils/platform';

const animationsSupported = () => !isOldChrome() && !process.env.NOVE_ENV === 'test';

const useStylesModalDialog = createUseStyles((theme) => ({
    wrapper: {
        position: 'relative',
        zIndex: 11,
    },
    modalOpacityLayer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 11,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
        minWidth: 0,
        background: theme.colors.backgroundOpacity,
        animation: '$fadeIn .2s ease-in-out',
        transition: 'opacity .2s ease-in-out',

        '&.closed': {
            opacity: 0,
        },
    },

    '@keyframes fadeIn': {
        '0%': {opacity: 0},
        '100%': {opacity: 1},
    },

    modalCloseButtonContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 24,
    },
    modalContent: {
        background: theme.colors.background,
        borderRadius: 4,
        animation: '$fadeScale .2s ease-in-out',
        willChange: 'transform, opacity',
        transition: 'opacity .2s ease-in-out, transform .2s ease-in-out',

        '&.closed': {
            opacity: 0,
            transform: 'scale(.8)',
        },
    },
    [theme.mq.mobile]: {
        modalCloseButtonContainer: {
            padding: 16,
        },
    },
    '@keyframes fadeScale': {
        '0%': {
            opacity: 0,
            transform: 'scale(.8)',
        },
        '100%': {
            opacity: 1,
            transform: 'scale(1)',
        },
    },
}));

const useDialogStyles = createUseStyles((theme) => ({
    dialogContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 680,
        padding: 40,
        minHeight: 192,
        maxHeight: 'calc(100vh - 64px)',
    },

    dialogContent: {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
    },

    [theme.mq.mobile]: {
        dialogContainer: {
            minHeight: 298,
            width: 'calc(100vw - 48px)',
            margin: 'auto',
            padding: '48px 24px 24px',
        },
    },
}));

type DialogProps = {
    className?: string,
    title?: string,
    icon?: React.Element<any>,
    message: string,
    cancelText?: string,
    acceptText?: string,
    onCancel?: () => void,
    onAccept?: () => void,
    showCancel?: boolean,
    destructive?: boolean,
};

const Dialog = (props: DialogProps) => {
    const {texts, colors} = useTheme();
    const {
        className,
        title,
        message,
        icon,
        cancelText = texts.dialogCancelButton,
        acceptText = texts.dialogAcceptButton,
        onCancel: handleCancel,
        onAccept: handleAccept,
        showCancel = false,
        destructive = false,
    } = props;
    const {isMobile} = useScreenSize();
    const withSecondaryButton = showCancel && !!handleCancel;
    const classes = useDialogStyles({withSecondaryButton});

    const mainButtonProps = {
        onPress: handleAccept ? handleAccept : () => {},
        'data-testid': 'dialog-accept-button',
        children: acceptText,
    };

    return (
        <div className={classnames(classes.dialogContainer, className)}>
            {icon && <Box paddingBottom={24}>{icon}</Box>}
            {title && (
                <Box paddingBottom={16}>
                    <Text
                        as="h2"
                        size={isMobile ? 20 : 24}
                        lineHeight={isMobile ? '24px' : '32px'}
                        weight="light"
                    >
                        {title}
                    </Text>
                </Box>
            )}
            <div className={classes.dialogContent}>
                <Text size={isMobile ? 16 : 18} lineHeight="24px" color={colors.textSecondary} weight="light">
                    {message}
                </Text>
            </div>
            <Box paddingTop={isMobile ? 24 : 32}>
                <ButtonLayout>
                    {destructive ? (
                        <ButtonDanger tabIndex={1} {...mainButtonProps} /> // eslint-disable-line jsx-a11y/tabindex-no-positive
                    ) : (
                        <ButtonPrimary tabIndex={1} {...mainButtonProps} /> // eslint-disable-line jsx-a11y/tabindex-no-positive
                    )}
                    {showCancel && handleCancel && (
                        <ButtonSecondary
                            tabIndex={2} // eslint-disable-line jsx-a11y/tabindex-no-positive
                            onPress={handleCancel}
                            data-testid="dialog-cancel-button"
                        >
                            {cancelText}
                        </ButtonSecondary>
                    )}
                </ButtonLayout>
            </Box>
        </div>
    );
};

type HandlerFunction = (KeyboardEvent | SyntheticMouseEvent<> | void) => void;

const showNativeDialog = ({showCancel, message, title, acceptText, cancelText, onAccept, onCancel}) =>
    showCancel
        ? nativeConfirm({message, title, cancelText, acceptText}).then((accepted) =>
              accepted ? onAccept() : onCancel()
          )
        : nativeAlert({message, title, buttonText: acceptText}).then(onAccept);

type ModalDialogProps = {
    ...DialogProps,
    onCancel: HandlerFunction,
    onAccept: HandlerFunction,
    showCancel?: boolean,
    isClosing: boolean,
    onCloseTransitionEnd?: () => void,
};

const useNativeDialog = ({
    renderNative,
    onAccept,
    onCancel,
    acceptText,
    cancelText,
    showCancel,
    message,
    title,
}) => {
    const onAcceptRef = React.useRef(onAccept).current;
    const onCancelRef = React.useRef(onCancel).current;
    React.useEffect(() => {
        if (renderNative) {
            showNativeDialog({
                acceptText,
                cancelText,
                showCancel,
                message,
                title,
                onAccept: onAcceptRef,
                onCancel: onCancelRef,
            });
        }
    }, [onAcceptRef, onCancelRef, acceptText, cancelText, showCancel, message, title, renderNative]);
};

const ModalDialog = (props: ModalDialogProps) => {
    const context = React.useContext(ThemeContext);
    const classes = useStylesModalDialog();
    if (!context) {
        throw Error(
            `To use @telefonica/mistica components you must instantiate <ThemeContextProvider> as their parent.`
        );
    }

    const renderNative = isWebViewBridgeAvailable();
    const closeHandler = props.showCancel ? props.onCancel : props.onAccept;
    const stopPropagation = (ev: SyntheticEvent<>) => {
        ev.stopPropagation();
    };
    const handleClose = React.useCallback(
        (ev: KeyboardEvent | SyntheticMouseEvent<>) => {
            if (!props.isClosing) {
                closeHandler(ev);
            }

            ev.stopPropagation();
        },
        [closeHandler, props.isClosing]
    );
    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.keyCode === ESC) {
                handleClose(event);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        [handleClose]
    );
    const addKeyDownListener = React.useCallback(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useNativeDialog({
        renderNative,
        acceptText: props.acceptText || context.texts.dialogAcceptButton,
        cancelText: props.cancelText || context.texts.dialogCancelButton,
        showCancel: props.showCancel,
        message: props.message,
        title: props.title,
        onAccept: props.onAccept,
        onCancel: props.onCancel,
    });

    React.useEffect(() => {
        if (!animationsSupported()) {
            addKeyDownListener();
        }

        if ((renderNative || !animationsSupported()) && props.isClosing && props.onCloseTransitionEnd) {
            props.onCloseTransitionEnd();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [addKeyDownListener, handleKeyDown, props, renderNative]);

    const {isClosing, onCloseTransitionEnd, ...dialogProps} = props;
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */
    return renderNative ? null : (
        <Portal>
            <div className={classes.wrapper}>
                <FocusTrap>
                    <div
                        onClick={handleClose}
                        className={classnames(classes.modalOpacityLayer, {closed: isClosing})}
                        role="dialog"
                    >
                        <div onClick={stopPropagation}>
                            <div
                                onTransitionEnd={
                                    isClosing && onCloseTransitionEnd ? onCloseTransitionEnd : undefined
                                }
                                onAnimationEnd={addKeyDownListener}
                                className={classnames(classes.modalContent, {closed: isClosing})}
                            >
                                <div className={classes.modalCloseButtonContainer}>
                                    <IconButton onPress={handleClose} label={context.texts.modalClose}>
                                        <IcnClose color={context.colors.iconPrimary} />
                                    </IconButton>
                                </div>
                                <Dialog {...dialogProps} />
                            </div>
                        </div>
                    </div>
                </FocusTrap>
            </div>
        </Portal>
    );
};

// eslint-disable-next-line no-use-before-define
let dialogInstance: ?DialogRoot = null;

type DialogRootProps = {children?: React.Node};

type DialogRootState = {
    dialogProps: DialogProps | null,
    isClosing: boolean,
};

export default class DialogRoot extends React.Component<DialogRootProps, DialogRootState> {
    state: DialogRootState = {
        dialogProps: null,
        isClosing: false,
    };

    componentDidMount() {
        dialogInstance = this;
        window.addEventListener('popstate', this.handleBack);
    }

    componentWillUnmount() {
        if (dialogInstance === this) {
            dialogInstance = null;
        }
        window.removeEventListener('popstate', this.handleBack);
    }

    show(props: DialogProps) {
        if (this.state.dialogProps) {
            throw Error(
                'Tried to show a dialog on top of another dialog. This functionality is not currently supported.'
            );
        }
        // We add an additional entry to history with the same page, so the first time back is pressed we only close the Dialog
        window.history.pushState(null, document.title, window.location.href);
        this.setState({
            dialogProps: props,
            isClosing: false,
        });
    }

    callback: null | (() => void) = null;

    handleCloseFinished: () => void = () => {
        this.setState({
            dialogProps: null,
            isClosing: false,
        });
    };

    handleBack: () => void = () => {
        /* Here we call the actual action handler, when we are sure the history back needed to close
        the dialog is already performed, so we don't accidentally remove a handler navigation's event from the history */
        if (this.state.dialogProps) {
            this.callback?.();
            this.setState({
                isClosing: true,
            });
        }
    };

    close() {
        // Here we have to remove the additional entry added to history when we created the Dialog
        window.history.back();
    }

    createCancelHandler(onCancel?: () => void): HandlerFunction {
        return (...args: Array<mixed>) => {
            if (onCancel) {
                this.callback = () => onCancel(...args);
            }
            this.close();
        };
    }

    createAcceptHandler(onAccept?: () => void): HandlerFunction {
        return (...args: Array<mixed>) => {
            if (onAccept) {
                this.callback = () => onAccept(...args);
            }
            this.close();
        };
    }

    render(): React.Node {
        const {isClosing, dialogProps} = this.state;

        if (!dialogProps) {
            return this.props.children || null;
        }

        const {onCancel, onAccept, ...rest} = dialogProps;
        return (
            <>
                {this.props.children}
                <ModalDialog
                    onCancel={this.createCancelHandler(onCancel)}
                    onAccept={this.createAcceptHandler(onAccept)}
                    isClosing={isClosing}
                    onCloseTransitionEnd={isClosing ? this.handleCloseFinished : undefined}
                    {...rest}
                />
            </>
        );
    }
}

const showDialog = (showCancel = false) => (props: DialogProps): void => {
    if (!dialogInstance) {
        throw Error(
            'Tried to show a dialog but the DialogRoot component was not mounted (mount <ThemeContextProvider>)'
        );
    }
    dialogInstance.show({showCancel, ...props});
};

/**
 * Shows alert dialog with supplied props
 */
export const alert: (props: DialogProps) => void = showDialog(false);

/**
 * Shows confirm dialog with supplied props
 */
export const confirm: (props: DialogProps) => void = showDialog(true);
