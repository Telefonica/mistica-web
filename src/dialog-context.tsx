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
            setDialog({triggerEl: document.activeElement as HTMLElement, ...params});
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
            {children}
            {dialog && (
                <React.Suspense fallback={null}>
                    <ModalDialog
                        {...dialog}
                        onDestroy={() => {
                            setDialog(null);
                            // The focus doesn't work without this timeout
                            setTimeout(() => {
                                dialog.triggerEl?.focus?.();
                            }, 0);
                        }}
                    />
                </React.Suspense>
            )}
        </DialogContext.Provider>
    );
};
