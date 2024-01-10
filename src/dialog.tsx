'use client';
import * as React from 'react';
import classnames from 'classnames';
import {ButtonPrimary, ButtonSecondary, ButtonDanger} from './button';
import {Portal} from './portal';
import FocusTrap from './focus-trap';
import IcnCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';
import {isWebViewBridgeAvailable, nativeConfirm, nativeAlert} from '@tef-novum/webview-bridge';
import ThemeContext from './theme-context';
import {useTheme} from './hooks';
import ButtonLayout from './button-layout';
import {Text5, Text4, Text3} from './text';
import {ESC} from './utils/keys';
import Box from './box';
import {isRunningAcceptanceTest} from './utils/platform';
import {useSetModalStateEffect} from './modal-context-provider';
import Stack from './stack';
import * as styles from './dialog.css';
import {vars} from './skins/skin-contract.css';

import type {Theme} from './theme';
import type {RendersNullableElement} from './utils/renders-element';
import type {ExclusifyUnion} from './utils/utility-types';
import type {ButtonLink} from './button';

const shouldAnimate = (platformOverrides: Theme['platformOverrides']) =>
    process.env.NODE_ENV !== 'test' && !isRunningAcceptanceTest(platformOverrides);

interface BaseDialogProps {
    className?: string;
    title?: string;
    icon?: React.ReactElement;
    message: string;
    acceptText?: string;
    onAccept?: () => void;
    destructive?: boolean;
}

export interface AlertProps extends BaseDialogProps {
    showClose?: boolean;
}

export interface ConfirmProps extends BaseDialogProps {
    showClose?: boolean;
    showCancel?: boolean;
    cancelText?: string;
    onCancel?: () => void;
}

export interface ExtendedDialogProps extends BaseDialogProps {
    subtitle?: string;
    extra?: React.ReactNode;
    forceWeb?: boolean;
    showClose?: boolean;
    showCancel?: boolean;
    cancelText?: string;
    onCancel?: () => void;
    link?: RendersNullableElement<typeof ButtonLink>;
}

export type DialogProps = ExclusifyUnion<AlertProps | ConfirmProps | ExtendedDialogProps>;

