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

type SnackbarType = 'INFORMATIVE' | 'CRITICAL';
type CloseAction = 'DISMISS' | 'TIMEOUT' | 'BUTTON' | 'CONSECUTIVE';
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
                setTimeout(() => {
                    onClose?.(result);
                }, styles.TRANSITION_TIME_IN_MS);
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
                }).then((result: unknown) => {
                    // there are terser ways to do this checks, but this one satisfies TS
                    if (
                        !result ||
                        typeof result !== 'object' ||
                        !('action' in result) ||
                        typeof result.action !== 'string' ||
                        (result.action !== 'DISMISS' &&
                            result.action !== 'TIMEOUT' &&
                            result.action !== 'BUTTON')
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
    closeSnackbar: (id: string) => void;
}>({
    snackbars: [],
    setSnackbars: () => {},
    closeSnackbar: () => {},
});

export const SnackbarRoot = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [snackbars, setSnackbars] = React.useState<Array<SnackbarEntry>>([]);
    const snackbarRef = React.useRef<ImperativeHandle & HTMLDivElement>(null);
    const isClosingRef = React.useRef(false);

    React.useEffect(() => {
        // multiple snackbars, close the current one
        if (snackbars.length > 1 && !isClosingRef.current) {
            isClosingRef.current = true;
            snackbarRef.current?.close({action: 'CONSECUTIVE'});
        }
    }, [snackbars]);

    const handleClose: SnackbarCloseHandler = ({action}) => {
        isClosingRef.current = false;
        setSnackbars((snackbars) => snackbars.slice(1));
        snackbars[0].onClose?.({action});
    };

    const closeSnackbar = React.useCallback(
        (id: string) => {
            const index = snackbars.findIndex((snackbar) => snackbar.id === id);
            if (index === 0) {
                // currently visible snackbar, close it via the ref
                if (!isClosingRef.current) {
                    isClosingRef.current = true;
                    snackbarRef.current?.close({action: 'DISMISS'});
                }
            } else {
                // enqueued snackbar, remove it from the list and call the onClose callback
                snackbars[index].onClose?.({action: 'DISMISS'});
                setSnackbars((snackbars) => {
                    return snackbars.filter((snackbar) => snackbar.id !== id);
                });
            }
        },
        [snackbars]
    );

    const value = React.useMemo(() => {
        return {
            snackbars,
            setSnackbars,
            closeSnackbar,
        };
    }, [snackbars, closeSnackbar]);

    const currentSnackbar = snackbars[0];

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            {!!currentSnackbar && (
                <Snackbar
                    ref={snackbarRef}
                    key={currentSnackbar.id}
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
    /**
     * Returns the snackbar identifier.
     * Use this identifier to programatically close it
     */
    openSnackbar: (params: Props) => string;
    /**
     * Closes the snackbar with the given identifier.
     * The close action will be 'DISMISS'
     */
    closeSnackbar: (id: string) => void;
    snackbars: ReadonlyArray<Readonly<SnackbarEntry>>;
} => {
    const {snackbars, setSnackbars, closeSnackbar} = React.useContext(SnackbarContext);

    const openSnackbar = React.useCallback(
        (params: Props) => {
            const id = Date.now() + '-' + Math.random();
            setSnackbars((snackbars) => [...snackbars, {...params, id}]);
            return id;
        },
        [setSnackbars]
    );

    return {
        openSnackbar,
        closeSnackbar,
        snackbars,
    };
};
