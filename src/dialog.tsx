'use client';
// https://www.figma.com/file/8TXIyWTJ8plJ06i1qwv97k/%F0%9F%94%B8-Modals-Specs?type=design&node-id=0-21&mode=design&t=kUetunERuhUMfYm2-0
import * as React from 'react';
import classnames from 'classnames';
import {ButtonPrimary, ButtonSecondary, ButtonDanger} from './button';
import {Portal} from './portal';
import FocusTrap from './focus-trap';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {InternalIconButton} from './icon-button';
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
import type {RendersNullableElement} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';

const shouldAnimate = () => process.env.NODE_ENV !== 'test' && !isRunningAcceptanceTest();

interface BaseDialogProps {
    className?: string;
    title?: string;
    message: string;
    acceptText?: string;
    onAccept?: () => void;
    destructive?: boolean;
    /** @deprecated this does nothing */
    forceWeb?: boolean;
    /** @deprecated this does nothing */
    showCancel?: boolean;
}

export type AlertProps = BaseDialogProps;

export interface ConfirmProps extends BaseDialogProps {
    cancelText?: string;
    onCancel?: () => void;
}

export interface ExtendedDialogProps extends BaseDialogProps {
    icon?: React.ReactElement;
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
    const showCancelButton = props.type === 'confirm' || (isDialog && !!handleCancel);

    const acceptButtonProps = {
        onPress: handleAccept || (() => {}),
        children: acceptText,
        // @deprecated - testid should be removed but many webapp tests depend on this
        dataAttributes: {testid: 'dialog-accept-button'},
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
                        <ButtonDanger
                            tabIndex={1} // eslint-disable-line jsx-a11y/tabindex-no-positive
                            {...acceptButtonProps}
                        />
                    ) : (
                        <ButtonPrimary tabIndex={1} {...acceptButtonProps} /> // eslint-disable-line jsx-a11y/tabindex-no-positive
                    )}
                    {showCancelButton && (
                        <ButtonSecondary
                            tabIndex={2} // eslint-disable-line jsx-a11y/tabindex-no-positive
                            onPress={handleCancel || (() => {})}
                            // @deprecated - testid should be removed but many webapp tests depend on this
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
    onDestroy,
}: {
    type: string;
    message: string;
    title?: string;
    acceptText: string;
    cancelText: string;
    onAccept?: () => void;
    onCancel?: () => void;
    onDestroy: () => void;
}) =>
    type === 'confirm'
        ? nativeConfirm({message, title, cancelText, acceptText}).then((accepted) => {
              if (accepted) {
                  onAccept?.();
              } else {
                  onCancel?.();
              }
              onDestroy();
          })
        : nativeAlert({message, title, buttonText: acceptText}).then(() => {
              onAccept?.();
              onDestroy();
          });

type ModalDialogProps = DialogProps & {
    onDestroy: () => void;
};

const NativeModalDialog = ({
    type,
    onAccept,
    onCancel,
    onDestroy,
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
        onDestroy,
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
    const {texts} = useTheme();
    const [isClosing, setIsClosing] = React.useState<boolean>(false);
    /** this ref has the same value as the isClosing state but we want it to be immediately accessible to avoid possible race conditions */
    const isClosingRef = React.useRef<boolean>(false);
    /** this flag is used to avoid calling close() multiple times when the transitions ends (the CSS could define transitions for multiple styles) */
    const isClosedRef = React.useRef<boolean>(false);
    /** this flag is used to disable user interactions while the component is animating */
    const [isReady, setIsReady] = React.useState<boolean>(false);
    const dialogWasAcceptedRef = React.useRef<boolean>(false);
    const animationDurationRef = React.useRef<number>(shouldAnimate() ? styles.ANIMATION_DURATION_MS : 0);

    const shouldRenderNative = props.type !== 'dialog' && isWebViewBridgeAvailable();
    const shouldDismissOnPressOverlay = props.type === 'dialog';
    const shouldAcceptOnDismiss = props.type === 'alert';

    const {onAccept, onCancel, onDestroy, ...dialogProps} = props;

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isClosingRef.current) {
                setIsReady(true);
            }
        }, animationDurationRef.current);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const close = React.useCallback(() => {
        if (!isClosedRef.current) {
            isClosedRef.current = true;
            if (dialogWasAcceptedRef.current) {
                onAccept?.();
            } else {
                onCancel?.();
            }
            onDestroy();
        }
    }, [onAccept, onCancel, onDestroy]);

    const startClosing = React.useCallback(() => {
        let timeout: NodeJS.Timeout;
        if (!isClosingRef.current && isReady) {
            isClosingRef.current = true;
            setIsReady(false);
            setIsClosing(true);
            timeout = setTimeout(close, animationDurationRef.current);
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [close, isReady]);

    const handleAccept = React.useCallback(() => {
        dialogWasAcceptedRef.current = true;
        startClosing();
    }, [startClosing]);

    const handleCancel = React.useCallback(() => {
        dialogWasAcceptedRef.current = false;
        startClosing();
    }, [startClosing]);

    const dismiss = React.useCallback(() => {
        if (isClosingRef.current) {
            return;
        }
        if (shouldAcceptOnDismiss) {
            handleAccept();
        } else {
            handleCancel();
        }
    }, [handleAccept, handleCancel, shouldAcceptOnDismiss]);

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === ESC) {
                event.stopPropagation();
                event.preventDefault();
                dismiss();
            }
        },
        [dismiss]
    );

    React.useEffect(() => {
        if (shouldRenderNative) {
            return;
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, shouldRenderNative]);

    React.useEffect(() => {
        if (shouldRenderNative) {
            return;
        }
        // Consider any page navigation as a dismiss
        window.addEventListener('popstate', dismiss);
        return () => {
            window.removeEventListener('popstate', dismiss);
        };
    }, [dismiss, shouldRenderNative]);

    const handleOverlayPress = React.useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            if (shouldDismissOnPressOverlay) {
                handleCancel();
            }
        },
        [shouldDismissOnPressOverlay, handleCancel]
    );

    if (shouldRenderNative) {
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
                    data-testid="dialog-overlay"
                    aria-hidden={isClosing || !isReady}
                >
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    <div role="dialog" onClick={(e) => e.stopPropagation()} data-component-name="Dialog">
                        <div
                            ref={dialogContentRef}
                            onAnimationEnd={(e) => {
                                if (e.target === dialogContentRef.current) {
                                    if (!isClosingRef.current) {
                                        setIsReady(true);
                                    }
                                }
                            }}
                            onTransitionEnd={(e) => {
                                if (e.target === dialogContentRef.current) {
                                    if (isClosingRef.current) {
                                        close();
                                    }
                                }
                            }}
                            className={classnames(styles.modalContent, {
                                [styles.closedModalContent]: isClosing,
                            })}
                        >
                            {shouldDismissOnPressOverlay && (
                                <div className={styles.modalCloseButtonContainer}>
                                    <InternalIconButton
                                        onPress={dismiss}
                                        aria-label={texts.modalClose || texts.closeButtonLabel}
                                        bleedLeft
                                        bleedRight
                                        bleedY
                                        Icon={IconCloseRegular}
                                    />
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

export default ModalDialog;
