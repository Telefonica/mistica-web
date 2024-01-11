'use client';
// https://www.figma.com/file/8TXIyWTJ8plJ06i1qwv97k/%F0%9F%94%B8-Modals-Specs?type=design&node-id=0-21&mode=design&t=kUetunERuhUMfYm2-0
import * as React from 'react';
import classnames from 'classnames';
import {ButtonPrimary, ButtonSecondary, ButtonDanger} from './button';
import {Portal} from './portal';
import FocusTrap from './focus-trap';
import IcnCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';
import {isWebViewBridgeAvailable, nativeConfirm, nativeAlert} from '@tef-novum/webview-bridge';
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

import type {ButtonLink} from './button';
import type {Theme} from './theme';
import type {RendersNullableElement} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';

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

export type AlertProps = BaseDialogProps;

export interface ConfirmProps extends BaseDialogProps {
    cancelText?: string;
    onCancel?: () => void;
}

export interface ExtendedDialogProps extends BaseDialogProps {
    subtitle?: string;
    extra?: React.ReactNode;
    cancelText?: string;
    onCancel?: () => void;
    link?: RendersNullableElement<typeof ButtonLink>;
}

export type DialogProps = ExclusifyUnion<AlertProps | ConfirmProps | ExtendedDialogProps> & {
    type: 'dialog' | 'alert' | 'confirm';
};

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
        destructive = false,
    } = props;
    const isDialog = props.type === 'dialog';

    const mainButtonProps = {
        onPress: handleAccept || (() => {}),
        dataAttributes: {testid: 'dialog-accept-button'},
        children: acceptText,
    };

    return (
        <div className={classnames(styles.variants[isDialog ? 'dialog' : 'default'], className)}>
            {icon && (
                <Box paddingBottom={24}>
                    <div className={styles.iconContainer}>{React.cloneElement(icon, {size: '100%'})}</div>
                </Box>
            )}
            {title && (
                <Box paddingBottom={16}>
                    {isDialog ? (
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
                <ButtonLayout link={isDialog ? props.link : undefined}>
                    {destructive ? (
                        <ButtonDanger tabIndex={1} {...mainButtonProps} /> // eslint-disable-line jsx-a11y/tabindex-no-positive
                    ) : (
                        <ButtonPrimary tabIndex={1} {...mainButtonProps} /> // eslint-disable-line jsx-a11y/tabindex-no-positive
                    )}
                    {isDialog && !!handleCancel && (
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
    type,
    message,
    title,
    acceptText,
    cancelText,
    onAccept,
    onCancel,
}: {
    type: string;
    message: string;
    title?: string;
    acceptText: string;
    cancelText: string;
    onAccept?: () => void;
    onCancel?: () => void;
}) =>
    type === 'confirm'
        ? nativeConfirm({message, title, cancelText, acceptText}).then((accepted) =>
              accepted ? onAccept?.() : onCancel?.()
          )
        : nativeAlert({message, title, buttonText: acceptText}).then(onAccept);

type ModalDialogProps = DialogProps & {
    onClose: () => void;
};

const NativeModalDialog = ({
    type,
    onAccept,
    onCancel,
    acceptText,
    cancelText,
    message,
    title,
}: ModalDialogProps): JSX.Element => {
    const {texts} = useTheme();
    const paramsRef = React.useRef({
        type,
        onAccept,
        onCancel,
        acceptText: acceptText || texts.dialogAcceptButton,
        cancelText: cancelText || texts.dialogCancelButton,
        message,
        title,
    });

    React.useEffect(() => {
        showNativeDialog(paramsRef.current);
    }, []);

    return <></>;
};

const ModalDialog = (props: ModalDialogProps): JSX.Element => {
    useSetModalStateEffect();
    const dialogContentRef = React.useRef<HTMLDivElement>(null);
    const {platformOverrides, texts} = useTheme();
    /** this flag is used to disable user interactions while the component is animating */
    const isInteractiveRef = React.useRef(false);
    /** this flag is used to avoid calling close() multiple times when the transitions ends (the CSS could define transitions for multiple styles) */
    const isClosedRef = React.useRef(false);
    const [isClosing, setIsClosing] = React.useState(false);

    // // Closing the dialog before the animation has ended leaves the component in a broken state
    // // To avoid race conditions, we don't allow closing the dialog until the animation has ended
    // // See onAnimationEnd handler
    // const canCloseRef = React.useRef(process.env.NODE_ENV === 'test');
    // const hasNavigatedBack = React.useRef(false);

    const renderNative = props.type !== 'dialog' && isWebViewBridgeAvailable();
    const canDismiss = props.type === 'dialog';

    const {onAccept, onCancel, onClose, ...dialogProps} = props;

    // const handleBackNavigation = React.useCallback(() => {
    //     /* Here we call the actual action handler, when we are sure the history back needed to close
    //     the dialog is already performed, so we don't accidentally remove a handler navigation's event from the history */
    //     // this.callback?.();
    //     // this.callback = null;
    //     setIsClosing(true);
    //     hasNavigatedBack.current = true;
    // }, []);

    // React.useEffect(() => {
    //     window.history.pushState(null, document.title, window.location.href);

    //     window.addEventListener('popstate', handleBackNavigation);
    //     return () => {
    //         window.removeEventListener('popstate', handleBackNavigation);
    //         if (!hasNavigatedBack.current) {
    //             window.history.back();
    //         }
    //     };
    // }, [handleBackNavigation]);

    const resultIsAcceptRef = React.useRef<boolean>(false);

    const close = React.useCallback(() => {
        if (isInteractiveRef.current) {
            isInteractiveRef.current = false;
            setIsClosing(true);
        }
    }, []);

    const handleAccept = React.useCallback(() => {
        resultIsAcceptRef.current = true;
        close();
    }, [close]);

    const handleCancel = React.useCallback(() => {
        resultIsAcceptRef.current = false;
        close();
    }, [close]);

    const handleOverlayPress = React.useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            if (canDismiss) {
                handleCancel();
            }
        },
        [canDismiss, handleCancel]
    );

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === ESC) {
                event.stopPropagation();
                event.preventDefault();
                if (props.type === 'alert') {
                    handleAccept();
                } else {
                    handleCancel();
                }
            }
        },
        [handleCancel, handleAccept, props.type]
    );

    React.useEffect(() => {
        if (!renderNative) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, renderNative]);

    if (renderNative) {
        return <NativeModalDialog {...props} />;
    }

    return (
        <Portal className={styles.wrapper}>
            <FocusTrap>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                    onClick={handleOverlayPress}
                    className={classnames(styles.modalOpacityLayer, {
                        [styles.closedOpactityLayer]: isClosing,
                    })}
                    data-component-name="Dialog"
                >
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    <div role="dialog" onClick={(e) => e.stopPropagation()}>
                        <div
                            ref={dialogContentRef}
                            onAnimationEnd={(e) => {
                                if (e.target === dialogContentRef.current) {
                                    console.log('>>> animation end', e);
                                    isInteractiveRef.current = true;
                                }
                            }}
                            onTransitionEnd={(e) => {
                                if (e.target === dialogContentRef.current) {
                                    if (isClosing && !isClosedRef.current) {
                                        console.log('>>> transition end', e);
                                        isClosedRef.current = true;
                                        if (resultIsAcceptRef.current) {
                                            onAccept?.();
                                        } else {
                                            onCancel?.();
                                        }
                                        onClose();
                                    }
                                }
                            }}
                            className={classnames(styles.modalContent, {
                                [styles.closedModalContent]: isClosing,
                            })}
                        >
                            {canDismiss && (
                                <div className={styles.modalCloseButtonContainer}>
                                    <IconButton
                                        // onPress={handleClose}
                                        aria-label={texts.modalClose || texts.closeButtonLabel}
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
        </Portal>
    );
};

// let dialogInstance: DialogRoot | null = null;

// This counts the number of instantiated DialogRoots.
// We only want to use the first instance, created by the initial ThemeContextProvider.
// Our app could have multiple React trees for example, webapp rendering global-checkout
// let dialogRootInstances = 0;

// type DialogRootProps = {children?: React.ReactNode};

// type DialogRootState = {
//     dialogProps: DialogProps | null;
//     isClosing: boolean;
//     instanceNumber: number;
// };

// class DialogRoot extends React.Component<DialogRootProps, DialogRootState> {
//     state: DialogRootState = {
//         dialogProps: null,
//         isClosing: false,
// instanceNumber: dialogRootInstances + 1,
// };

// componentDidMount(): void {
//     dialogRootInstances++;
//     if (dialogRootInstances === 1) {
//         // dialogInstance = this;
//         window.addEventListener('popstate', this.handleBack);
//     }
// }

// componentWillUnmount(): void {
//     dialogRootInstances--;
//     if (dialogRootInstances === 0) {
//         // dialogInstance = null;
//         window.removeEventListener('popstate', this.handleBack);
//     }
// }

// show(props: DialogProps): void {
//     if (this.state.dialogProps) {
//         throw Error(
//             'Tried to show a dialog on top of another dialog. This functionality is not currently supported.'
//         );
//     }
//     // We add an additional entry to history with the same page, so the first time back is pressed we only close the Dialog
//     window.history.pushState(null, document.title, window.location.href);
//     this.setState({
//         dialogProps: props,
//         isClosing: false,
//     });
// }

// callback: null | (() => void) = null;

// handleCloseFinished: () => void = () => {
//     this.setState({
//         dialogProps: null,
//         isClosing: false,
//     });
// };

// handleBack: () => void = () => {
//     /* Here we call the actual action handler, when we are sure the history back needed to close
//     the dialog is already performed, so we don't accidentally remove a handler navigation's event from the history */
//     if (this.state.dialogProps) {
//         this.callback?.();
//         this.callback = null;
//         this.setState({
//             isClosing: true,
//         });
//     }
// };

// close(): void {
//     // Here we have to remove the additional entry added to history when we created the Dialog
//     window.history.back();
// }

// createCancelHandler(onCancel?: () => void) {
//     return (): void => {
//         if (onCancel) {
//             this.callback = () => onCancel();
//         }
//         this.close();
//     };
// }

// createAcceptHandler(onAccept?: () => void) {
//     return (): void => {
//         if (onAccept) {
//             this.callback = () => onAccept();
//         }
//         this.close();
//     };
// }

// render(): React.ReactNode {
//     const {isClosing, dialogProps} = this.state;

//     let dialog = null;
//     if (dialogProps && this.state.instanceNumber === 1) {
//         const {onCancel, onAccept, ...rest} = dialogProps;
//         dialog = (
//             <ModalDialog
//                 onCancel={this.createCancelHandler(onCancel)}
//                 onAccept={this.createAcceptHandler(onAccept)}
//                 isClosing={isClosing}
//                 onCloseTransitionEnd={isClosing ? this.handleCloseFinished : undefined}
//                 {...rest}
//             />
//         );
//     }

//     return (
//         <>
//             {this.props.children}
//             {dialog}
//         </>
//     );
// }
// }

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

export default ModalDialog;
