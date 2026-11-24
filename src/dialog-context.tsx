'use client';
import * as React from 'react';
import {OptionalDensityProvider, useOptionalDensity} from './density/density-provider';

import type {AlertProps, ConfirmProps, DialogProps, ExtendedDialogProps} from './dialog';
import type {Density} from './density/definitions';

type DialogEntry = {props: DialogProps; density?: Density};

const DialogContext = React.createContext<{
    mounted: boolean;
    dialog: DialogEntry | null;
    setDialog: React.Dispatch<React.SetStateAction<DialogEntry | null>>;
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
    // DialogRoot renders the dialog out of the subtree of the caller, so it needs the density of the caller
    const density = useOptionalDensity();

    const showDialog = React.useCallback(
        (params: DialogProps) => {
            if (!mounted) {
                throwMissingDialogRootError();
            }
            if (params && currentDialog) {
                throw Error('Tried to show a dialog on top of another dialog');
            }
            setDialog({props: {triggerEl: document.activeElement as HTMLElement, ...params}, density});
        },
        [setDialog, currentDialog, mounted, density]
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
    const [dialog, setDialog] = React.useState<DialogEntry | null>(null);
    const value = React.useMemo(() => ({mounted: true, dialog, setDialog}), [dialog, setDialog]);

    // do not create a new context whith nested theme context providers
    if (mounted) {
        return <>{children}</>;
    }

    return (
        <DialogContext.Provider value={value}>
            {children}
            {dialog && (
                <OptionalDensityProvider density={dialog.density}>
                    <React.Suspense fallback={null}>
                        <ModalDialog
                            {...dialog.props}
                            onDestroy={() => {
                                setDialog(null);
                                // The focus doesn't work without this timeout
                                setTimeout(() => {
                                    dialog.props.triggerEl?.focus?.();
                                }, 0);
                            }}
                        />
                    </React.Suspense>
                </OptionalDensityProvider>
            )}
        </DialogContext.Provider>
    );
};
