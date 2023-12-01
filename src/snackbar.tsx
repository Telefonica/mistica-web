'use client';
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

const CLOSE_ACTIONS = ['DISMISS', 'TIMEOUT', 'CONSECUTIVE', 'BUTTON'] as const;

type SnackbarType = 'INFORMATIVE' | 'CRITICAL';
type CloseAction = (typeof CLOSE_ACTIONS)[number];
type SnackbarCloseHandler = (result: {action: CloseAction}) => unknown;

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

type ImperativeHandle = {
    close: SnackbarCloseHandler;
};

const SnackbarComponent = React.forwardRef<ImperativeHandle, Props>(
    ({message, buttonText, duration, onClose, type, withDismiss = false, dataAttributes}, ref) => {
        const {texts} = useTheme();
        const [isOpen, setIsOpen] = React.useState(false);
        const {width: buttonWidth, ref: buttonRef} = useElementDimensions();
        const {isDesktopOrBigger} = useScreenSize();
        const longButtonWidth = isDesktopOrBigger ? 160 : 128;
        const hasLongButton = buttonWidth > longButtonWidth;
        const elementRef = React.useRef<HTMLDivElement>(null);

        const shouldShowDismissButton = (duration === Infinity && !buttonText) || withDismiss;

        const close = React.useCallback<SnackbarCloseHandler>(
            (result) => {
                setIsOpen(false);
                setTimeout(
                    () => {
                        onClose?.(result);
                    },
                    process.env.NODE_ENV === 'test' ? 0 : styles.TRANSITION_TIME_IN_MS
                );
            },
            [onClose]
        );

        React.useImperativeHandle(ref, () => {
            return {
                ...elementRef,
                close: ({action}) => {
                    close({action});
                },
            };
        });

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
                                styles.content,
                                sprinkles({
                                    flexDirection: hasLongButton ? 'column' : 'row',
                                    alignItems: hasLongButton ? undefined : 'center',
                                })
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
    }
);

const Snackbar = React.forwardRef<ImperativeHandle & HTMLDivElement, Props>(
    (
        {message, buttonText, duration, onClose: onCloseProp = () => {}, type = 'INFORMATIVE', withDismiss},
        ref
    ) => {
        const defaultDuration = buttonText ? DEFAULT_DURATION_WITH_BUTTON : DEFAULT_DURATION_WITHOUT_BUTTON;
        duration = Math.max(duration ?? defaultDuration, defaultDuration);
        const renderNative = isWebViewBridgeAvailable();
        const onCloseRef = React.useRef(onCloseProp);

        React.useEffect(() => {
            onCloseRef.current = onCloseProp;
        }, [onCloseProp]);

        React.useEffect(() => {
            if (renderNative) {
                nativeMessage({
                    message,
                    // @ts-expect-error duration can be 'PERSISTENT' in new webview-bridge lib versions, and old apps will ignore it
                    duration: duration === Infinity ? 'PERSISTENT' : undefined,
                    buttonText,
                    type,
                    ...{withDismiss},
                }).then((unknownResult: unknown) => {
                    const result = unknownResult as {action?: CloseAction} | undefined;
                    if (result?.action && CLOSE_ACTIONS.includes(result.action)) {
                        onCloseRef.current({action: result.action});
                    } else {
                        onCloseRef.current({action: 'DISMISS'});
                    }
                });
            }
        }, [buttonText, duration, message, renderNative, type, withDismiss]);

        if (renderNative) {
            return null;
        }

        return (
            <SnackbarComponent
                ref={ref}
                message={message}
                duration={duration}
                buttonText={buttonText}
                type={type}
                onClose={onCloseRef.current}
                withDismiss={withDismiss}
            />
        );
    }
);

export default Snackbar;

type SnackbarEntry = Props & {
    id: string;
};

const SnackbarContext = React.createContext<{
    snackbars: Array<SnackbarEntry>;
    setSnackbars: React.Dispatch<React.SetStateAction<Array<SnackbarEntry>>>;
}>({
    snackbars: [],
    setSnackbars: () => {},
});

export const SnackbarRoot = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [snackbars, setSnackbars] = React.useState<Array<SnackbarEntry>>([]);
    const snackbarRef = React.useRef<ImperativeHandle & HTMLDivElement>(null);
    const isClosingRef = React.useRef(false);
    const renderNative = isWebViewBridgeAvailable();

    React.useEffect(() => {
        // multiple snackbars, close the current one
        if (snackbars.length > 1 && !isClosingRef.current) {
            isClosingRef.current = true;
            if (renderNative) {
                // the native side will automatically close the current snackbar when opening a new one
                setSnackbars((snackbars) => snackbars.slice(1));
            } else {
                snackbarRef.current?.close({action: 'CONSECUTIVE'});
            }
        }
    }, [snackbars, renderNative]);

    const handleClose: SnackbarCloseHandler = ({action}) => {
        isClosingRef.current = false;
        if (renderNative && action === 'CONSECUTIVE') {
            // rebuild the array to force a re-render to process the next item in queue
            setSnackbars((snackbars) => snackbars.slice(0));
        } else {
            setSnackbars((snackbars) => snackbars.slice(1));
        }
        snackbars[0].onClose?.({action});
    };

    const value = React.useMemo(() => {
        return {
            snackbars,
            setSnackbars,
        };
    }, [snackbars]);

    const currentSnackbar = snackbars[0];

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            {!!currentSnackbar && (
                <Snackbar
                    // remount when the snackbar changes. In native, this will make a new bridge call
                    key={currentSnackbar.id}
                    ref={snackbarRef}
                    message={currentSnackbar.message}
                    buttonText={currentSnackbar.buttonText}
                    duration={currentSnackbar.duration}
                    type={currentSnackbar.type}
                    withDismiss={currentSnackbar.withDismiss}
                    onClose={handleClose}
                />
            )}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = (): {
    openSnackbar: (params: Props) => void;
    snackbars: ReadonlyArray<Readonly<SnackbarEntry>>;
} => {
    const {snackbars, setSnackbars} = React.useContext(SnackbarContext);

    const openSnackbar = React.useCallback(
        (params: Props) => {
            const uniqueIdentifier = Date.now() + '-' + Math.random();
            setSnackbars((snackbars) => [...snackbars, {...params, id: uniqueIdentifier}]);
        },
        [setSnackbars]
    );

    return {
        openSnackbar,
        snackbars,
    };
};
