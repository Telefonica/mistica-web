import * as React from 'react';
import Touchable from './touchable';
import classNames from 'classnames';
import {isWebViewBridgeAvailable, nativeMessage} from '@tef-novum/webview-bridge';
import {useElementDimensions, useScreenSize} from './hooks';
import {Text2} from './text';
import * as styles from './snackbar.css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

type SnackbarType = 'INFORMATIVE' | 'CRITICAL';

type Props = {
    buttonText?: string;
    duration?: number;
    message: string;
    onClose?: () => unknown;
    type?: SnackbarType;
    children?: void;
};

const SnackbarComponent: React.FC<Props> = ({
    message,
    buttonText,
    duration = buttonText ? 10000 : 5000,
    onClose = () => {},
    type = 'INFORMATIVE',
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const {width: buttonWidth, ref: buttonRef} = useElementDimensions();
    const {isDesktopOrBigger} = useScreenSize();
    const longButtonWidth = isDesktopOrBigger ? 160 : 128;
    const hasLongButton = buttonWidth > longButtonWidth;

    const close = React.useCallback(() => {
        setIsOpen(false);
        setTimeout(() => {
            onClose();
        }, styles.TRANSITION_TIME_IN_MS);
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
        <div className={classNames(styles.snackbar, {[styles.snackbarOpen]: isOpen})}>
            <div
                role="alert"
                className={classNames(
                    styles.wrapper,
                    type === 'CRITICAL' ? styles.wrapperCritical : styles.wrapperInfo,
                    {[styles.wrapperOpen]: isOpen}
                )}
            >
                <div
                    className={classNames(
                        styles.content,
                        sprinkles({
                            flexDirection: hasLongButton ? 'column' : 'row',
                            alignItems: hasLongButton ? undefined : 'center',
                        })
                    )}
                >
                    <Text2 regular color={vars.colors.textPrimaryInverse}>
                        {message}
                    </Text2>
                    {buttonText && (
                        <div
                            className={classNames(
                                styles.button,
                                type === 'CRITICAL' ? styles.buttonCritical : styles.buttonInfo,
                                {[styles.longButton]: hasLongButton}
                            )}
                        >
                            <Touchable
                                style={{lineHeight: 'inherit', fontWeight: 'inherit'}}
                                ref={buttonRef}
                                onPress={close}
                            >
                                {buttonText}
                            </Touchable>
                        </div>
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
    onClose: onCloseProp = () => {},
    type = 'INFORMATIVE',
}) => {
    const renderNative = isWebViewBridgeAvailable();
    const onCloseRef = React.useRef(onCloseProp);

    React.useEffect(() => {
        onCloseRef.current = onCloseProp;
    }, [onCloseProp]);

    React.useEffect(() => {
        if (renderNative) {
            nativeMessage({message, duration, buttonText, type}).then(onCloseRef.current);
        }
    }, [buttonText, duration, message, renderNative, type]);

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
        />
    );
};

export default Snackbar;
