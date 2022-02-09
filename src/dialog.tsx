import * as React from 'react';
import classnames from 'classnames';
import {ButtonPrimary, ButtonSecondary, ButtonDanger} from './button';
import {createUseStyles} from './jss';
import {Portal} from './portal';
import FocusTrap from './focus-trap';
import IcnCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';
import {isWebViewBridgeAvailable, nativeConfirm, nativeAlert} from '@tef-novum/webview-bridge';
import ThemeContext from './theme-context';
import {useTheme, useScreenSize} from './hooks';
import ButtonLayout from './button-layout';
import {Text5, Text3} from './text';
import {ESC} from './utils/key-codes';
import Box from './box';
import {isOldChrome, isRunningAcceptanceTest} from './utils/platform';
import {useSetModalState} from './modal-context-provider';

import type {Theme} from './theme';

const animationsSupported = (platformOverrides: Theme['platformOverrides']) =>
    !isOldChrome(platformOverrides) &&
    process.env.NODE_ENV !== 'test' &&
    !isRunningAcceptanceTest(platformOverrides);

/** Must be higher than the fixed footer's z-index */
const Z_INDEX = 26;

const useStylesModalDialog = createUseStyles((theme) => ({
    wrapper: {
        position: 'relative',
        zIndex: Z_INDEX,
    },
    modalOpacityLayer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: Z_INDEX,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
        minWidth: 0,
        background: theme.colors.backgroundOverlay,
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
    [theme.mq.tabletOrSmaller]: {
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

    [theme.mq.tabletOrSmaller]: {
        dialogContainer: {
            minHeight: 298,
            width: 'calc(100vw - 48px)',
            margin: 'auto',
            padding: '48px 24px 24px',
        },
    },
}));

interface DialogProps {
    className?: string;
    title?: string;
    icon?: React.ReactElement;
    message: string;
    cancelText?: string;
    acceptText?: string;
    onCancel?: () => void;
    onAccept?: () => void;
    showCancel?: boolean;
    destructive?: boolean;
}

const Dialog: React.FC<DialogProps> = (props) => {
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
    const {isTabletOrSmaller} = useScreenSize();
    const withSecondaryButton = showCancel && !!handleCancel;
    const classes = useDialogStyles({withSecondaryButton});

    const mainButtonProps = {
        onPress: handleAccept ? handleAccept : () => {},
        dataAttributes: {testid: 'dialog-accept-button'},
        children: acceptText,
    };

    return (
        <div className={classnames(classes.dialogContainer, className)}>
            {icon && <Box paddingBottom={24}>{icon}</Box>}
            {title && (
                <Box paddingBottom={16}>
                    <Text5 as="h2">{title}</Text5>
                </Box>
            )}
            <div className={classes.dialogContent}>
                <Text3 color={colors.textSecondary} light>
                    {message}
                </Text3>
            </div>
            <Box paddingTop={isTabletOrSmaller ? 24 : 32}>
                <ButtonLayout>
                    {destructive ? (
                        <ButtonDanger tabIndex={1} {...mainButtonProps} /> // eslint-disable-line jsx-a11y/tabindex-no-positive
                    ) : (
                        <ButtonPrimary tabIndex={1} {...mainButtonProps} /> // eslint-disable-line jsx-a11y/tabindex-no-positive
                    )}
                    {showCancel && !!handleCancel && (
                        <ButtonSecondary
                            tabIndex={2} // eslint-disable-line jsx-a11y/tabindex-no-positive
                            onPress={handleCancel}
                            dataAttributes={{testid: 'dialog-cancel-button'}}
                        >
                            {cancelText}
                        </ButtonSecondary>
                    )}
                </ButtonLayout>
            </Box>
        </div>
    );
};

const showNativeDialog = ({
    showCancel,
    message,
    title,
    acceptText,
    cancelText,
    onAccept,
    onCancel,
}: {
    showCancel?: boolean;
    message: string;
    title?: string;
    acceptText: string;
    cancelText: string;
    onAccept?: () => void;
    onCancel?: () => void;
}) =>
    showCancel
        ? nativeConfirm({message, title, cancelText, acceptText}).then((accepted) =>
              accepted ? onAccept?.() : onCancel?.()
          )
        : nativeAlert({message, title, buttonText: acceptText}).then(onAccept);

interface ModalDialogProps extends DialogProps {
    onCancel: () => void;
    onAccept: () => void;
    showCancel?: boolean;
    isClosing: boolean;
    onCloseTransitionEnd?: () => void;
}

const useNativeDialog = ({
    renderNative,
    onAccept,
    onCancel,
    acceptText,
    cancelText,
    showCancel,
    message,
    title,
}: {
    renderNative: boolean;
    showCancel?: boolean;
    message: string;
    title?: string;
    acceptText: string;
    cancelText: string;
    onAccept: () => void;
    onCancel: () => void;
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
    const {platformOverrides} = useTheme();
    const context = React.useContext(ThemeContext);
    const classes = useStylesModalDialog();

    // Closing the dialog before the animation has ended leaves the component in a broken state
    // To avoid race conditions, we don't allow closing the dialog until the animation has ended
    // See onAnimationEnd handler
    const canCloseRef = React.useRef(process.env.NODE_ENV === 'test');

    if (!context) {
        throw Error(
            `To use @telefonica/mistica components you must instantiate <ThemeContextProvider> as their parent.`
        );
    }
    const renderNative = isWebViewBridgeAvailable();

    const {onAccept, isClosing, onCancel, onCloseTransitionEnd, ...dialogProps} = props;

    const handleAccept = React.useCallback(() => {
        if (!isClosing && canCloseRef.current) {
            onAccept();
        }
    }, [isClosing, onAccept]);

    const handleCancel = React.useCallback(() => {
        if (!isClosing && canCloseRef.current) {
            onCancel();
        }
    }, [isClosing, onCancel]);

    const handleClose = props.showCancel ? handleCancel : handleAccept;

    const handleOverlayPress = React.useCallback(
        (event: React.SyntheticEvent<any> | Event) => {
            handleClose();
            event.stopPropagation();
        },
        [handleClose]
    );

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.keyCode === ESC) {
                handleClose();
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
        if (!animationsSupported(platformOverrides)) {
            addKeyDownListener();
        }

        if (
            (renderNative || !animationsSupported(platformOverrides)) &&
            props.isClosing &&
            props.onCloseTransitionEnd
        ) {
            props.onCloseTransitionEnd();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [addKeyDownListener, handleKeyDown, props, renderNative, platformOverrides]);

    const setModalState = useSetModalState();
    React.useEffect(() => {
        setModalState({isModalOpen: true});
        return () => {
            setModalState({isModalOpen: false});
        };
    }, [setModalState]);

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */
    return renderNative ? null : (
        <Portal>
            <div className={classes.wrapper}>
                <FocusTrap>
                    <div
                        onClick={handleOverlayPress}
                        className={classnames(classes.modalOpacityLayer, {closed: isClosing})}
                        role="dialog"
                    >
                        <div onClick={(e) => e.stopPropagation()}>
                            <div
                                onTransitionEnd={
                                    isClosing && onCloseTransitionEnd ? onCloseTransitionEnd : undefined
                                }
                                onAnimationEnd={() => {
                                    canCloseRef.current = true;
                                    addKeyDownListener();
                                }}
                                className={classnames(classes.modalContent, {closed: isClosing})}
                            >
                                <div className={classes.modalCloseButtonContainer}>
                                    <IconButton
                                        onPress={handleClose}
                                        aria-label={
                                            context.texts.modalClose ?? context.texts.closeButtonLabel
                                        }
                                    >
                                        <IcnCloseRegular color={context.colors.neutralHigh} />
                                    </IconButton>
                                </div>
                                <Dialog {...dialogProps} onCancel={handleCancel} onAccept={handleAccept} />
                            </div>
                        </div>
                    </div>
                </FocusTrap>
            </div>
        </Portal>
    );
};

let dialogInstance: DialogRoot | null = null;

// This counts the number of instantiated DialogRoots.
// We only want to use the first instance, created by the initial ThemeContextProvider.
// Our app could have multiple React trees for example, webapp rendering global-checkout
let dialogRootInstances = 0;

type DialogRootProps = {children?: React.ReactNode};

type DialogRootState = {
    dialogProps: DialogProps | null;
    isClosing: boolean;
    instanceNumber: number;
};

export default class DialogRoot extends React.Component<DialogRootProps, DialogRootState> {
    static contextType = ThemeContext;

    state: DialogRootState = {
        dialogProps: null,
        isClosing: false,
        instanceNumber: dialogRootInstances + 1,
    };

    componentDidMount(): void {
        dialogRootInstances++;
        if (dialogRootInstances === 1) {
            dialogInstance = this;
            window.addEventListener('popstate', this.handleBack);
        }
    }

    componentWillUnmount(): void {
        dialogRootInstances--;
        if (dialogRootInstances === 0) {
            dialogInstance = null;
            window.removeEventListener('popstate', this.handleBack);
        }
    }

    show(props: DialogProps): void {
        if (this.state.dialogProps) {
            throw Error(
                'Tried to show a dialog on top of another dialog. This functionality is not currently supported.'
            );
        }
        if (!this.context.unstable_disableHistoryUpdateInDialogs) {
            // We add an additional entry to history with the same page, so the first time back is pressed we only close the Dialog
            window.history.pushState(null, document.title, window.location.href);
        }
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
            this.callback = null;
            this.setState({
                isClosing: true,
            });
        }
    };

    close(): void {
        if (!this.context.unstable_disableHistoryUpdateInDialogs) {
            // Here we have to remove the additional entry added to history when we created the Dialog
            window.history.back();
        }
    }

    createCancelHandler(onCancel?: () => void) {
        return (): void => {
            if (onCancel) {
                this.callback = () => onCancel();
            }
            this.close();
        };
    }

    createAcceptHandler(onAccept?: () => void) {
        return (): void => {
            if (onAccept) {
                this.callback = () => onAccept();
            }
            this.close();
        };
    }

    render(): React.ReactNode {
        const {isClosing, dialogProps} = this.state;

        let dialog = null;
        if (dialogProps && this.state.instanceNumber === 1) {
            const {onCancel, onAccept, ...rest} = dialogProps;
            dialog = (
                <ModalDialog
                    onCancel={this.createCancelHandler(onCancel)}
                    onAccept={this.createAcceptHandler(onAccept)}
                    isClosing={isClosing}
                    onCloseTransitionEnd={isClosing ? this.handleCloseFinished : undefined}
                    {...rest}
                />
            );
        }

        return (
            <>
                {this.props.children}
                {dialog}
            </>
        );
    }
}

const showDialog =
    (showCancel = false) =>
    (props: DialogProps): void => {
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
