import {nativeMessage} from '@tef-novum/webview-bridge';

const CLOSE_ACTIONS = ['DISMISS', 'TIMEOUT', 'CONSECUTIVE', 'BUTTON'] as const;
export type CloseAction = (typeof CLOSE_ACTIONS)[number];
export type SnackbarType = 'INFORMATIVE' | 'CRITICAL';

export const showNativeSnackbar = ({
    message,
    duration,
    buttonText,
    buttonAccessibilityLabel,
    type = 'INFORMATIVE',
    withDismiss,
}: {
    message: string;
    duration?: 'PERSISTENT';
    buttonText?: string;
    buttonAccessibilityLabel?: string;
    type?: SnackbarType;
    withDismiss?: boolean;
}): Promise<{action: CloseAction}> => {
    return nativeMessage({
        message,
        duration,
        buttonText,
        buttonAccessibilityLabel,
        type,
        withDismiss,
    }).then((unknownResult: unknown) => {
        const result = unknownResult as {action?: CloseAction} | undefined;
        if (result?.action && CLOSE_ACTIONS.includes(result.action)) {
            return {action: result.action};
        } else {
            return {action: 'DISMISS'};
        }
    });
};
