'use client';
import * as React from 'react';

import type {AlertProps, ConfirmProps, DialogProps, ExtendedDialogProps} from './dialog';

const DialogContext = React.createContext<{
    mounted: boolean;
    dialog: DialogProps | null;
    setDialog: React.Dispatch<React.SetStateAction<DialogProps | null>>;
}>({mounted: false, dialog: null, setDialog: () => {}});

const ModalDialog = React.lazy(() => import(/* webpackChunkName: "dialog" */ './dialog'));

const throwMissingDialogRootError = () => {
    throw Error(
        'Tried to show a dialog but the DialogRoot component was not mounted (missing ThemeContextProvider?)'
    );
};

export const useDialog = (): {
    alert: (params: AlertProps) => void;
    confirm: (params: ConfirmProps) => void;
    dialog: (params: ExtendedDialogProps) => void;
} => {
    const {dialog: currentDialog, setDialog, mounted} = React.useContext(DialogContext);

    const showDialog = React.useCallback(
        (params: DialogProps) => {
            if (!mounted) {
                throwMissingDialogRootError();
            }
            if (params && currentDialog) {
                throw Error('Tried to show a dialog on top of another dialog');
            }
            setDialog(params);
        },
        [setDialog, currentDialog, mounted]
    );

    return React.useMemo(
        () => ({
            alert: (params: AlertProps) => showDialog({type: 'alert', ...params}),
            confirm: (params: ConfirmProps) => showDialog({type: 'confirm', ...params}),
            dialog: (params: ExtendedDialogProps) => showDialog({type: 'dialog', ...params}),
        }),
        [showDialog]
    );
};

const missingDialogFunctions: ReturnType<typeof useDialog> = {
    alert: throwMissingDialogRootError,
    confirm: throwMissingDialogRootError,
    dialog: throwMissingDialogRootError,
};

let currentDialogFunctions = missingDialogFunctions;

/**
 * @deprecated Created for backwards compatibility
 */
const ExposeDialogFunctions = (): JSX.Element => {
    const dialogFunctions = useDialog();
    React.useEffect(() => {
        currentDialogFunctions = dialogFunctions;
        return () => {
            currentDialogFunctions = missingDialogFunctions;
        };
    }, [dialogFunctions]);
    return <></>;
};

/**
 * @deprecated Use useDialog to get this function
 */
export const alert = (params: AlertProps): void => currentDialogFunctions.alert(params);

/**
 * @deprecated Use useDialog to get this function
 */
export const confirm = (params: ConfirmProps): void => currentDialogFunctions.confirm(params);

/**
 * @deprecated Use useDialog to get this function
 */
export const dialog = (params: ExtendedDialogProps): void => currentDialogFunctions.dialog(params);

type DialogRootProps = {children?: React.ReactNode};

export const DialogRoot = ({children}: DialogRootProps): JSX.Element => {
    const {mounted} = React.useContext(DialogContext);
    const [dialog, setDialog] = React.useState<DialogProps | null>(null);
    const value = React.useMemo(() => ({mounted: true, dialog, setDialog}), [dialog, setDialog]);

    // do not create a new context whith nested theme context providers
    if (mounted) {
        return <>{children}</>;
    }

    return (
        <DialogContext.Provider value={value}>
            <ExposeDialogFunctions />
            {children}
            {dialog && (
                <React.Suspense fallback={null}>
                    <ModalDialog
                        {...dialog}
                        onDestroy={() => {
                            setDialog(null);
                        }}
                    />
                </React.Suspense>
            )}
        </DialogContext.Provider>
    );
};