const Dialog: React.FC<DialogProps> = (props) => {
    const {texts} = useTheme();
    const {
        className,
        title,
        message,
        icon,
        extra,
        cancelText = texts.dialogCancelButton,
        acceptText = texts.dialogAcceptButton,
        onCancel: handleCancel,
        onAccept: handleAccept,
        showCancel = false,
        destructive = false,
    } = props;
    const isDialog = !!props.forceWeb;

    const mainButtonProps = {
        onPress: handleAccept ? handleAccept : () => {},
        dataAttributes: {testid: 'dialog-accept-button'},
        children: acceptText,
    };

    return (
        <div className={classnames(styles.variants[isDialog ? 'dialog' : 'default'], className)}>
            {icon && (
                <Box paddingBottom={24}>
                    <div className={styles.iconContainer}>
                        {React.cloneElement(icon, {
                            size: '100%',
                        })}
                    </div>
                </Box>
            )}
            {title && (
                <Box paddingBottom={16}>
                    {props.forceWeb ? (
                        <Text5 as="h2">{title}</Text5>
                    ) : (
                        <Text4 regular as="h2">
                            {title}
                        </Text4>
                    )}
                </Box>
            )}
            {props.subtitle && (
                <Box paddingBottom={16}>
                    <Text4 regular as="h2">
                        {props.subtitle}
                    </Text4>
                </Box>
            )}
            <div className={styles.dialogContent}>
                <Stack space={16}>
                    <Text3 color={vars.colors.textSecondary} regular>
                        {message}
                    </Text3>
                    {extra}
                </Stack>
            </div>

            <div className={styles.dialogActions}>
                <ButtonLayout link={props.forceWeb ? props.link : undefined}>
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
            </div>
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

type ModalDialogProps = DialogProps & {
    onCancel: () => void;
    onAccept: () => void;
    showCancel?: boolean;
    isClosing: boolean;
    onCloseTransitionEnd?: () => void;
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

type NativeModalDialogProps = ModalDialogProps & {
    dialogAcceptButton: string;
    dialogCancelButton: string;
};

const NativeModalDialog = (props: NativeModalDialogProps) => {
    useNativeDialog({
        renderNative: true,
        acceptText: props.acceptText || props.dialogAcceptButton,
        cancelText: props.cancelText || props.dialogCancelButton,
        showCancel: props.showCancel,
        message: props.message,
        title: props.title,
        onAccept: props.onAccept,
        onCancel: props.onCancel,
    });

    return null;
};

const ModalDialog = (props: ModalDialogProps) => {
    const {platformOverrides} = useTheme();
    const context = React.useContext(ThemeContext);

    // Closing the dialog before the animation has ended leaves the component in a broken state
    // To avoid race conditions, we don't allow closing the dialog until the animation has ended
    // See onAnimationEnd handler
    const canCloseRef = React.useRef(process.env.NODE_ENV === 'test');

    if (!context) {
        throw Error(
            `To use @telefonica/mistica components you must instantiate <ThemeContextProvider> as their parent.`
        );
    }
    const renderNative = !props.forceWeb && isWebViewBridgeAvailable();

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
            if (props.showClose) {
                handleClose();
                event.stopPropagation();
            }
        },
        [handleClose, props.showClose]
    );

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === ESC) {
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

    React.useEffect(() => {
        if (!shouldAnimate(platformOverrides)) {
            addKeyDownListener();
        }

        if (
            (renderNative || !shouldAnimate(platformOverrides)) &&
            props.isClosing &&
            props.onCloseTransitionEnd
        ) {
            props.onCloseTransitionEnd();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [addKeyDownListener, handleKeyDown, props, renderNative, platformOverrides]);

    useSetModalStateEffect();

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */
    return renderNative ? (
        <NativeModalDialog
            {...props}
            dialogAcceptButton={context.texts.dialogAcceptButton}
            dialogCancelButton={context.texts.dialogCancelButton}
        />
    ) : (
        <Portal>
            <div className={styles.wrapper}>
                <FocusTrap>
                    <div
                        onClick={handleOverlayPress}
                        className={classnames(styles.modalOpacityLayer, {
                            [styles.closedOpactityLayer]: isClosing,
                        })}
                        role="dialog"
                        data-component-name="Dialog"
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
                                className={classnames(styles.modalContent, {
                                    [styles.closedModalContent]: isClosing,
                                })}
                            >
                                {props.showClose && (
                                    <div className={styles.modalCloseButtonContainer}>
                                        <IconButton
                                            onPress={handleClose}
                                            aria-label={
                                                context.texts.modalClose ?? context.texts.closeButtonLabel
                                            }
                                        >
                                            <IcnCloseRegular color={vars.colors.neutralHigh} />
                                        </IconButton>
                                    </div>
                                )}
                                <Dialog {...dialogProps} onCancel={handleCancel} onAccept={handleAccept} />
                            </div>
                        </div>
                    </div>
                </FocusTrap>
            </div>
        </Portal>
    );
};

// let dialogInstance: DialogRoot | null = null;

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
    state: DialogRootState = {
        dialogProps: null,
        isClosing: false,
        instanceNumber: dialogRootInstances + 1,
    };

    componentDidMount(): void {
        dialogRootInstances++;
        if (dialogRootInstances === 1) {
            // dialogInstance = this;
            window.addEventListener('popstate', this.handleBack);
        }
    }

    componentWillUnmount(): void {
        dialogRootInstances--;
        if (dialogRootInstances === 0) {
            // dialogInstance = null;
            window.removeEventListener('popstate', this.handleBack);
        }
    }

    show(props: DialogProps): void {
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
            this.callback = null;
            this.setState({
                isClosing: true,
            });
        }
    };

    close(): void {
        // Here we have to remove the additional entry added to history when we created the Dialog
        window.history.back();
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

// const showDialog =
//     ({showCancel, showClose, forceWeb}: {showCancel: boolean; showClose: boolean; forceWeb: boolean}) =>
//     (props: DialogProps): void => {
//         if (!dialogInstance) {
//             throw Error(
//                 'Tried to show a dialog but the DialogRoot component was not mounted (mount <ThemeContextProvider>)'
//             );
//         }
//         dialogInstance.show({showCancel, showClose, forceWeb, ...props});
//     };

// /**
//  * Shows alert dialog with supplied props
//  */
// export const alert: (props: AlertProps) => void = showDialog({
//     showCancel: false,
//     forceWeb: false,
//     showClose: false,
// });

// /**
//  * Shows confirm dialog with supplied props
//  */
// export const confirm: (props: ConfirmProps) => void = showDialog({
//     showCancel: true,
//     forceWeb: false,
//     showClose: false,
// });

// /**
//  * Shows dialog with supplied props
//  */
// export const dialog: (props: ExtendedDialogProps) => void = showDialog({
//     showCancel: false,
//     forceWeb: true,
//     showClose: true,
// });
