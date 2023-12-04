'use client';
import * as React from 'react';
import {isWebViewBridgeAvailable} from '@tef-novum/webview-bridge';

// import type {ImperativeHandle, Props as SnackbarProps, SnackbarCloseHandler} from './snackbar';
type ImperativeHandle = any;
type SnackbarProps = any;
type SnackbarCloseHandler = any;

type SnackbarEntry = SnackbarProps & {
    id: string;
};

const SnackbarContext = React.createContext<{
    snackbars: Array<SnackbarEntry>;
    setSnackbars: React.Dispatch<React.SetStateAction<Array<SnackbarEntry>>>;
}>({
    snackbars: [],
    setSnackbars: () => {},
});

const Snackbar = React.lazy(() => import(/* webpackChunkName: "snackbar" */ './snackbar'));

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

    const handleClose: SnackbarCloseHandler = ({action}: any) => {
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
                <React.Suspense fallback={null}>
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
                </React.Suspense>
            )}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = (): {
    openSnackbar: (params: SnackbarProps) => void;
    snackbars: ReadonlyArray<Readonly<SnackbarEntry>>;
} => {
    const {snackbars, setSnackbars} = React.useContext(SnackbarContext);

    const openSnackbar = React.useCallback(
        (params: SnackbarProps) => {
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
