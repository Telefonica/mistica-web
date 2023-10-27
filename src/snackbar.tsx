import * as React from 'react';
import {BaseTouchable} from './touchable';
import classNames from 'classnames';
import {isWebViewBridgeAvailable, nativeMessage} from '@tef-novum/webview-bridge';
import {useElementDimensions, useScreenSize, useTheme} from './hooks';
import {Text2, Text3} from './text';
import * as styles from './snackbar.css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {Portal} from './portal';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';

import type {DataAttributes} from './utils/types';

type SnackbarType = 'INFORMATIVE' | 'CRITICAL';
type SnackbarCloseHandler = (result: {action: 'DISMISS' | 'TIMEOUT' | 'BUTTON' | 'CONSECUTIVE'}) => unknown;

const DEFAULT_DURATION_WITHOUT_BUTTON = 5000;
const DEFAULT_DURATION_WITH_BUTTON = 10000;

type Props = {
    buttonText?: string;
    duration?: number;
    message: string;
    onClose?: SnackbarCloseHandler;
    type?: SnackbarType;
    children?: void;
    dataAttributes?: DataAttributes;
    withDismiss?: boolean;
};

const SnackbarComponent: React.FC<Props> = ({
    message,
    buttonText,
    duration,
    onClose,
    type,
    withDismiss = false,
    dataAttributes,
}) => {
    const {texts} = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);
    const {width: buttonWidth, ref: buttonRef} = useElementDimensions();
    const {isDesktopOrBigger} = useScreenSize();
    const longButtonWidth = isDesktopOrBigger ? 160 : 128;
    const hasLongButton = buttonWidth > longButtonWidth;

    const shouldShowDismissButton = (duration === Infinity && !buttonText) || withDismiss;

    const close = React.useCallback<SnackbarCloseHandler>(
        (result) => {
            setIsOpen(false);
            setTimeout(() => {
                onClose(result);
            }, styles.TRANSITION_TIME_IN_MS);
        },
        [onClose]
    );

    React.useEffect(() => {
        const openTimeout = setTimeout(() => {
            setIsOpen(true);
        }, 50);

        const closeTimeout = setTimeout(() => {
            close({action: 'TIMEOUT'});
        }, duration);

        return () => {
            clearTimeout(openTimeout);
            clearTimeout(closeTimeout);
        };
    }, [close, duration]);

    return (
        <Portal>
            <div className={classNames(styles.snackbar, {[styles.snackbarOpen]: isOpen})}>
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
                            styles.content,
                            sprinkles({
                                flexDirection: hasLongButton ? 'column' : 'row',
                                alignItems: hasLongButton ? undefined : 'center',
                            })
                        )}
                        style={shouldShowDismissButton && !hasLongButton ? {paddingRight: 32} : undefined}
                    >
                        <div
                            style={shouldShowDismissButton && hasLongButton ? {paddingRight: 32} : undefined}
                        >
                            <Text2 regular color={vars.colors.textPrimaryInverse}>
                                {message}
                            </Text2>
                        </div>
                        {buttonText && (
                            <div className={classNames(styles.button, {[styles.longButton]: hasLongButton})}>
                                <BaseTouchable
                                    className={sprinkles({
                                        paddingY: 4,
                                        paddingX: 8,
                                        border: 'none',
                                        padding: 0,
                                        background: 'transparent',
                                    })}
                                    ref={buttonRef}
                                    onPress={() => {
                                        close({action: 'BUTTON'});
                                    }}
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
                        <IconButton
                            size={32}
                            onPress={() => {
                                close({action: 'DISMISS'});
                            }}
                            aria-label={texts.closeButtonLabel}
                            className={styles.dismissButton[hasLongButton ? 'topRight' : 'centered']}
                            style={{display: 'flex'}}
                        >
                            <div className={styles.dismissIcon}>
                                <IconCloseRegular color={vars.colors.inverse} size={20} />
                            </div>
                        </IconButton>
                    ) : null}
                </div>
            </div>
        </Portal>
    );
};

const Snackbar: React.FC<Props> = ({
    message,
    buttonText,
    duration,
    onClose: onCloseProp = () => {},
    type = 'INFORMATIVE',
    withDismiss,
}) => {
    const defaultDuration = buttonText ? DEFAULT_DURATION_WITH_BUTTON : DEFAULT_DURATION_WITHOUT_BUTTON;
    duration = Math.max(duration ?? defaultDuration, defaultDuration);
    const renderNative = isWebViewBridgeAvailable();
    const onCloseRef = React.useRef(onCloseProp);

    React.useEffect(() => {
        onCloseRef.current = onCloseProp;
    }, [onCloseProp]);

    React.useEffect(() => {
        if (renderNative) {
            // these are the duration values understood by native app, other values will be ignored

            nativeMessage({
                message,
                // @ts-expect-error duration can be 'PERSISTENT' in new webview-bridge lib versions, and old apps will ignore it
                duration: duration === Infinity ? 'PERSISTENT' : undefined,
                buttonText,
                type,
                ...{withDismiss},
            }).then((result: unknown) => {
                // there are terser ways to do this checks, but this one satisfies TS
                if (
                    !result ||
                    typeof result !== 'object' ||
                    !('action' in result) ||
                    typeof result.action !== 'string' ||
                    (result.action !== 'DISMISS' && result.action !== 'TIMEOUT' && result.action !== 'BUTTON')
                ) {
                    onCloseRef.current({action: 'DISMISS'});
                } else {
                    onCloseRef.current({action: result.action});
                }
            });
        }
    }, [buttonText, duration, message, renderNative, type, withDismiss]);

    if (renderNative) {
        return null;
    }

    return (
        <SnackbarComponent
            message={message}
            duration={duration}
            buttonText={buttonText}
            type={type}
            onClose={onCloseRef.current}
            withDismiss={withDismiss}
        />
    );
};

export default Snackbar;
