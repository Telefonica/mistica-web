'use client';
import * as React from 'react';
import Touchable, {BaseTouchable} from './touchable';
import classNames from 'classnames';
import {isWebViewBridgeAvailable} from '@tef-novum/webview-bridge';
import {useElementDimensions, useScreenSize, useTheme} from './hooks';
import {Text2, Text3} from './text';
import * as styles from './snackbar.css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {Portal} from './portal';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import * as tokens from './text-tokens';
import {showNativeSnackbar} from './snackbar-native';

import type {SnackbarType, CloseAction} from './snackbar-native';
import type {DataAttributes} from './utils/types';

export type SnackbarCloseHandler = (result: {action: CloseAction}) => unknown;

const DEFAULT_DURATION_WITHOUT_BUTTON = 5000;
const DEFAULT_DURATION_WITH_BUTTON = 10000;

export type Props = {
    buttonText?: string;
    buttonAccessibilityLabel?: string;
    closeButtonLabel?: string;
    duration?: 'PERSISTENT';
    message: string;
    onClose?: SnackbarCloseHandler;
    type?: SnackbarType;
    children?: void;
    dataAttributes?: DataAttributes;
    withDismiss?: boolean;
};

export type ImperativeHandle = {
    close: SnackbarCloseHandler;
};

const SnackbarComponent = React.forwardRef<ImperativeHandle, Props>(
    (
        {
            message,
            buttonText,
            buttonAccessibilityLabel,
            closeButtonLabel,
            duration,
            onClose,
            type,
            withDismiss = false,
            dataAttributes,
        },
        ref
    ) => {
        const {texts, t} = useTheme();
        const [isOpen, setIsOpen] = React.useState(false);
        const {width: buttonWidth, ref: buttonRef} = useElementDimensions();
        const {isDesktopOrBigger} = useScreenSize();
        const longButtonWidth = isDesktopOrBigger ? 160 : 128;
        const hasLongButton = buttonWidth > longButtonWidth;
        const elementRef = React.useRef<HTMLDivElement>(null);
        const shouldShowDismissButton = (duration === 'PERSISTENT' && !buttonText) || withDismiss;
        const defaultDuration = buttonText ? DEFAULT_DURATION_WITH_BUTTON : DEFAULT_DURATION_WITHOUT_BUTTON;

        const onCloseRef = React.useRef(onClose);
        React.useEffect(() => {
            onCloseRef.current = onClose;
        }, [onClose]);

        const close = React.useCallback<SnackbarCloseHandler>((result) => {
            setIsOpen(false);
            setTimeout(
                () => {
                    onCloseRef.current?.(result);
                },
                process.env.NODE_ENV === 'test' ? 0 : styles.TRANSITION_TIME_IN_MS
            );
        }, []);

        React.useImperativeHandle(ref, () => {
            return {...elementRef, close};
        }, [close]);

        React.useEffect(() => {
            const openTimeout = setTimeout(() => {
                setIsOpen(true);
            }, 50);

            const closeTimeout =
                duration !== 'PERSISTENT'
                    ? setTimeout(() => close({action: 'TIMEOUT'}), defaultDuration)
                    : undefined;

            return () => {
                clearTimeout(openTimeout);
                clearTimeout(closeTimeout);
            };
        }, [close, duration, defaultDuration]);

        return (
            <Portal className={styles.snackbarContainer}>
                <div
                    ref={elementRef}
                    className={classNames(styles.snackbar, {[styles.snackbarOpen]: isOpen})}
                >
                    <div
                        role="alert"
                        className={classNames(
                            styles.wrapper,
                            type === 'CRITICAL' ? styles.wrapperCritical : styles.wrapperInfo,
                            {[styles.wrapperOpen]: isOpen}
                        )}
                        {...getPrefixedDataAttributes(dataAttributes, 'SnackBar')}
                    >
                        <div
                            className={classNames(
                                hasLongButton ? styles.contentWithLongButton : styles.contentWithoutLongButton
                            )}
                            style={shouldShowDismissButton && !hasLongButton ? {paddingRight: 32} : undefined}
                        >
                            <div
                                style={
                                    shouldShowDismissButton && hasLongButton ? {paddingRight: 32} : undefined
                                }
                            >
                                <Text2 regular color={vars.colors.textPrimaryInverse}>
                                    {message}
                                </Text2>
                            </div>
                            {buttonText && (
                                <div
                                    className={classNames(styles.button, {
                                        [styles.longButton]: hasLongButton,
                                    })}
                                >
                                    <BaseTouchable
                                        className={styles.buttonTouchable}
                                        ref={buttonRef}
                                        onPress={() => {
                                            close({action: 'BUTTON'});
                                        }}
                                        aria-label={buttonAccessibilityLabel}
                                    >
                                        <Text3
                                            medium
                                            forceMobileSizes
                                            truncate
                                            color={
                                                type === 'CRITICAL'
                                                    ? vars.colors.textPrimaryInverse
                                                    : vars.colors.textLinkSnackbar
                                            }
                                        >
                                            {buttonText}
                                        </Text3>
                                    </BaseTouchable>
                                </div>
                            )}
                        </div>
                        {shouldShowDismissButton ? (
                            <Touchable
                                onPress={() => {
                                    close({action: 'DISMISS'});
                                }}
                                aria-label={
                                    closeButtonLabel || texts.closeButtonLabel || t(tokens.closeButtonLabel)
                                }
                                className={styles.dismissButton[hasLongButton ? 'topRight' : 'centered']}
                                style={{display: 'flex', width: 32, height: 32}}
                            >
                                <div className={styles.dismissIcon}>
                                    <IconCloseRegular color={vars.colors.inverse} size={20} />
                                </div>
                            </Touchable>
                        ) : null}
                    </div>
                </div>
            </Portal>
        );
    }
);

const Snackbar = React.forwardRef<ImperativeHandle & HTMLDivElement, Props>(
    (
        {
            message,
            buttonText,
            buttonAccessibilityLabel,
            closeButtonLabel,
            duration,
            onClose: onCloseProp = () => {},
            type = 'INFORMATIVE',
            withDismiss,
            dataAttributes,
        },
        ref
    ) => {
        const renderNative = isWebViewBridgeAvailable();
        const onCloseRef = React.useRef(onCloseProp);
        const isOpenRef = React.useRef(false);

        React.useEffect(() => {
            onCloseRef.current = onCloseProp;
        }, [onCloseProp]);

        React.useEffect(() => {
            /** the isOpenRef check is to avoid a double call to nativeMessage in development with StrictMode */
            if (renderNative && !isOpenRef.current) {
                isOpenRef.current = true;
                showNativeSnackbar({
                    message,
                    duration,
                    buttonText,
                    buttonAccessibilityLabel,
                    type,
                    withDismiss,
                })
                    .then(({action}) => {
                        onCloseRef.current({action});
                    })
                    .finally(() => {
                        isOpenRef.current = false;
                    });
            }
        }, [
            buttonAccessibilityLabel,
            closeButtonLabel,
            buttonText,
            duration,
            message,
            renderNative,
            type,
            withDismiss,
        ]);

        if (renderNative) {
            return null;
        }

        return (
            <SnackbarComponent
                ref={ref}
                message={message}
                duration={duration}
                buttonText={buttonText}
                buttonAccessibilityLabel={buttonAccessibilityLabel}
                closeButtonLabel={closeButtonLabel}
                type={type}
                onClose={onCloseRef.current}
                withDismiss={withDismiss}
                dataAttributes={dataAttributes}
            />
        );
    }
);

export default Snackbar;
