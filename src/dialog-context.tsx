'use client';
import * as React from 'react';

import type {RendersNullableElement} from './utils/renders-element';
import type {ExclusifyUnion} from './utils/utility-types';
import type {ButtonLink} from './button';

interface BaseDialogProps {
    className?: string;
    title?: string;
    icon?: React.ReactElement;
    message: string;
    acceptText?: string;
    onAccept?: () => void;
    destructive?: boolean;
}

interface AlertProps extends BaseDialogProps {
    showClose?: boolean;
}

interface ConfirmProps extends BaseDialogProps {
    showClose?: boolean;
    showCancel?: boolean;
    cancelText?: string;
    onCancel?: () => void;
}
interface ExtendedDialogProps extends BaseDialogProps {
    subtitle?: string;
    extra?: React.ReactNode;
    forceWeb?: boolean;
    showClose?: boolean;
    showCancel?: boolean;
    cancelText?: string;
    onCancel?: () => void;
    link?: RendersNullableElement<typeof ButtonLink>;
}

export type DialogProps = ExclusifyUnion<AlertProps | ConfirmProps | ExtendedDialogProps>;

const DialogContext = React.createContext<{
    dialog: DialogProps | null;
    setDialog: React.Dispatch<React.SetStateAction<DialogProps | null>>;
}>({dialog: null, setDialog: () => {}});

export const useDialog = (): {
    alert: (params: AlertProps) => void;
    confirm: (params: ConfirmProps) => void;
    dialog: (params: ExtendedDialogProps) => void;
} => {
    const {setDialog} = React.useContext(DialogContext);

    const showDialog = React.useCallback(
        (params: DialogProps) => {
            setDialog((dialog) => {
                if (params && dialog) {
                    throw Error('Tried to show a dialog on top of another dialog');
                }
                return params;
            });
        },
        [setDialog]
    );

    return React.useMemo(
        () => ({
            alert: (params: AlertProps) => showDialog(params),
            confirm: (params: ConfirmProps) => showDialog({...params, showCancel: true}),
            dialog: (params: ExtendedDialogProps) => showDialog({...params, forceWeb: true, showClose: true}),
        }),
        [showDialog]
    );
};

const throwMissingDialogRootError = () => {
    throw Error(
        'Tried to show a dialog but the DialogRoot component was not mounted (missing ThemeContextProvider?)'
    );
};

let dialogFunctions: ReturnType<typeof useDialog> = {
    alert: throwMissingDialogRootError,
    confirm: throwMissingDialogRootError,
    dialog: throwMissingDialogRootError,
};

/**
 * @deprecated Created for backwards compatibility
 */
const ExposeDialogFunctions = (): JSX.Element => {
    dialogFunctions = useDialog();
    return <></>;
};

/**
 * @deprecated Use useDialog to get this function
 */
export const alert = (params: AlertProps): void => dialogFunctions.alert(params);

/**
 * @deprecated Use useDialog to get this function
 */
export const confirm = (params: ConfirmProps): void => dialogFunctions.confirm(params);

/**
 * @deprecated Use useDialog to get this function
 */
export const dialog = (params: ExtendedDialogProps): void => dialogFunctions.dialog(params);

type DialogRootProps = {children?: React.ReactNode};

export const DialogRoot = ({children}: DialogRootProps): JSX.Element => {
    const [dialog, setDialog] = React.useState<DialogProps | null>(null);
    const value = React.useMemo(() => ({dialog, setDialog}), [dialog, setDialog]);

    return (
        <DialogContext.Provider value={value}>
            <ExposeDialogFunctions />
            {children}
        </DialogContext.Provider>
    );
};
